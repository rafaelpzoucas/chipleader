import type { Lesson } from '@/models/learning'

export const oddsLessons: Lesson[] = [
  {
    id: 'pot-odds-basics',
    title: 'Pot Odds Passo a Passo',
    description: 'Aprenda a calcular na mão, do zero',
    category: 'odds',
    order: 1,
    xpReward: 30,
    content: [
      {
        type: 'text',
        text: 'Pot odds parece complicado, mas na prática é só uma conta de divisão. Vamos aprender bem devagar.',
      },
      {
        type: 'text',
        text: 'Você só precisa de 2 informações:\n\n1️⃣ Quanto você precisa pagar?\n2️⃣ Qual o tamanho total do pote DEPOIS de você pagar?\n\nA fórmula é:\n\nPot Odds = (valor do call) ÷ (pote total após o call)\n\nO resultado vira porcentagem. Exemplo: 0.25 = 25%',
      },
      {
        type: 'example',
        text: '🚀 PASSO A PASSO:\n\nVamos de um exemplo muito fácil:\n\nAbriu um pote de R$ 10.\nVillain aposta R$ 5.\n\nPasso 1: Quanto pagar? → R$ 5\nPasso 2: Pote atual é R$ 10 + R$ 5 (aposta dele) = R$ 15\nPasso 3: Depois de pagar, pote total = R$ 15 + R$ 5 (seu call) = R$ 20\nPasso 4: Pot Odds = 5 ÷ 20 = 0.25 = 25%\n\nSignifica: você precisa ter pelo menos 25% de chance de vencer para pagar.',
      },
      {
        type: 'tip',
        text: '💡 Truque mental: Pense em fração. "Estou pagando R$5 para ganhar R$20. São 5/20 = 1/4 = 25%". Se for mais fácil, simplifique a fração antes de dividir.',
      },
      {
        type: 'example',
        text: '📐 MAIS UM EXEMPLO:\n\nPote: R$ 60\nAposta do oponente: R$ 20\n\nValor do call: R$ 20\nPote após call: 60 + 20 (aposta) + 20 (seu call) = R$ 100\nPot Odds: 20 ÷ 100 = 20%\n\nPrecisa de 20% de chance ou mais para pagar.',
      },
    ],
    questions: [
      {
        id: 'po-1',
        question: 'Pote: R$ 10. Oponente aposta R$ 5. Quanto você precisa pagar?',
        options: ['R$ 5', 'R$ 10', 'R$ 15', 'R$ 20'],
        correctIndex: 0,
        explanation: 'O valor do call é o quanto o oponente apostou: R$ 5. Você paga R$ 5 para tentar ganhar o pote.',
      },
      {
        id: 'po-2',
        question: 'Pote: R$ 30. Oponente aposta R$ 10. Qual o tamanho do pote DEPOIS do seu call?',
        options: ['R$ 30', 'R$ 40', 'R$ 50', 'R$ 60'],
        correctIndex: 2,
        explanation: 'Pote atual: R$ 30. Aposta dele: R$ 10. Seu call: R$ 10. Total = 30 + 10 + 10 = R$ 50.',
      },
      {
        id: 'po-3',
        question: 'Pote: R$ 40. Oponente aposta R$ 10. Qual a Pot Odds?',
        options: ['10%', '16.6%', '20%', '25%'],
        correctIndex: 1,
        explanation: 'Call: R$ 10. Pote total após call: 40 + 10 + 10 = R$ 60. Pot Odds = 10 ÷ 60 = 0.166 = 16.6%. Você precisa de ~17% de chance para pagar.',
      },
      {
        id: 'po-4',
        question: 'Pote: R$ 100. Oponente aposta R$ 50. Qual a Pot Odds?',
        options: ['50%', '33%', '25%', '40%'],
        correctIndex: 2,
        explanation: 'Call: R$ 50. Pote total: 100 + 50 + 50 = R$ 200. Pot Odds = 50 ÷ 200 = 0.25 = 25%. Precisa de 25% de chance.',
      },
    ],
  },
  {
    id: 'outs-and-rule',
    title: 'Outs e Regra do 4 e 2',
    description: 'Calcule sua chance de acertar o draw',
    category: 'odds',
    order: 2,
    xpReward: 30,
    content: [
      {
        type: 'text',
        text: 'Outs são as cartas que melhoram sua mão. Se você tem 4 cartas de um naipe, faltam 9 cartas desse naipe no baralho. Você tem 9 outs.',
      },
      {
        type: 'example',
        text: '🔢 REGRA DO 4 E 2:\n\nNo Flop (faltam 2 cartas):\nChance = outs × 4\n\nNo Turn (falta 1 carta):\nChance = outs × 2\n\nExemplo:\nProjeto de flush no flop = 9 outs\nChance de acertar até o river = 9 × 4 = 36%\n\nProjeto de straight no turn = 8 outs\nChance de acertar no river = 8 × 2 = 16%',
      },
      {
        type: 'text',
        text: '🃏 QUANTOS OUTS CADA DRAW TEM?\n\n• Projeto de flush (4 do naipe): 9 outs\n• Projeto de straight aberto (ex: 8-9-J-Q): 8 outs\n• Projeto de straight fechado (ex: 8-9-J-K): 4 outs\n• Duas overcards (ex: AK no board Q-7-2): 6 outs\n• Par + flush draw: ~12-14 outs',
      },
      {
        type: 'tip',
        text: 'Juntando tudo: se no flop seus outs × 4 for MAIOR que a pot odds, o call é lucrativo! Ex: flush draw no flop = 36%. Se pot odds for 25%, CALL lucrativo. Se pot odds for 50%, FOLD.',
      },
    ],
    questions: [
      {
        id: 'outs-1',
        question: 'Quantos outs tem um flush draw (4 cartas do mesmo naipe) no flop?',
        options: ['4 outs', '9 outs', '13 outs', '8 outs'],
        correctIndex: 1,
        explanation: 'Existem 13 cartas de cada naipe. Você tem 4, então faltam 13 - 4 = 9 outs.',
      },
      {
        id: 'outs-2',
        question: 'Qual a chance de acertar um flush draw no flop (9 outs, faltam 2 cartas)?',
        options: ['18%', '36%', '9%', '27%'],
        correctIndex: 1,
        explanation: 'Regra do 4: no flop, outs × 4. 9 × 4 = 36% de chance de acertar até o river.',
      },
      {
        id: 'outs-3',
        question: 'Você tem 8 outs no turn (projeto de straight aberto). Qual a chance no river?',
        options: ['32%', '8%', '24%', '16%'],
        correctIndex: 3,
        explanation: 'Regra do 2: no turn, outs × 2. 8 × 2 = 16% de chance de acertar no river.',
      },
      {
        id: 'outs-4',
        question: 'Pote: R$ 80. Oponente aposta R$ 20. Pot Odds = ? Seu flush draw no flop (36%). Deve pagar?',
        options: ['Pot odds 50%, NÃO pagar', 'Pot odds 20%, SIM pagar', 'Pot odds 25%, SIM pagar', 'Pot odds 16%, SIM pagar'],
        correctIndex: 1,
        explanation: 'Call: R$ 20. Pote total: 80 + 20 + 20 = R$ 120. Pot Odds = 20/120 = 16.6%. Sua equidade é 36% (flush draw no flop). 36% > 16.6% → SIM, call lucrativo!',
      },
    ],
  },
]
