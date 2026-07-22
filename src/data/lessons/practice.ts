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
        heroPosition: 'BTN (Botão)',
        villainAction: 'UTG raise 3x, MP call',
        potSize: 150,
        question: 'Você tem A♠ K♠ no botão. UTG raise 3x, MP call. Sua ação?',
        options: ['Fold', 'Call', 'Raise 3x', 'Raise All-in'],
        correctIndex: 2,
        explanation: '✅ Raise é a melhor jogada! Você tem duas overcards (AK) + flush draw (9 outs) + posição. Raise isola o UTG e pode fazer o MP foldar mãos fracas. Você quer construir o pote com seu draw forte e pode ganhar no flop sem mostrar as cartas.',
        alternativeAnalysis: 'Call também é ok se você quiser manter o MP no pote e jogar multiway com seu draw, mas raise é mais agressivo e lucrativo a longo prazo. Fold seria muito passivo - AK suited é uma das melhores mãos para jogar em posição.',
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
        villainAction: 'CO raise 2.5x, você call. Flop: você check, CO aposta 1/2 pote. Turn: Q',
        potSize: 200,
        question: 'Board: T♥ 8♥ 2♠ Q♣. Você tem JJ no BB. No turn, CO aposta 2/3 pote. Sua ação?',
        options: ['Fold', 'Call', 'Raise', 'All-in'],
        correctIndex: 0,
        explanation: '✅ Fold! A dama no turn é uma péssima carta para você. Agora QJ, QT, KQ, AQ, TQ, 89 viram pares ou duas pontas. CO continuou apostando no turn, o que indica força. Você só tem um par médio sem redraws significativos. Hora de largar.',
        alternativeAnalysis: 'Call seria pagar para ver no river e provavelmente perder mais dinheiro. Raise não faz sentido - você só está representando uma Q (improvável) e mãos melhores vão pagar ou dar re-raise. Na dúvida, fold é lucrativo aqui.',
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
        villainAction: 'BTN raise 3x (você deu raise preflop, BTN deu 3-bet)',
        potSize: 300,
        question: 'Você abriu raise do CO com 5♠6♠, BTN deu 3-bet. Board: 4♥ 7♦ K♣. BTN aposta 2/3 pote. Sua ação?',
        options: ['Fold', 'Call', 'Raise', 'All-in Bluff'],
        correctIndex: 1,
        explanation: '✅ Call! Você tem um gutshot (abertura para straight: 3 ou 8 dão sequência) ~8% de acertar no turn, mas as implied odds são enormes. Se acertar o 8 ou 3, pode ganhar um pote gigante porque o BTN vai achar que você tem K ou nada. Além disso, você pode representar o K em muitas boards.',
        alternativeAnalysis: 'Fold também não é horrível - você tem cerca de 16% de chance com gutshot + backdoor flush. Raise com esse draw fraco seria arriscado. Como você está em posição (CO vs BTN, você age primeiro pós-flop - wait, CO age antes do BTN. Hmm, nessa situação, quem tem posição pós-flop é o BTN, que deu 3-bet. Então você está OOP. Isso torna o call menos atraente, mas as implied odds ainda justificam se você tiver stack profundo.',
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
        heroPosition: 'MP (Média)',
        villainAction: 'UTG call, você raise 4x, UTG call. Flop: você aposta 1/2, UTG dá raise 3x',
        potSize: 800,
        question: 'Board: A♠ Q♠ 5♦. Você tem A♥ Q♥ (top two pair). Você apostou 1/2 pote no flop e UTG deu raise 3x. Sua ação?',
        options: ['Fold', 'Call', 'Raise 3x', 'All-in'],
        correctIndex: 2,
        explanation: '✅ Raise 3x! Top two pair é uma mão fortíssima nesse board. UTG pode ter A5, Q5, AQ (improvável), 55, ou um flush draw (K♠X♠, J♠T♠). Você está na frente da maioria dessas mãos. Raise para proteger contra draws e extrair valor de mãos piores como A-x fraco.',
        alternativeAnalysis: 'Call é muito passivo - você deixa o UTG ver o turn de graça com draws. Se sair uma espada no turn, você não sabe se ele acertou ou não. Você tem top two pair e quer construir o pote agora. Se ele tiver 55 (set), paciência - é cooler. A longo prazo, raise aqui é mais lucrativo.',
      },
    ],
  },
]
