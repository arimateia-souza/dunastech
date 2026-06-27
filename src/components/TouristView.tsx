"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  Phone,
  Send,
  CheckCircle2,
  Building2,
  Utensils,
  Compass,
  Hotel,
  Briefcase,
} from "lucide-react";
import {
  destinosInfo,
  cadasturData,
  avaliacaoOptions,
  allDestinos,
  type Feedback,
} from "@/data/mockData";
import { addFeedback } from "@/lib/firebase";

const tipoIcons: Record<string, React.ReactNode> = {
  Hotel: <Hotel className="w-4 h-4" />,
  Restaurante: <Utensils className="w-4 h-4" />,
  Guia: <Compass className="w-4 h-4" />,
  Pousada: <Hotel className="w-4 h-4" />,
  Agência: <Briefcase className="w-4 h-4" />,
};

export default function TouristView() {
  const [selectedDestino, setSelectedDestino] = useState(allDestinos[0]);
  const [avaliacoes, setAvaliacoes] = useState<Record<string, boolean>>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const destino = destinosInfo.find((d) => d.nome === selectedDestino)!;
  const negocios = cadasturData.filter(
    (b) => b.destino === selectedDestino && b.regularizado
  );

  const handleSubmit = async () => {
    setEnviando(true);
    try {
      const feedback: Omit<Feedback, "id" | "timestamp"> = {
        destino: selectedDestino,
        limpo: !!avaliacoes["limpo"],
        sinalizado: !!avaliacoes["sinalizado"],
        preservado: !!avaliacoes["preservado"],
        manutencao: !!avaliacoes["manutencao"],
        superlotado: !!avaliacoes["superlotado"],
      };
      await addFeedback(feedback);
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setAvaliacoes({});
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Sensor Turístico
        </div>
        <h1 className="text-2xl font-bold text-white">
          Onde você está?
        </h1>
        <p className="text-sm text-slate-400">
          Selecione o atrativo e ajude a preservar nosso patrimônio.
        </p>
      </div>

      {/* Destination Selector */}
      <div className="space-y-3">
        <select
          value={selectedDestino}
          onChange={(e) => {
            setSelectedDestino(e.target.value);
            setEnviado(false);
            setAvaliacoes({});
          }}
          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25 transition-all"
        >
          {allDestinos.map((d) => (
            <option key={d} value={d}>
              📍 {d}
            </option>
          ))}
        </select>
      </div>

      {/* Destination Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5">
        <img
          src={destino.imagem}
          alt={destino.nome}
          className="w-full h-48 object-cover brightness-50"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-5">
          <h2 className="text-xl font-bold text-white">{destino.nome}</h2>
          <p className="text-xs text-slate-300 mt-1">{destino.municipio}</p>
          <p className="text-sm text-slate-300 mt-2 line-clamp-2">
            {destino.descricao}
          </p>
        </div>
      </div>

      {/* Attractions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          🎯 O que fazer
        </h3>
        <div className="flex flex-wrap gap-2">
          {destino.atracoes.map((a) => (
            <span
              key={a}
              className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/15 px-3 py-1.5 rounded-full"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Cadastur Businesses */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            🏢 Rotas Certificadas (Cadastur)
          </h3>
          <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
            ✓ REGULARIZADO
          </span>
        </div>
        <div className="space-y-2">
          {negocios.map((n) => (
            <div
              key={n.id}
              className="bg-slate-800/40 border border-white/5 rounded-xl p-3.5 flex items-center gap-3 hover:border-amber-500/20 transition-all group"
            >
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                {tipoIcons[n.tipo] || <Building2 className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {n.nome}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">
                    {n.tipo}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {n.nota}
                  </span>
                </div>
              </div>
              <a
                href={`tel:${n.telefone}`}
                className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-cyan-500/15 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Health Assessment Form */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          📋 Avaliação Rápida do Atrativo
        </h3>
        <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 space-y-2.5">
          {avaliacaoOptions.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                avaliacoes[opt.id]
                  ? opt.negative
                    ? "bg-red-500/10 border border-red-500/25"
                    : "bg-emerald-500/10 border border-emerald-500/25"
                  : "bg-white/[0.02] border border-transparent hover:bg-white/5"
              }`}
            >
              <input
                type="checkbox"
                checked={!!avaliacoes[opt.id]}
                onChange={(e) =>
                  setAvaliacoes((prev) => ({
                    ...prev,
                    [opt.id]: e.target.checked,
                  }))
                }
                className="sr-only"
              />
              <span className="text-lg">{opt.emoji}</span>
              <span
                className={`text-sm font-medium ${
                  avaliacoes[opt.id]
                    ? opt.negative
                      ? "text-red-300"
                      : "text-emerald-300"
                    : "text-slate-300"
                }`}
              >
                {opt.label}
              </span>
              {avaliacoes[opt.id] && (
                <CheckCircle2
                  className={`w-4 h-4 ml-auto ${
                    opt.negative ? "text-red-400" : "text-emerald-400"
                  }`}
                />
              )}
            </label>
          ))}
        </div>

        {enviado ? (
          <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Avaliação registrada com sucesso!
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={enviando || Object.keys(avaliacoes).filter((k) => avaliacoes[k]).length === 0}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            {enviando ? "Enviando..." : "Enviar Avaliação"}
          </button>
        )}
      </div>
    </div>
  );
}
