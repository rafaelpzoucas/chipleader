export interface GlossaryEntry {
  term: string
  definition: string
}

export const GLOSSARY: GlossaryEntry[] = [
  { term: "Fold", definition: "Desistir da mão, descartando as cartas" },
  { term: "Call", definition: "Pagar o valor da aposta atual" },
  { term: "Raise", definition: "Aumentar o valor da aposta atual" },
  { term: "Check", definition: "Passar a vez sem pagar (quando não há aposta a pagar)" },
  { term: "C-Bet", definition: "Continuação da aposta (apostar no flop após ter dado raise no pré-flop)" },
  { term: "3-Bet", definition: "Re-raise após um raise inicial" },
  { term: "Blind", definition: "Aposta obrigatória antes de ver as cartas (Small Blind e Big Blind)" },
  { term: "Showdown", definition: "Revelação das cartas para determinar o vencedor" },
  { term: "Pot Odds", definition: "Relação entre o valor a pagar e o tamanho do pote" },
  { term: "Outs", definition: "Cartas restantes que melhoram sua mão" },
  { term: "Equity", definition: "Chance percentual de vencer a mão" },
  { term: "Bluff", definition: "Apostar com mão fraca para fazer o oponente foldar" },
  { term: "Value Bet", definition: "Apostar com mão forte para ser pago por mãos piores" },
  { term: "Position", definition: "Ordem de ação na mesa; agir por último é vantajoso" },
  { term: "Range", definition: "Conjunto de mãos que um jogador pode ter" },
  { term: "Implied Odds", definition: "Ganhos futuros esperados se acertar o draw" },
]

export function getRandomTerms(count: number): GlossaryEntry[] {
  const shuffled = [...GLOSSARY].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
