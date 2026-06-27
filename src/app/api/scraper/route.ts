import { NextRequest, NextResponse } from "next/server";

// Simple sentiment analysis
function analyzeSentiment(caption: string): "Positivo" | "Neutro" | "Crítica" {
  if (!caption) return "Neutro";
  const lower = caption.toLowerCase();

  const positive = [
    "maravilhoso", "lindo", "perfeito", "linda", "top", "amei", "perfeita",
    "paraiso", "incrível", "incrivel", "show", "excelente", "apaixonada",
    "apaixonado", "melhor", "sensacional", "☀️", "❤️", "😍", "✨",
  ];
  const negative = [
    "sujo", "caro", "ruim", "péssimo", "pessimo", "odiei", "lixo",
    "cheio", "lotado", "desorganizado", "perigoso", "horrível", "horrivel",
  ];

  const posScore = positive.filter((w) => lower.includes(w)).length;
  const negScore = negative.filter((w) => lower.includes(w)).length;

  if (posScore > negScore) return "Positivo";
  if (negScore > posScore) return "Crítica";
  return "Neutro";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hashtag } = body;

    if (!hashtag) {
      return NextResponse.json(
        { error: "Hashtag é obrigatória" },
        { status: 400 }
      );
    }

    const apiToken = process.env.APIFY_API_TOKEN;

    if (!apiToken) {
      // Return mock data when no API token is configured
      return NextResponse.json({
        source: "mock",
        hashtag,
        posts: [
          {
            id: "mock-1",
            ownerUsername: "turista_rn",
            caption: "Lugar maravilhoso! Paraíso no RN 🌊☀️ #" + hashtag,
            likesCount: 342,
            commentsCount: 28,
            sentiment: "Positivo",
          },
          {
            id: "mock-2",
            ownerUsername: "viajante_br",
            caption: "Que praia incrível, perfeita para relaxar ❤️ #" + hashtag,
            likesCount: 189,
            commentsCount: 15,
            sentiment: "Positivo",
          },
          {
            id: "mock-3",
            ownerUsername: "blog_praias",
            caption: "Local cheio hoje, mas ainda bonito. #" + hashtag,
            likesCount: 95,
            commentsCount: 7,
            sentiment: "Neutro",
          },
        ],
        totalLikes: 626,
        totalComments: 50,
      });
    }

    // Real Apify call
    const { ApifyClient } = await import("apify-client");
    const client = new ApifyClient({ token: apiToken });

    const run = await client.actor("apify/instagram-scraper").call({
      searchType: "hashtag",
      search: hashtag,
      resultsLimit: 3,
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const posts = items.map((item: Record<string, unknown>) => ({
      id: item.id || `post-${Math.random().toString(36).slice(2)}`,
      ownerUsername: item.ownerUsername || "unknown",
      caption: (item.caption as string) || "",
      likesCount: (item.likesCount as number) || 0,
      commentsCount: (item.commentsCount as number) || 0,
      sentiment: analyzeSentiment((item.caption as string) || ""),
    }));

    const totalLikes = posts.reduce(
      (sum: number, p: { likesCount: number }) => sum + p.likesCount,
      0
    );
    const totalComments = posts.reduce(
      (sum: number, p: { commentsCount: number }) => sum + p.commentsCount,
      0
    );

    return NextResponse.json({
      source: "apify",
      hashtag,
      posts,
      totalLikes,
      totalComments,
    });
  } catch (error) {
    console.error("Scraper API error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do Instagram" },
      { status: 500 }
    );
  }
}
