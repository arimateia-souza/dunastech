"use client";

import Link from "next/link";
import {
  Sun,
  Zap,
  Building2,
  Crown,
  BarChart3,
  Smartphone,
  Globe,
  ShieldCheck,
  TrendingUp,
  BadgeDollarSign,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 pb-16">
      {/* Pitch Header */}
      <header className="border-b border-white/[0.06] bg-[#04060c]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Sun className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-extrabold tracking-tight">
              DUNAS<span className="text-amber-400">TECH</span>
            </h1>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Acessar Sistema
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          Hackathon do Sol 2026 — Pitch Oficial
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Observatório Inteligente do Turismo
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Como transformamos avaliações sociais e dados ambientais em um motor preditivo de receitas e sustentabilidade para prefeituras e empresas.
        </p>
      </div>

      {/* Main Pitch Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 space-y-12">
        {/* Pain & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-slate-900/40 border border-red-500/15 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-2xl">🚨</span>
            <h2 className="text-xl font-extrabold text-white">O Problema do Turismo Desordenado</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gestores públicos operam no escuro: dados do Cadastur e do IBGE são estáticos, impedindo a antecipação de superlotações que degradam atrativos e geram gargalos de mobilidade e infraestrutura.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-emerald-500/15 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-extrabold text-white">A Solução DunasTech</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Um sensor social vivo (B2C/C2C) que capta o feedback do turista e dados do Instagram em tempo real, integrando-o ao painel preditivo do gestor municipal (B2G) alimentado por Inteligência Artificial.
            </p>
          </div>
        </div>

        {/* Business Model & Pricing */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Modelo de Monetização Sustentável</h2>
            <p className="text-sm text-slate-400">Duplo motor de receita cobrindo os setores público e privado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Private B2B Model */}
            <div className="bg-slate-900/60 border border-amber-500/15 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">B2B: Empresas de Turismo</h3>
                  <p className="text-xs text-amber-400/80 font-bold uppercase">Freemium + CPC Ads + Analytics</p>
                </div>
              </div>

              <div className="space-y-4">
                <FeatureItem
                  title="Listagem Cadastur Gratuita"
                  description="Todos os parceiros regularizados entram no app e no mapa interativo gratuitamente, estimulando a formalização."
                />
                <FeatureItem
                  title="Destaque Patrocinado (Ads)"
                  description="Hotéis e guias pagam por cliques (CPC) para aparecer no topo das sugestões da aba do Turista."
                />
                <FeatureItem
                  title="Dashboard Premium B2B"
                  description="Assinatura mensal para pousadas acessarem dados analíticos de fluxo e preferências dos turistas."
                />
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Mensalidade Premium B2B</p>
                <p className="text-lg font-extrabold text-amber-400">R$ 149 / mês</p>
              </div>
            </div>

            {/* Public B2G Model */}
            <div className="bg-slate-900/60 border border-cyan-500/15 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">B2G: Secretarias de Turismo</h3>
                  <p className="text-xs text-cyan-400/80 font-bold uppercase">SaaS Recorrente por Assinatura</p>
                </div>
              </div>

              <div className="space-y-4">
                <FeatureItem
                  title="Observatório Completo"
                  description="Acesso a painéis gerenciais, cálculo dinâmico do ISA e dados de tráfego integrados."
                />
                <FeatureItem
                  title="Sistema de Alertas com IA"
                  description="A IA gera relatórios de anomalias (manutenções urgentes ou superlotação) e envia direto aos gabinetes."
                />
                <FeatureItem
                  title="Exportação de Relatórios IBGE"
                  description="Cruzamento automático de dados para prestação de contas de investimentos federais."
                />
              </div>

              <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Assinatura Anual B2G</p>
                <p className="text-lg font-extrabold text-cyan-400">R$ 18.000 a R$ 60.000 / ano</p>
              </div>
            </div>
          </div>
        </div>

        {/* TAM Market Opportunity */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Oportunidade de Mercado (TAM)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-white block">167</span>
              <span className="text-xs text-slate-400">Municípios do RN como potenciais clientes B2G</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-white block">5.570</span>
              <span className="text-xs text-slate-400">Municípios no Brasil licenciáveis</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-white block">R$ 11.3B</span>
              <span className="text-xs text-slate-400">Movimentados no turismo do RN em 2024</span>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center pt-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            Experimente a Demonstração <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-xs text-slate-500">
            DunasTech — Hackathon do Sol 2026 | Eixo 3: Observatório Inteligente Potiguar
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-amber-500 text-sm mt-0.5">✓</span>
      <div>
        <p className="text-xs font-bold text-white">{title}</p>
        <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  );
}
