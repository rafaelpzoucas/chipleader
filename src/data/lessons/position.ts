import type { Lesson } from '@/models/learning'

export const positionLessons: Lesson[] = [
  {
    id: 'table-positions',
    title: 'Posições na Mesa',
    description: 'Entenda as posições e como elas afetam sua estratégia',
    category: 'position',
    order: 1,
    xpReward: 20,
    content: [
      {
        type: 'text',
        text: 'No poker, sua posição na mesa determina quando você age. Quanto mais tarde você age, mais informação você tem sobre os oponentes.',
      },
      {
        type: 'example',
        text: 'Posições em uma mesa 6-max (6 jogadores):\n\n1️⃣ UTG (Under the Gun) - Age primeiro\n2️⃣ MP (Middle Position)\n3️⃣ CO (Cut-Off)\n4️⃣ BTN (Botão/Dealer) - Melhor posição!\n5️⃣ SB (Small Blind)\n6️⃣ BB (Big Blind)\n\nQuanto mais cedo você age, mais forte sua mão precisa ser.',
      },
      {
        type: 'tip',
        text: 'Dica: no BTN (botão) você age depois de todos no flop/turn/river. É a posição mais lucrativa. Aumente seu range de mãos no BTN.',
      },
    ],
    questions: [
      {
        id: 'tp-1',
        question: 'Qual a melhor posição na mesa de poker?',
        options: ['UTG', 'MP', 'BTN (Botão)', 'BB (Big Blind)'],
        correctIndex: 2,
        explanation: 'BTN é a melhor posição porque você age por último em todas as rodadas pós-flop, tendo máxima informação.',
      },
      {
        id: 'tp-2',
        question: 'Por que UTG é uma posição difícil de jogar?',
        options: [
          'Porque você paga o maior blind',
          'Porque você age primeiro, sem informação',
          'Porque você nunca tem mão boa',
          'Não é difícil',
        ],
        correctIndex: 1,
        explanation: 'UTG age primeiro pré-flop e não sabe o que os outros vão fazer. Precisa de mãos mais fortes para jogar.',
      },
      {
        id: 'tp-3',
        question: 'Em uma mesa 6-max, qual a ordem correta de ação (do primeiro ao último)?',
        options: [
          'BTN -> CO -> MP -> UTG -> SB -> BB',
          'UTG -> MP -> CO -> BTN -> SB -> BB',
          'BB -> SB -> BTN -> CO -> MP -> UTG',
          'UTG -> BTN -> MP -> CO -> SB -> BB',
        ],
        correctIndex: 1,
        explanation: 'A ordem é: UTG (primeiro), MP, CO, BTN, SB, BB. UTG age primeiro, BB age último no pré-flop.',
      },
    ],
  },
]
