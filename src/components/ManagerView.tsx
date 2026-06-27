"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  DollarSign,
  Plane,
  Activity,
  Camera,
  BrainCircuit,
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  fluxoData,
  transporteData,
  investimentosData,
  allDestinos,
  calcularISA,
  type Feedback,
} from "@/data/mockData";
import { subscribeFeedbacks } from "@/lib/firebase";

interface InstagramPost {
  id: string;
  ownerUsername: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  sentiment: string;
}

interface InstagramResult {
  source: string;
  hashtag: string;
  posts: InstagramPost[];
  totalLikes: number;
  totalComments: number;
}

export default function ManagerView() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedDestino, setSelectedDestino] = useState(allDestinos[0]);
  const [instagramData, setInstagramData] = useState<InstagramResult | null>(null);
  const [loadingInstagram, setLoadingInstagram] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  // Subscribe to real-time feedbacks
  useEffect(() => {
    const unsubscribe = subscribeFeedbacks((data) => {
      setFeedbacks(data);
    });
    return () => unsubscribe();
  }, []);

  // Current destination data
  const fluxo = fluxoData.find((f) => f.destino === selectedDestino);
  const transporte = transporteData.find((t) => t.destino === selectedDestino);
  const investimento = investimentosData.find((i) => i.destino === selectedDestino);
  const isaScore = calcularISA(selectedDestino, feedbacks);
  const destinoFeedbacks = feedbacks.filter((f) => f.destino === selectedDestino);

  // ISA status helper
  const getISAStatus = (score: number) => {
    if (score >= 80) return { label: "Saudável", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (score >= 60) return { label: "Atenção", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "Crítico", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
  };
  const isaStatus = getISAStatus(isaScore);

  // Fetch Instagram data
  const fetchInstagram = useCallback(async () => {
    setLoadingInstagram(true);
    try {
      const hashtag = fluxo?.hashtag_instagram || "praiadomadeiro";
      const res = await fetch("/api/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashtag }),
      });
      const data = await res.json();
      setInstagramData(data);
    } catch (error) {
      console.error("Instagram fetch error:", error);
    } finally {
      setLoadingInstagram(false);
    }
  }, [fluxo]);

  // Fetch AI insights
  const fetchAIInsight = useCallback(async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destino: selectedDestino,
          feedbacks: destinoFeedbacks,
          transporteInfo: transporte,
          investimentoInfo: investimento,
          instagramData,
          isaScore,
        }),
      });
      const data = await res.json();
      setAiInsight(data.insight || data.error);
    } catch (error) {
      console.error("AI insight error:", error);
      setAiInsight("Erro ao gerar diagnóstico. Tente novamente.");
    } finally {
      setLoadingAI(false);
    }
  }, [selectedDestino, destinoFeedbacks, transporte, investimento, instagramData, isaScore]);

  // Chart data
  const chartDataISA = allDestinos.map((d) => ({
    destino: d.split(" ").slice(-1)[0],
    ISA: calcularISA(d, feedbacks),
    Saturação: fluxoData.find((f) => f.destino === d)?.saturacao_turistica || 0,
  }));

  const chartDataTransporte = allDestinos.map((d) => {
    const t = transporteData.find((tr) => tr.destino === d);
    return {
      destino: d.split(" ").slice(-1)[0],
      Aéreo: t?.voos_mensais || 0,
      Ônibus: t?.onibus_mensais || 0,
      Veículos: Math.round((t?.veiculos_terrestres_mensais || 0) / 100),
    };
  });

  // Totals for KPIs
  const totalVisitantes = fluxoData.reduce((s, f) => s + f.fluxo_visitantes_mes, 0);
  const totalReceita = fluxoData.reduce((s, f) => s + f.receita_estimada_milhoes, 0);
  const totalTransporte = transporteData.reduce((s, t) => s + t.voos_mensais + t.onibus_mensais, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Observatório de Gestão</h1>
          <p className="text-sm text-slate-400 mt-1">Painel preditivo para gestão turística sustentável</p>
        </div>
        <select
          value={selectedDestino}
          onChange={(e) => {
            setSelectedDestino(e.target.value);
            setInstagramData(null);
            setAiInsight("");
          }}
          className="bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-amber-500/50 transition-all"
        >
          {allDestinos.map((d) => (
            <option key={d} value={d}>📍 {d}</option>
          ))}
        </select>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard icon={<Users className="w-5 h-5" />} title="Visitantes / Mês" value={fluxo?.fluxo_visitantes_mes.toLocaleString("pt-BR") || "—"} sub={`${totalVisitantes.toLocaleString("pt-BR")} total`} accent="cyan" />
        <KPICard icon={<DollarSign className="w-5 h-5" />} title="Receita Estimada" value={`R$ ${fluxo?.receita_estimada_milhoes || 0}M`} sub={`R$ ${totalReceita}M total`} accent="emerald" />
        <KPICard icon={<Plane className="w-5 h-5" />} title="Modais / Mês" value={(transporte ? transporte.voos_mensais + transporte.onibus_mensais : 0).toLocaleString("pt-BR")} sub={`${transporte?.variacao_percentual || 0}% vs anterior`} accent="amber" trend={transporte?.variacao_percentual} />
        <div className={`${isaStatus.bg} border ${isaStatus.border} rounded-2xl p-4 flex flex-col justify-between`}>
          <div className="flex items-center justify-between mb-2">
            <Activity className={`w-5 h-5 ${isaStatus.color}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isaStatus.color}`}>{isaStatus.label}</span>
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">ISA</span>
          <span className={`text-3xl font-extrabold ${isaStatus.color}`}>{isaScore}</span>
          <span className="text-[10px] text-slate-500">{destinoFeedbacks.length} avaliações</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ISA vs Saturation Chart */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">ISA vs Saturação Turística</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartDataISA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="destino" tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="ISA" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Saturação" fill="#06B6D4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transport Chart */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Pressão de Transporte (mensal)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartDataTransporte}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="destino" tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Aéreo" stroke="#818CF8" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Ônibus" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Veículos" stroke="#06B6D4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-slate-500 mt-2">* Veículos em centenas</p>
        </div>
      </div>

      {/* Recent Feedbacks */}
      {destinoFeedbacks.length > 0 && (
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowFeedbacks(!showFeedbacks)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
          >
            <h3 className="text-sm font-semibold text-slate-300">
              📋 Feedbacks Recentes ({destinoFeedbacks.length})
            </h3>
            {showFeedbacks ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {showFeedbacks && (
            <div className="border-t border-white/5 p-4 space-y-2 max-h-60 overflow-y-auto">
              {destinoFeedbacks.slice(0, 10).map((f, i) => (
                <div key={f.id || i} className="flex items-center gap-2 text-xs text-slate-400 bg-white/[0.02] rounded-lg px-3 py-2">
                  <span className="text-slate-500">{new Date(f.timestamp).toLocaleString("pt-BR")}</span>
                  {f.limpo && <span className="text-emerald-400">🧹</span>}
                  {f.sinalizado && <span className="text-emerald-400">🪧</span>}
                  {f.preservado && <span className="text-emerald-400">🌿</span>}
                  {f.manutencao && <span className="text-red-400">🔧</span>}
                  {f.superlotado && <span className="text-red-400">⚠️</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instagram Scraper */}
      <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Camera className="w-4 h-4 text-pink-400" />
            Sensor Social — Instagram
          </h3>
          <button
            onClick={fetchInstagram}
            disabled={loadingInstagram}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all"
          >
            {loadingInstagram ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
            {loadingInstagram ? "Buscando..." : `Buscar #${fluxo?.hashtag_instagram || ""}`}
          </button>
        </div>

        {instagramData && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-pink-500/5 border border-pink-500/10 rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-pink-400">{instagramData.totalLikes.toLocaleString("pt-BR")}</span>
                <span className="block text-[10px] text-slate-500 uppercase mt-1">💖 Likes</span>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-3 text-center">
                <span className="text-2xl font-bold text-purple-400">{instagramData.totalComments.toLocaleString("pt-BR")}</span>
                <span className="block text-[10px] text-slate-500 uppercase mt-1">💬 Comentários</span>
              </div>
            </div>
            {instagramData.source === "mock" && (
              <p className="text-[10px] text-slate-600 italic text-center">Dados simulados — configure APIFY_API_TOKEN para dados reais</p>
            )}
            <div className="space-y-2">
              {instagramData.posts.map((post) => (
                <div key={post.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white font-semibold">👤 @{post.ownerUsername}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      post.sentiment === "Positivo" ? "bg-emerald-500/15 text-emerald-400" :
                      post.sentiment === "Crítica" ? "bg-red-500/15 text-red-400" :
                      "bg-slate-500/15 text-slate-400"
                    }`}>{post.sentiment}</span>
                  </div>
                  <p className="text-xs text-slate-400 italic line-clamp-2">&ldquo;{post.caption}&rdquo;</p>
                  <div className="flex gap-3 mt-2 text-[10px] text-slate-500">
                    <span>💖 {post.likesCount}</span>
                    <span>💬 {post.commentsCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-violet-400" />
            Motor de Inteligência Artificial
          </h3>
          <button
            onClick={fetchAIInsight}
            disabled={loadingAI}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all"
          >
            {loadingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BrainCircuit className="w-3.5 h-3.5" />}
            {loadingAI ? "Gerando..." : "Gerar Diagnóstico IA"}
          </button>
        </div>

        {aiInsight && (
          <div className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {aiInsight}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- KPI Card Component ---
function KPICard({ icon, title, value, sub, accent, trend }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  accent: "cyan" | "emerald" | "amber";
  trend?: number;
}) {
  const colors = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/15", text: "text-cyan-400" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/15", text: "text-emerald-400" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/15", text: "text-amber-400" },
  };
  const c = colors[accent];

  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-4 flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-2">
        <span className={c.text}>{icon}</span>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[10px] font-bold ${trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}%
          </span>
        )}
      </div>
      <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{title}</span>
      <span className="text-2xl lg:text-3xl font-extrabold text-white mt-1">{value}</span>
      <span className="text-[10px] text-slate-500 mt-1">{sub}</span>
    </div>
  );
}
