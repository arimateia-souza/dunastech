import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destino, feedbacks, transporteInfo, investimentoInfo, instagramData, isaScore } = body;

    if (!destino) {
      return NextResponse.json(
        { error: "Destino é obrigatório" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return mock AI insight when no API key is configured
      const mockInsight = generateMockInsight(destino, feedbacks, transporteInfo, isaScore);
      return NextResponse.json({
        source: "mock",
        insight: mockInsight,
      });
    }

    // Real Gemini API call
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = buildPrompt(destino, feedbacks, transporteInfo, investimentoInfo, instagramData, isaScore);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      source: "gemini",
      insight: text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Erro ao gerar insights com IA" },
      { status: 500 }
    );
  }
}

function buildPrompt(
  destino: string,
  feedbacks: Array<{limpo: boolean; sinalizado: boolean; preservado: boolean; manutencao: boolean; superlotado: boolean}>,
  transporteInfo: {voos_mensais: number; onibus_mensais: number; veiculos_terrestres_mensais: number; variacao_percentual: number},
  investimentoInfo: {total_mil: number; investimento_infraestrutura_mil: number; investimento_saneamento_mil: number},
  instagramData: {totalLikes: number; totalComments: number; posts: Array<{sentiment: string}>} | null,
  isaScore: number
): string {
  const totalFeedbacks = feedbacks?.length || 0;
  const positiveFeedbacks = feedbacks?.filter(
    (f) => f.limpo && f.sinalizado && f.preservado
  ).length || 0;
  const maintenanceReports = feedbacks?.filter((f) => f.manutencao).length || 0;
  const overcrowdedReports = feedbacks?.filter((f) => f.superlotado).length || 0;

  return `
Você é um analista de inteligência turística sustentável do estado do Rio Grande do Norte.
Analise os dados abaixo sobre o destino "${destino}" e gere um diagnóstico direto e acionável para o secretário de turismo municipal.

## Dados do Destino:

### Índice de Saúde do Atrativo (ISA): ${isaScore}/100

### Avaliações do Sensor Social (B2C):
- Total de avaliações: ${totalFeedbacks}
- Avaliações positivas (limpo + sinalizado + preservado): ${positiveFeedbacks}
- Reportes de necessidade de manutenção: ${maintenanceReports}
- Reportes de superlotação: ${overcrowdedReports}

### Dados de Transporte:
- Voos mensais: ${transporteInfo?.voos_mensais || 0}
- Ônibus mensais: ${transporteInfo?.onibus_mensais || 0}
- Veículos terrestres mensais: ${transporteInfo?.veiculos_terrestres_mensais || 0}
- Variação vs mês anterior: ${transporteInfo?.variacao_percentual || 0}%

### Investimentos Públicos:
- Total investido: R$ ${investimentoInfo?.total_mil || 0} mil
- Infraestrutura: R$ ${investimentoInfo?.investimento_infraestrutura_mil || 0} mil
- Saneamento: R$ ${investimentoInfo?.investimento_saneamento_mil || 0} mil

${instagramData ? `### Dados do Instagram (tempo real):
- Total de Likes nos últimos posts: ${instagramData.totalLikes}
- Total de Comentários: ${instagramData.totalComments}
- Sentimento predominante: ${instagramData.posts?.map((p) => p.sentiment).join(", ") || "N/A"}` : "### Instagram: Dados não disponíveis"}

## Instruções:
1. Forneça um diagnóstico em no máximo 4 parágrafos.
2. Identifique riscos ambientais e de superlotação.
3. Sugira 3 ações concretas e imediatas.
4. Use linguagem direta e profissional para gestores públicos.
5. Responda em português brasileiro.
`;
}

function generateMockInsight(
  destino: string,
  feedbacks: Array<{manutencao: boolean; superlotado: boolean}> | null,
  transporteInfo: {variacao_percentual: number} | null,
  isaScore: number
): string {
  const variacao = transporteInfo?.variacao_percentual || 0;
  const manutencao = feedbacks?.filter((f) => f.manutencao).length || 0;
  const superlotado = feedbacks?.filter((f) => f.superlotado).length || 0;

  let alertLevel = "moderado";
  if (isaScore < 60) alertLevel = "crítico";
  else if (isaScore > 80) alertLevel = "positivo";

  return `## 🤖 Diagnóstico IA — ${destino}

**Nível de Alerta: ${alertLevel.toUpperCase()}** | ISA: ${isaScore}/100

O destino "${destino}" apresenta um aumento de ${variacao}% no fluxo turístico rodoviário e aéreo em relação ao mês anterior. ${manutencao > 0 ? `Foram registradas ${manutencao} avaliação(ões) indicando necessidade de manutenção no local.` : "Não há reportes de manutenção pendente."} ${superlotado > 0 ? `Além disso, ${superlotado} avaliação(ões) indicam superlotação, exigindo atenção imediata.` : ""}

Com base nos indicadores cruzados, o Índice de Saúde do Atrativo (ISA) está em **${isaScore} pontos**, classificado como ${alertLevel}. ${isaScore < 60 ? "Recomenda-se intervenção urgente para evitar degradação ambiental e insatisfação turística." : isaScore > 80 ? "O destino está em boas condições de conservação." : "Atenção preventiva é recomendada para manter a qualidade da experiência turística."}

### Ações Recomendadas:
1. **${isaScore < 60 ? "URGENTE" : "Preventivo"}:** ${isaScore < 60 ? "Reforçar equipe de limpeza e manutenção nas áreas mais frequentadas." : "Manter o nível atual de serviços de limpeza e conservação."}
2. **Mobilidade:** ${variacao > 30 ? "Implementar controle de acesso e estacionamento rotativo para reduzir a pressão veicular." : "Monitorar o fluxo de veículos e considerar alternativas de transporte coletivo."}
3. **Comunicação:** ${superlotado > 0 ? "Ativar o sistema B2C para redirecionar turistas a destinos alternativos com menor saturação." : "Manter campanhas de promoção equilibrada entre os destinos da região."}

*Diagnóstico gerado automaticamente pelo motor de IA DunasTech (modo simulação).*`;
}
