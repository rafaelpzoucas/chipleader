import type { Lesson } from '@/models/learning'

export const practiceLessons: Lesson[] = [
  {
    id: 'decision-making',
    title: 'Mãos Práticas',
    description: 'Situações reais de mesa para tomar decisões',
    category: 'practice',
    order: 1,
    xpReward: 35,
    content: [
      {
        type: 'text',
        text: 'A melhor forma de aprender poker é praticando decisões. Em cada mão abaixo, analise a situação e escolha a melhor jogada.',
      },
      {
        type: 'tip',
        text: 'Pense em: range do oponente, odds do pote, posição, força da sua mão e implied odds antes de decidir.',
      },
    ],
    questions: [],
    scenarios: [
      {
        heroCards: [
          { rank: 'A', suit: 's' },
          { rank: 'K', suit: 's' },
        ],
        board: [
          { rank: 'Q', suit: 's' },
          { rank: '7', suit: 's' },
          { rank: '2', suit: 'h' },
        ],
        heroPosition: 'BTN (Botao)',
        villainAction: 'UTG raise 3x, MP call',
        potSize: 150,
        question: 'Voce tem A-E K-E no botao. UTG raise 3x, MP call. Sua acao?',
        options: ['Fold', 'Call', 'Raise 3x', 'Raise All-in'],
        correctIndex: 2,
        explanation: 'Raise e a melhor jogada! Voce tem duas overcards (AK) + flush draw (9 outs) + posicao. Raise isola o UTG e pode fazer o MP foldar maos fracas. Voce quer construir o pote com seu draw forte e pode ganhar no flop sem mostrar as cartas.',
        alternativeAnalysis: 'Call tambem e ok se voce quiser manter o MP no pote e jogar multiway com seu draw, mas raise e mais agressivo e lucrativo a longo prazo. Fold seria muito passivo - AK suited e uma das melhores maos para jogar em posicao.',
      },
      {
        heroCards: [
          { rank: 'J', suit: 'c' },
          { rank: 'J', suit: 'd' },
        ],
        board: [
          { rank: 'T', suit: 'h' },
          { rank: '8', suit: 'h' },
          { rank: '2', suit: 's' },
          { rank: 'Q', suit: 'c' },
        ],
        heroPosition: 'BB (Big Blind)',
        villainAction: 'CO raise 2.5x, voce call. Flop: voce check, CO aposta 1/2 pote. Turn: Q',
        potSize: 200,
        question: 'Board: 10-C 8-C 2-E Q-P. Voce tem JJ no BB. No turn, CO aposta 2/3 pote. Sua acao?',
        options: ['Fold', 'Call', 'Raise', 'All-in'],
        correctIndex: 0,
        explanation: 'Fold! A dama no turn e uma pessima carta para voce. Agora QJ, QT, KQ, AQ, TQ, 89 viram pares ou duas pontas. CO continuou apostando no turn, o que indica forca. Voce so tem um par medio sem redraws significativos. Hora de largar.',
        alternativeAnalysis: 'Call seria pagar para ver no river e provavelmente perder mais dinheiro. Raise nao faz sentido - voce so esta representando uma Q (improvavel) e maos melhores vao pagar ou dar re-raise. Na duvida, fold e lucrativo aqui.',
      },
      {
        heroCards: [
          { rank: '5', suit: 's' },
          { rank: '6', suit: 's' },
        ],
        board: [
          { rank: '4', suit: 'h' },
          { rank: '7', suit: 'd' },
          { rank: 'K', suit: 'c' },
        ],
        heroPosition: 'CO (Cut-off)',
        villainAction: 'BTN raise 3x (voce deu raise preflop, BTN deu 3-bet)',
        potSize: 300,
        question: 'Voce abriu raise do CO com 5-E 6-E, BTN deu 3-bet. Board: 4-C 7-O K-P. BTN aposta 2/3 pote. Sua acao?',
        options: ['Fold', 'Call', 'Raise', 'All-in Bluff'],
        correctIndex: 1,
        explanation: 'Call! Voce tem um gutshot (abertura para straight: 3 ou 8 dao sequencia) ~8% de acertar no turn, mas as implied odds sao enormes. Se acertar o 8 ou 3, pode ganhar um pote gigante porque o BTN vai achar que voce tem K ou nada. Alem disso, voce pode representar o K em muitas boards.',
        alternativeAnalysis: 'Fold tambem nao e horrivel - voce tem cerca de 16% de chance com gutshot + backdoor flush. Raise com esse draw fraco seria arriscado. Como voce esta fora de posicao (CO age antes do BTN pos-flop), o call e menos atraente, mas as implied odds ainda justificam com stack profundo.',
      },
      {
        heroCards: [
          { rank: 'A', suit: 'h' },
          { rank: 'Q', suit: 'h' },
        ],
        board: [
          { rank: 'A', suit: 's' },
          { rank: 'Q', suit: 's' },
          { rank: '5', suit: 'd' },
        ],
        heroPosition: 'MP (Media)',
        villainAction: 'UTG call, voce raise 4x, UTG call. Flop: voce aposta 1/2, UTG da raise 3x',
        potSize: 800,
        question: 'Board: A-E Q-E 5-O. Voce tem A-C Q-C (top two pair). Voce apostou 1/2 pote no flop e UTG deu raise 3x. Sua acao?',
        options: ['Fold', 'Call', 'Raise 3x', 'All-in'],
        correctIndex: 2,
        explanation: 'Raise 3x! Top two pair e uma mao fortissima nesse board. UTG pode ter A5, Q5, AQ (improvarel), 55, ou um flush draw (K-E X-E, J-E 10-E). Voce esta na frente da maioria dessas maos. Raise para proteger contra draws e extrair valor de maos piores como A-x fraco.',
        alternativeAnalysis: 'Call e muito passivo - voce deixa o UTG ver o turn de graca com draws. Se sair uma espada no turn, voce nao sabe se ele acertou ou nao. Voce tem top two pair e quer construir o pote agora. Se ele tiver 55 (set), paciencia - e cooler. A longo prazo, raise aqui e mais lucrativo.',
      },
    ],
  },
]
