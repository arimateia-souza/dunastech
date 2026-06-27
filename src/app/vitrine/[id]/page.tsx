"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Phone,
  ShieldCheck,
  Building,
  MapPin,
  FileText,
  UserCheck,
} from "lucide-react";
import { cadasturData } from "@/data/mockData";

export default function VitrinePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const negocio = cadasturData.find((b) => b.id === resolvedParams.id);

  if (!negocio) {
    return (
      <div className="min-h-screen bg-[#060913] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold">Estabelecimento não encontrado</h1>
        <p className="text-slate-400">Este local não está registrado ou foi removido.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 pb-12">
      {/* Banner / Header */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={negocio.imagem}
          alt={negocio.nome}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-black/40 to-transparent" />
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 space-y-6">
        {/* Main Card */}
        <div className="bg-slate-900/90 border border-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  {negocio.tipo}
                </span>
                {negocio.regularizado && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Selo Cadastur Regularizado
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {negocio.nome}
              </h1>
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {negocio.destino}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-2xl self-start">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">{negocio.nota}</span>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Sobre o Estabelecimento
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {negocio.descricao}
            </p>
          </div>

          {/* Details / Document Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">CNPJ Certificado</p>
                <p className="text-sm text-slate-200 font-mono font-medium">{negocio.cnpj}</p>
              </div>
            </div>
            <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Status Cadastur</p>
                <p className="text-sm text-emerald-400 font-semibold">Válido e Regular</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="pt-4">
            <a
              href={`tel:${negocio.telefone}`}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" />
              Entre em Contato: {negocio.telefone}
            </a>
          </div>
        </div>

        {/* Small Trust Info */}
        <p className="text-center text-[10px] text-slate-600">
          Esta é uma página de vitrine oficial validada pelo sistema DunasTech com dados do Ministério do Turismo (Cadastur).
        </p>
      </div>
    </div>
  );
}
