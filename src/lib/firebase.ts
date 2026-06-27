import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Firestore,
  Timestamp,
} from "firebase/firestore";
import type { Feedback } from "@/data/mockData";

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Check if Firebase is configured
export const isFirebaseConfigured =
  !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

// Initialize Firebase (singleton)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
}

// --- Firestore Helpers ---

const FEEDBACKS_COLLECTION = "feedbacks";

/**
 * Add a tourist feedback to Firestore.
 * Falls back to localStorage if Firebase is not configured.
 */
export async function addFeedback(feedback: Omit<Feedback, "id" | "timestamp">): Promise<void> {
  const feedbackWithTimestamp = {
    ...feedback,
    timestamp: Date.now(),
  };

  if (db) {
    try {
      await addDoc(collection(db, FEEDBACKS_COLLECTION), feedbackWithTimestamp);
      return;
    } catch (error) {
      console.warn("Firebase write failed, falling back to localStorage:", error);
    }
  }

  // Fallback: localStorage
  const stored = localStorage.getItem("dunastech_feedbacks");
  const feedbacks: Feedback[] = stored ? JSON.parse(stored) : [];
  feedbacks.push({
    ...feedbackWithTimestamp,
    id: `local-${Date.now()}`,
  });
  localStorage.setItem("dunastech_feedbacks", JSON.stringify(feedbacks));
}

/**
 * Subscribe to real-time feedback updates.
 * Returns an unsubscribe function.
 * Falls back to localStorage polling if Firebase is not configured.
 */
export function subscribeFeedbacks(
  callback: (feedbacks: Feedback[]) => void
): () => void {
  if (db) {
    try {
      const q = query(
        collection(db, FEEDBACKS_COLLECTION),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const feedbacks: Feedback[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];
        callback(feedbacks);
      });
      return unsubscribe;
    } catch (error) {
      console.warn("Firebase listener failed, using localStorage:", error);
    }
  }

  // Fallback: poll localStorage every 2s
  const interval = setInterval(() => {
    const stored = localStorage.getItem("dunastech_feedbacks");
    const feedbacks: Feedback[] = stored ? JSON.parse(stored) : [];
    callback(feedbacks);
  }, 2000);

  // Initial load
  const stored = localStorage.getItem("dunastech_feedbacks");
  callback(stored ? JSON.parse(stored) : []);

  return () => clearInterval(interval);
}

export { db };
