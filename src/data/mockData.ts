// ============================================================
// MOCK DATA — Observatório Inteligente do Turismo (DunasTech)
// ============================================================

// --- IBGE Mock Data ---
export interface IBGEData {
  destino: string;
  municipio: string;
  populacao: number;
  area_km2: number;
  idh: number;
  leitos_hospitalares: number;
  escolas_publicas: number;
}

export const ibgeData: IBGEData[] = [
  {
    destino: "Praia do Madeiro",
    municipio: "Tibau do Sul",
    populacao: 14024,
    area_km2: 102.68,
    idh: 0.639,
    leitos_hospitalares: 12,
    escolas_publicas: 8,
  },
  {
    destino: "Pipa",
    municipio: "Tibau do Sul",
    populacao: 14024,
    area_km2: 102.68,
    idh: 0.639,
    leitos_hospitalares: 12,
    escolas_publicas: 8,
  },
  {
    destino: "Ponta Negra",
    municipio: "Natal",
    populacao: 896708,
    area_km2: 167.26,
    idh: 0.763,
    leitos_hospitalares: 3200,
    escolas_publicas: 450,
  },
  {
    destino: "São Miguel do Gostoso",
    municipio: "São Miguel do Gostoso",
    populacao: 10464,
    area_km2: 340.83,
    idh: 0.611,
    leitos_hospitalares: 6,
    escolas_publicas: 12,
  },
];

// --- Cadastur Mock Data ---
export interface CadasturBusiness {
  id: string;
  cnpj: string;
  nome: string;
  tipo: "Hotel" | "Restaurante" | "Guia" | "Pousada" | "Agência";
  destino: string;
  regularizado: boolean;
  nota: number;
  telefone: string;
}

export const cadasturData: CadasturBusiness[] = [
  // Praia do Madeiro
  {
    id: "cad-001",
    cnpj: "12.345.678/0001-01",
    nome: "Pousada Mirante do Madeiro",
    tipo: "Pousada",
    destino: "Praia do Madeiro",
    regularizado: true,
    nota: 4.7,
    telefone: "(84) 99901-0001",
  },
  {
    id: "cad-002",
    cnpj: "12.345.678/0001-02",
    nome: "Restaurante Golfinhos Gourmet",
    tipo: "Restaurante",
    destino: "Praia do Madeiro",
    regularizado: true,
    nota: 4.5,
    telefone: "(84) 99901-0002",
  },
  {
    id: "cad-003",
    cnpj: "12.345.678/0001-03",
    nome: "Guia Marcos Aventuras",
    tipo: "Guia",
    destino: "Praia do Madeiro",
    regularizado: true,
    nota: 4.9,
    telefone: "(84) 99901-0003",
  },
  // Pipa
  {
    id: "cad-004",
    cnpj: "23.456.789/0001-04",
    nome: "Hotel Pipa Atlântico",
    tipo: "Hotel",
    destino: "Pipa",
    regularizado: true,
    nota: 4.6,
    telefone: "(84) 99902-0004",
  },
  {
    id: "cad-005",
    cnpj: "23.456.789/0001-05",
    nome: "Bistrô da Pipa",
    tipo: "Restaurante",
    destino: "Pipa",
    regularizado: true,
    nota: 4.8,
    telefone: "(84) 99902-0005",
  },
  {
    id: "cad-006",
    cnpj: "23.456.789/0001-06",
    nome: "Agência Pipa Tours",
    tipo: "Agência",
    destino: "Pipa",
    regularizado: true,
    nota: 4.4,
    telefone: "(84) 99902-0006",
  },
  {
    id: "cad-007",
    cnpj: "23.456.789/0001-07",
    nome: "Pousada Lua Cheia",
    tipo: "Pousada",
    destino: "Pipa",
    regularizado: true,
    nota: 4.3,
    telefone: "(84) 99902-0007",
  },
  // Ponta Negra
  {
    id: "cad-008",
    cnpj: "34.567.890/0001-08",
    nome: "Hotel Morro do Careca",
    tipo: "Hotel",
    destino: "Ponta Negra",
    regularizado: true,
    nota: 4.2,
    telefone: "(84) 99903-0008",
  },
  {
    id: "cad-009",
    cnpj: "34.567.890/0001-09",
    nome: "Restaurante Camarões",
    tipo: "Restaurante",
    destino: "Ponta Negra",
    regularizado: true,
    nota: 4.7,
    telefone: "(84) 99903-0009",
  },
  {
    id: "cad-010",
    cnpj: "34.567.890/0001-10",
    nome: "Natal Vans Turismo",
    tipo: "Agência",
    destino: "Ponta Negra",
    regularizado: true,
    nota: 4.1,
    telefone: "(84) 99903-0010",
  },
  // São Miguel do Gostoso
  {
    id: "cad-011",
    cnpj: "45.678.901/0001-11",
    nome: "Pousada dos Ventos",
    tipo: "Pousada",
    destino: "São Miguel do Gostoso",
    regularizado: true,
    nota: 4.8,
    telefone: "(84) 99904-0011",
  },
  {
    id: "cad-012",
    cnpj: "45.678.901/0001-12",
    nome: "Kite Point Gostoso",
    tipo: "Guia",
    destino: "São Miguel do Gostoso",
    regularizado: true,
    nota: 4.9,
    telefone: "(84) 99904-0012",
  },
  {
    id: "cad-013",
    cnpj: "45.678.901/0001-13",
    nome: "Restaurante Peixe na Telha",
    tipo: "Restaurante",
    destino: "São Miguel do Gostoso",
    regularizado: true,
    nota: 4.6,
    telefone: "(84) 99904-0013",
  },
];

// --- Transporte Mock Data ---
export interface TransporteData {
  destino: string;
  voos_mensais: number;
  onibus_mensais: number;
  veiculos_terrestres_mensais: number;
  modal_principal: string;
  variacao_percentual: number; // vs mês anterior
}

export const transporteData: TransporteData[] = [
  {
    destino: "Praia do Madeiro",
    voos_mensais: 0,
    onibus_mensais: 120,
    veiculos_terrestres_mensais: 3500,
    modal_principal: "Veículo Particular",
    variacao_percentual: 12,
  },
  {
    destino: "Pipa",
    voos_mensais: 0,
    onibus_mensais: 450,
    veiculos_terrestres_mensais: 15000,
    modal_principal: "Veículo Particular",
    variacao_percentual: 22,
  },
  {
    destino: "Ponta Negra",
    voos_mensais: 380,
    onibus_mensais: 1200,
    veiculos_terrestres_mensais: 42000,
    modal_principal: "Aéreo + Terrestre",
    variacao_percentual: 42,
  },
  {
    destino: "São Miguel do Gostoso",
    voos_mensais: 0,
    onibus_mensais: 80,
    veiculos_terrestres_mensais: 2200,
    modal_principal: "Veículo Particular",
    variacao_percentual: 8,
  },
];

// --- Investimentos Públicos Mock Data ---
export interface InvestimentoData {
  destino: string;
  investimento_infraestrutura_mil: number;
  investimento_saneamento_mil: number;
  investimento_turismo_mil: number;
  total_mil: number;
  ano: number;
}

export const investimentosData: InvestimentoData[] = [
  {
    destino: "Praia do Madeiro",
    investimento_infraestrutura_mil: 25,
    investimento_saneamento_mil: 15,
    investimento_turismo_mil: 10,
    total_mil: 50,
    ano: 2026,
  },
  {
    destino: "Pipa",
    investimento_infraestrutura_mil: 150,
    investimento_saneamento_mil: 80,
    investimento_turismo_mil: 70,
    total_mil: 300,
    ano: 2026,
  },
  {
    destino: "Ponta Negra",
    investimento_infraestrutura_mil: 400,
    investimento_saneamento_mil: 200,
    investimento_turismo_mil: 200,
    total_mil: 800,
    ano: 2026,
  },
  {
    destino: "São Miguel do Gostoso",
    investimento_infraestrutura_mil: 60,
    investimento_saneamento_mil: 30,
    investimento_turismo_mil: 30,
    total_mil: 120,
    ano: 2026,
  },
];

// --- Fluxo Turístico Consolidado ---
export interface FluxoData {
  destino: string;
  fluxo_visitantes_mes: number;
  receita_estimada_milhoes: number;
  saturacao_turistica: number; // 0-100
  hashtag_instagram: string;
}

export const fluxoData: FluxoData[] = [
  {
    destino: "Praia do Madeiro",
    fluxo_visitantes_mes: 12500,
    receita_estimada_milhoes: 2.5,
    saturacao_turistica: 30,
    hashtag_instagram: "praiadomadeiro",
  },
  {
    destino: "Pipa",
    fluxo_visitantes_mes: 45000,
    receita_estimada_milhoes: 12.0,
    saturacao_turistica: 82,
    hashtag_instagram: "praiadapipa",
  },
  {
    destino: "Ponta Negra",
    fluxo_visitantes_mes: 80000,
    receita_estimada_milhoes: 25.0,
    saturacao_turistica: 90,
    hashtag_instagram: "pontanegranatal",
  },
  {
    destino: "São Miguel do Gostoso",
    fluxo_visitantes_mes: 15000,
    receita_estimada_milhoes: 4.1,
    saturacao_turistica: 45,
    hashtag_instagram: "saomigueldogostoso",
  },
];

// --- Destinos Info (para a visão B2C) ---
export interface DestinoInfo {
  nome: string;
  municipio: string;
  descricao: string;
  imagem: string;
  atracoes: string[];
  hashtag: string;
}

export const destinosInfo: DestinoInfo[] = [
  {
    nome: "Praia do Madeiro",
    municipio: "Tibau do Sul",
    descricao:
      "Famosa pelas falésias deslumbrantes, águas mornas e visitas frequentes de golfinhos. Perfeita para quem busca relaxar em meio à natureza preservada.",
    imagem:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    atracoes: [
      "Ver golfinhos na baía",
      "Aulas de Surf",
      "Caminhadas pelas falésias",
    ],
    hashtag: "praiadomadeiro",
  },
  {
    nome: "Pipa",
    municipio: "Tibau do Sul",
    descricao:
      "Vilarejo cosmopolita com gastronomia sofisticada, baladas vibrantes, praias icônicas e lojas encantadoras.",
    imagem:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
    atracoes: [
      "Pôr do sol na Lagoa de Guaraíras",
      "Noite na Av. Baía dos Golfinhos",
      "Santuário Ecológico",
    ],
    hashtag: "praiadapipa",
  },
  {
    nome: "Ponta Negra",
    municipio: "Natal",
    descricao:
      "Praia urbana mais famosa de Natal com vista para o Morro do Careca. Excelente infraestrutura de hotéis e restaurantes.",
    imagem:
      "https://images.unsplash.com/photo-1582972236019-ea4af5faf580?auto=format&fit=crop&w=800&q=80",
    atracoes: [
      "Foto no Morro do Careca",
      "Passeio de Jangada",
      "Feirinha de Artesanato",
    ],
    hashtag: "pontanegranatal",
  },
  {
    nome: "São Miguel do Gostoso",
    municipio: "São Miguel do Gostoso",
    descricao:
      "Refúgio mundialmente conhecido para Windsurf e Kitesurf, com pousadas charmosas e pôr do sol inesquecível.",
    imagem:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    atracoes: [
      "Pôr do sol no Pontal da Tourinha",
      "Kitesurf na Praia do Cardeiro",
      "Jantar no centro histórico",
    ],
    hashtag: "saomigueldogostoso",
  },
];

// --- Avaliação Rápida Options ---
export const avaliacaoOptions = [
  { id: "limpo", label: "☑ Local Limpo", emoji: "🧹" },
  { id: "sinalizado", label: "☑ Bem Sinalizado", emoji: "🪧" },
  { id: "preservado", label: "☑ Natureza Preservada", emoji: "🌿" },
  { id: "manutencao", label: "☑ Necessita Manutenção", emoji: "🔧", negative: true },
  { id: "superlotado", label: "☑ Superlotado", emoji: "⚠️", negative: true },
];

// --- ISA (Índice de Saúde do Atrativo) Calculator ---
export interface Feedback {
  id?: string;
  destino: string;
  limpo: boolean;
  sinalizado: boolean;
  preservado: boolean;
  manutencao: boolean;
  superlotado: boolean;
  timestamp: number;
}

export function calcularISA(
  destino: string,
  feedbacks: Feedback[]
): number {
  const fluxo = fluxoData.find((f) => f.destino === destino);
  const investimento = investimentosData.find((i) => i.destino === destino);
  if (!fluxo || !investimento) return 70;

  let baseScore = 70;

  // Filter feedbacks for this destination
  const destinoFeedbacks = feedbacks.filter((f) => f.destino === destino);

  if (destinoFeedbacks.length > 0) {
    const positiveCount = destinoFeedbacks.filter(
      (f) => f.limpo && f.sinalizado && f.preservado
    ).length;
    const negativeCount = destinoFeedbacks.filter(
      (f) => f.manutencao
    ).length;
    const overcrowdedCount = destinoFeedbacks.filter(
      (f) => f.superlotado
    ).length;

    const positiveRatio = positiveCount / destinoFeedbacks.length;
    const negativeRatio = negativeCount / destinoFeedbacks.length;
    const overcrowdedRatio = overcrowdedCount / destinoFeedbacks.length;

    baseScore += positiveRatio * 15;
    baseScore -= negativeRatio * 15;
    baseScore -= overcrowdedRatio * 10;
  }

  // Investment bonus
  if (investimento.total_mil > 200) {
    baseScore += 10;
  } else if (investimento.total_mil > 100) {
    baseScore += 5;
  }

  // Saturation penalty
  if (fluxo.saturacao_turistica > 80) {
    baseScore -= 15;
  } else if (fluxo.saturacao_turistica > 60) {
    baseScore -= 5;
  }

  return Math.max(0, Math.min(100, Math.round(baseScore)));
}

// --- All destination names ---
export const allDestinos = destinosInfo.map((d) => d.nome);
