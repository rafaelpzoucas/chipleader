export interface LessonIntro {
  explanation: string
  howToAnswer: string
  visualType?: 'hand_ranking' | 'position' | 'pot_odds' | 'terminology'
  tip?: string
}

export const lessonIntros: Record<string, LessonIntro> = {
  // ── Unit 1: Hand Ranking ──
  'm1-u1-l1': {
    explanation: "No pôquer, cada combinação de 5 cartas forma uma 'mão'. Algumas mãos são mais fortes que outras, igual no jogo de pedra-papel-tesoura.\n\nA mão mais fraca é a 'carta alta' (High Card) — você só tem uma carta alta e nada mais. Um 'par' (Pair) já é mais forte: duas cartas do mesmo valor, tipo dois 7.\n\nPense assim: um par é como ter dois soldados iguais do seu lado, enquanto carta alta é um soldado sozinho.",
    howToAnswer: "Olhe as duas mãos na mesa. Compare qual delas forma a melhor combinação de 5 cartas. A mão mais forte vence!",
    visualType: 'hand_ranking',
    tip: "Decore a ordem do mais fraco ao mais forte: High Card → Pair → Two Pair → Three of a Kind → Straight → Flush → Full House → Four of a Kind → Straight Flush → Royal Flush",
  },
  'm1-u1-l2': {
    explanation: "Agora vamos aprender sobre 'Dois Pares' e 'Trinca' (Three of a Kind).\n\n'Dois Pares' é quando você tem duas cartas iguais E mais duas cartas iguais diferentes. Exemplo: dois 7 e dois 10. É mais forte que um par só!\n\n'Trinca' é quando você tem TRÊS cartas iguais. Exemplo: três reis. Trinca ganha de dois pares, porque três iguais é mais raro que dois pares.",
    howToAnswer: "Compare as mãos: veja se alguma tem par, dois pares ou trinca. Quanto mais cartas iguais, mais forte (em geral)!",
    visualType: 'hand_ranking',
    tip: "Dois pares altos (ex: AA+KK) é muito forte. Mas cuidado: se o board tiver 3 cartas do mesmo naipe, alguém pode ter flush!",
  },
  'm1-u1-l3': {
    explanation: "Hora das sequências! 'Straight' (sequência) é quando você tem 5 cartas em ordem, tipo 5-6-7-8-9. Não importa o naipe, só a ordem.\n\n'Flush' é quando você tem 5 cartas do MESMO naipe (todas de copas, por exemplo). Também não precisa estar em ordem.\n\nOs dois vencem qualquer par ou trinca. Entre um straight e um flush, o flush ganha — é mais difícil fazer 5 cartas do mesmo naipe do que 5 em sequência.",
    howToAnswer: "Veja se alguma mão tem 5 cartas em sequência (straight) ou 5 cartas do mesmo naipe (flush). Se tiver, essa mão é forte!",
    visualType: 'hand_ranking',
    tip: "Straight com cartas altas (AKQJT) é o straight mais forte. Flush com Ás é o flush mais forte.",
  },
  'm1-u1-l4': {
    explanation: "Agora as mãos mais poderosas!\n\n'Full House' é três cartas iguais + um par. Tipo três 7 e dois 9. É como ter uma trinca com amigos — muito forte!\n\n'Four of a Kind' (Quadra) é QUATRO cartas iguais. Quatro ases! Isso é raríssimo.\n\n'Straight Flush' é a segunda mão mais forte: 5 cartas em sequência E do mesmo naipe. Tipo 5-6-7-8-9 tudo de copas.\n\n'Royal Flush' é a mão imbatível: A-K-Q-J-T tudo do mesmo naipe. Quase nunca aparece!",
    howToAnswer: "Compare as mãos. Lembre: Full House > Flush/Straight > Trinca/Dois Pares. Quadra > Full House. Straight Flush > tudo!",
    visualType: 'hand_ranking',
    tip: "Full House de KKK+AA é mais forte que 777+99. Compare a trinca primeiro, depois o par.",
  },

  // ── Unit 2: Positions ──
  'm1-u2-l1': {
    explanation: "Em uma mesa de poker com 6 pessoas, cada um senta em um lugar diferente. E cada lugar tem um nome especial!\n\nImagine a mesa como uma roda gigante. O 'Dealer' (botão) é o centro. As posições são:\n\nUTG (Under the Gun) — age primeiro, sem saber nada\nHJ (Hijack) — quase no meio\nCO (Cut-Off) — uma antes do botão\nBTN (Button) — o botão, melhor lugar!\nSB (Small Blind) — aposta um pouco\nBB (Big Blind) — aposta mais\n\nSer o último a agir é como ver todo mundo escolher a comida antes de você escolher — você sabe o que sobrou!",
    howToAnswer: "Vou mostrar um assento na mesa. Seu trabalho é identificar qual posição está naquele assento. Pense na ordem da rodinha!",
    visualType: 'position',
    tip: "Decore a ordem horária: UTG → HJ → CO → BTN → SB → BB. No pré-flop, UTG age primeiro, BB age por último.",
  },
  'm1-u2-l2': {
    explanation: "No poker, a ordem de ação muda dependendo se é pré-flop ou pós-flop.\n\nPré-flop (antes das cartas da mesa): UTG age PRIMEIRO, depois HJ, CO, BTN, SB, e BB age por ÚLTIMO.\n\nPós-flop (depois das cartas da mesa): o Small Blind age primeiro, e o Button age por último. A ordem fica: SB → BB → UTG → HJ → CO → BTN.\n\nÉ como uma fila: no pré-flop, a fila começa no UTG. No pós-flop, começa no SB.",
    howToAnswer: "Vou perguntar quem age depois de alguém. Siga a ordem: UTG→HJ→CO→BTN→SB→BB (pré-flop) ou SB→BB→UTG→HJ→CO→BTN (pós-flop).",
    visualType: 'position',
    tip: "No pós-flop, o BTN (dealer) age por último em TODAS as rodadas — maior vantagem do poker!",
  },
  'm1-u2-l3': {
    explanation: "Por que posição é tão importante?\n\nImagina um jogo de adivinhação onde todo mundo tem que falar um número. Se você fala primeiro, todo mundo ouve sua resposta e pode copiar ou mudar a deles. Se você fala por último, você já sabe o que todo mundo disse e pode escolher a melhor resposta!\n\nNo poker é igual. Quem age por último vê TODO MUNDO agir antes. Se ninguém apostou, você pode apostar. Se alguém já apostou forte, você pode desistir sem perder mais fichas.\n\nO Button (BTN) é o rei das posições — ele age por último sempre!",
    howToAnswer: "Vou perguntar qual posição é melhor ou pior. Lembre: BTN é a melhor (age por último), UTG é a pior (age primeiro).",
    visualType: 'position',
    tip: "Jogue MAIS mãos no BTN e CO (posições tardias) e MENOS mãos no UTG e HJ (posições iniciais).",
  },
  'm1-u2-l4': {
    explanation: "Cada posição pede uma estratégia diferente:\n\nUTG (age primeiro) — seja cuidadoso! Só jogue mãos fortes como AA, KK, QQ, AK. Você não sabe o que vem depois.\n\nHJ e CO — pode soltar um pouco mais. Adicione mãos como AJ, KQ, pares médios.\n\nBTN (age por último) — pode jogar BASTANTE mãos! Você tem a melhor posição.\n\nSB — cuidado, você age quase primeiro no pós-flop e já colocou dinheiro.\n\nBB — você já pagou o blind, então pode defender com mãos mais fracas.\n\nÉ como cada posição ter uma 'carteira' diferente de mãos que você pode jogar.",
    howToAnswer: "Vou perguntar qual estratégia usar em cada posição. Pense: posições iniciais = mãos fortes, posições tardias = mais mãos.",
    visualType: 'position',
    tip: "Regra de ouro: do UTG pro BTN, aumente a quantidade de mãos que você joga. Do BTN pro SB, diminua.",
  },

  // ── Unit 3: Pot Odds ──
  'm1-u3-l1': {
    explanation: "Pot Odds é um termo chique para responder: 'Vale a pena pagar essa aposta?'\n\nImagine que você está em um piquenique. Tem um bolo gigante na mesa (o pote) e você precisa pagar R$ 5 para concorrer a ele. O bolo vale R$ 20. Se você pagar R$ 5 para tentar ganhar R$ 20, é um bom negócio!\n\nPara calcular: divida o valor que você precisa pagar pelo total do pote DEPOIS de você pagar.\n\nPot Odds = (valor do call) / (pote atual + call do vilão + seu call)\n\nSe as odds forem baixas, é barato continuar. Se forem altas, é caro.",
    howToAnswer: "Olhe o pote e o valor da aposta. Calcule: call / (pote + call + call do vilão). Depois multiplique por 100 para ter a porcentagem.",
    visualType: 'pot_odds',
    tip: "Pot odds de 25% ou menos geralmente é barato. Acima de 40% é caro — só pague se sua mão for muito forte!",
  },
  'm1-u3-l2': {
    explanation: "Vamos praticar pot odds em situações reais!\n\nLembre: Pot Odds = quanto você paga / pote total depois do call.\n\nExemplo: Pote tem R$ 100. Vilão aposta R$ 50. Você precisa pagar R$ 50 para tentar ganhar R$ 200 (100 + 50 + 50). Pot odds = 50/200 = 25%.\n\nIsso significa que você precisa de pelo menos 25% de chance de ganhar para justificar o call. Se sua mão tiver mais que 25% de equidade, o call é lucrativo!",
    howToAnswer: "Calcule os pot odds: divida o valor do call pelo total do pote após seu call. Escolha a opção que tem a % correta.",
    visualType: 'pot_odds',
    tip: "Decore: call de 1/3 do pote = 25% de pot odds. 1/2 = 33%. 3/4 = 43%. Pote cheio = 50%.",
  },
  'm1-u3-l3': {
    explanation: "Equidade é sua chance REAL de ganhar a mão. Pot odds é o PREÇO que você paga para continuar.\n\nSe sua equidade é MAIOR que os pot odds → vale a pena pagar!\nSe sua equidade é MENOR que os pot odds → não vale, melhor desistir.\n\nExemplo: Você tem 30% de chance de fazer um flush (equidade). Os pot odds são 25%. 30% > 25% → CALL lucrativo!\n\nPense como uma balança: equidade de um lado, pot odds do outro. Se equidade for maior, o call é bom!",
    howToAnswer: "Compare equidade com pot odds. Equidade > Pot Odds → Call. Equidade < Pot Odds → Fold. Simples assim!",
    visualType: 'pot_odds',
    tip: "Com flush draw no flop, você tem ~36% de equidade (regra do 4). Com straight draw, ~32%. Use isso para comparar rápido!",
  },
  'm1-u3-l4': {
    explanation: "Agora você vai praticar decisões completas: olhar a mão, calcular equidade, calcular pot odds, e decidir!\n\nPasso a passo:\n1. Calcule pot odds (call / pote total)\n2. Estime sua equidade (chance de vencer)\n3. Se equidade > pot odds → CALL\n4. Se equidade < pot odds → FOLD\n\nNa prática, profissionais fazem essa conta em segundos. Você também vai aprender!",
    howToAnswer: "Calcule os pot odds, estime sua equidade, e decida: se equidade for maior que pot odds, o call é correto.",
    visualType: 'pot_odds',
    tip: "Com implied odds (fichas que você pode ganhar no futuro), você pode pagar um pouco mais caro. Mas só se o vilão pagar muito!",
  },

  // ── Unit 4: Terminology ──
  'm1-u4-l1': {
    explanation: "Poker tem uma linguagem própria. Vamos aprender as ações básicas:\n\nFold (F) — Desistir da mão. Você joga as cartas fora. Perde o que já apostou, mas não perde mais.\n\nCall (C) — Pagar o valor da aposta. Você iguala o que o outro apostou para continuar na mão.\n\nRaise (R) — Aumentar a aposta. Você não só paga como aumenta o valor.\n\nCheck (X) — Passar a vez. Só pode quando ninguém apostou antes de você. É como falar 'passo'.\n\nÉ como num jogo de tabuleiro: fold é sair do jogo, call é acompanhar, raise é aumentar a aposta, check é passar a vez.",
    howToAnswer: "Vou mostrar um termo de poker. Escolha a definição correta entre as opções. Pense no significado mais simples!",
    visualType: 'terminology',
    tip: "Decore: Fold = desistir, Call = pagar, Raise = aumentar, Check = passar. Esses 4 são a base de TUDO no poker.",
  },
  'm1-u4-l2': {
    explanation: "Agora termos mais avançados de apostas:\n\nC-Bet (Continuation Bet) — quando você deu raise antes do flop e aposta NOVAMENTE no flop. É uma aposta de 'continuação'.\n\n3-Bet — é o TERCEIRO aumento. Alguém abre (1ª aposta), alguém dá raise (2ª), e você dá outro raise (3ª = 3-bet).\n\nBlind — as apostas obrigatórias. Small Blind é a menor, Big Blind é a maior. Todo mundo tem que pagar uma vez por rodada.\n\nShowdown — quando sobram dois ou mais jogadores e TODOS mostram as cartas para ver quem ganha.",
    howToAnswer: "Leia o termo e escolha a definição certa. C-bet e 3-bet são os mais importantes de lembrar!",
    visualType: 'terminology',
    tip: "C-bet funciona bem quando você foi o agressor pré-flop. 3-bet mostra força — use com AA, KK, AK.",
  },
  'm1-u4-l3': {
    explanation: "Termos de probabilidade que todo jogador precisa saber:\n\nOuts — as cartas que podem SALVAR você. Se você tem 4 cartas de copas, faltam 9 copas no baralho — você tem 9 outs.\n\nEquity — sua chance de vencer em porcentagem. Se você tem 36% de equity, significa que ganharia 36 de cada 100 vezes.\n\nPot Odds — a conta que fizemos na unit anterior. A relação entre o que você paga e o tamanho do pote.\n\nImplied Odds — quanto você pode ganhar no FUTURO se acertar seu draw. Bons jogadores pensam nisso!",
    howToAnswer: "Relacione o termo com sua definição. Outs = cartas que ajudam. Equity = chance de vencer. Pot Odds = conta do call.",
    visualType: 'terminology',
    tip: "Regra do 4 e 2: no flop, outs × 4 = equity aproximada. No turn, outs × 2 = equity aproximada.",
  },
  'm1-u4-l4': {
    explanation: "Termos de estratégia avançada:\n\nBluff — apostar com mão RUIM para fazer o oponente DESISTIR de uma mão boa. É uma mentirinha no poker.\n\nValue Bet — apostar com mão BOA para ser pago por mãos PIORES. É quando você quer que o oponente pague.\n\nRange — o CONJUNTO de mãos que o oponente pode ter. Não é uma mão específica, mas todas as possibilidades.\n\nPosition — a ordem de ação. Ter posição (agir por último) é uma VANTAGEM enorme.\n\nPense: bluff é fingir que tem nada, value bet é mostrar que tem tudo, range é adivinhar o que o outro tem.",
    howToAnswer: "Identifique o termo pela definição. Bluff = enganar, Value Bet = cobrar, Range = conjunto de mãos possíveis.",
    visualType: 'terminology',
    tip: "Um bom jogador mistura bluff com value bet na proporção certa. Muito bluff = previsível. Pouco bluff = fácil de ler.",
  },

  // ── Unit 5: Checkpoint ──
  'm1-u5-l1': {
    explanation: "Chegou a hora do CHECKPOINT! Vamos misturar TUDO que você aprendeu: ranking de mãos, posições, pot odds e terminologia.\n\nIsso é como a prova final da matéria. Se você passar com 80% ou mais, o próximo módulo será desbloqueado!\n\nVai cair de tudo: comparar mãos, identificar posições, calcular pot odds, e saber os termos.\n\nVocê está pronto! Respira fundo e mostra o que sabe.",
    howToAnswer: "Leia cada pergunta com calma. Identifique qual skill está sendo testada e responda. Você já treinou tudo isso!",
    visualType: 'hand_ranking',
    tip: "Gerencie seu tempo. Se uma pergunta for difícil, chute e vai pra próxima. O importante é o resultado final!",
  },
}
