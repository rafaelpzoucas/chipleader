import type { Lesson } from '@/models/learning'

export const handLessons: Lesson[] = [
  {
    id: 'hand-rankings',
    title: 'Ranking de Mãos',
    description: 'Aprenda a ordem de força das mãos no poker',
    category: 'hands',
    order: 1,
    xpReward: 20,
    content: [
      {
        type: 'text',
        text: 'No poker, as mãos são ranqueadas da mais forte para a mais fraca. Saber o ranking é essencial para saber se sua mão é boa ou não.',
      },
      {
        type: 'example',
        text: 'Ranking (maior para menor):\n1️⃣ Royal Flush\n2️⃣ Straight Flush\n3️⃣ Four of a Kind\n4️⃣ Full House\n5️⃣ Flush\n6️⃣ Straight\n7️⃣ Three of a Kind\n8️⃣ Two Pair\n9️⃣ One Pair\n🔟 High Card',
      },
      {
        type: 'tip',
        text: 'Dica: decore pelo menos o top 5. Royal Flush, Straight Flush, Quadra, Full House e Flush são as mãos mais fortes.',
      },
    ],
    questions: [
      {
        id: 'hr-1',
        question: 'Qual mão é mais forte?',
        options: ['Flush', 'Full House', 'Straight', 'Three of a Kind'],
        correctIndex: 1,
        explanation: 'Full House vence Flush, Straight e Three of a Kind. A ordem é: Full House > Flush > Straight > Three of a Kind.',
      },
      {
        id: 'hr-2',
        question: 'O que vence: um Straight ou um Flush?',
        options: ['Straight', 'Flush', 'Empatam', 'Depende das cartas'],
        correctIndex: 1,
        explanation: 'Flush vence Straight! No ranking, Flush é a 5ª mão mais forte, Straight é a 6ª.',
      },
      {
        id: 'hr-3',
        question: 'Qual mão está no topo do ranking?',
        options: ['Straight Flush', 'Four of a Kind', 'Royal Flush', 'Full House'],
        correctIndex: 2,
        explanation: 'Royal Flush é a mão mais forte do poker: A, K, Q, J, 10 do mesmo naipe.',
      },
    ],
  },
  {
    id: 'starting-hands',
    title: 'Mãos Iniciais',
    description: 'Quais mãos jogar em cada posição',
    category: 'hands',
    order: 2,
    xpReward: 25,
    content: [
      {
        type: 'text',
        text: 'Nem toda mão vale a pena ser jogada. Mãos iniciais fortes aumentam suas chances de vencer o pote.',
      },
      {
        type: 'example',
        text: 'Mãos premium (sempre raise):\n🅰️🅰️ Aces (AA)\n🅺🅺 Kings (KK)\n🆀🆀 Queens (QQ)\n🅰🅺 AKo/AKs (AK)\n\nMãos fortes:\nJJ, TT, 99, AQ, AJs, KQs',
      },
      {
        type: 'tip',
        text: 'Dica: em posição inicial (UTG), jogue apenas ~10% das mãos. No botão, pode expandir para ~30-40%.',
      },
    ],
    questions: [
      {
        id: 'sh-1',
        question: 'Qual destas NÃO é considerada uma mão premium?',
        options: ['AA', 'KK', 'AK', 'AJo'],
        correctIndex: 3,
        explanation: 'AJo (Ace-Jack offsuit) não é premium. Apenas AA, KK, QQ, AK são consideradas premium.',
      },
      {
        id: 'sh-2',
        question: 'De quantas posições você deve jogar menos mãos?',
        options: ['BTN (Botão)', 'CO (Cut-off)', 'UTG (Under the Gun)', 'MP (Média)'],
        correctIndex: 2,
        explanation: 'UTG é a posição mais inicial. Você age primeiro, então deve jogar apenas as mãos mais fortes (~10%).',
      },
      {
        id: 'sh-3',
        question: 'QQ (Queens) é uma mão forte o suficiente para dar raise pré-flop?',
        options: ['Sim, sempre', 'Não, muito fraca', 'Só dar call', 'Depende do naipe'],
        correctIndex: 0,
        explanation: 'QQ é a 3ª melhor mão inicial do poker. Sempre deve dar raise.',
      },
    ],
  },
]
