export interface LessonIntro {
  explanation: string
  howToAnswer: string
  visualType?: 'hand_ranking' | 'position' | 'pot_odds' | 'terminology'
  tip?: string
}

export const lessonIntros: Record<string, LessonIntro> = {
  // ── Unit 1: Hand Ranking ──
  'm1-u1-l1': {
    explanation: "No pôquer, cada combinação de 5 cartas forma uma 'mão'. As mãos têm uma hierarquia: algumas são mais fortes que outras.\n\nA mão mais básica é 'carta alta' (High Card) — quando nenhuma combinação se forma, vence quem tem a carta de maior valor. Um 'par' (Pair) são duas cartas do mesmo valor, como dois 7. Um par vence qualquer carta alta.\n\nEsta lição ensina a comparar mãos e identificar a mais forte.",
    howToAnswer: "Analise as duas mãos na mesa. Compare qual forma a melhor combinação de 5 cartas. A mais forte vence.",
    visualType: 'hand_ranking',
    tip: "Hierarquia: High Card → Pair → Two Pair → Three of a Kind → Straight → Flush → Full House → Four of a Kind → Straight Flush → Royal Flush",
  },
  'm1-u1-l2': {
    explanation: "'Dois Pares' são duas cartas iguais + outras duas cartas iguais de valor diferente. Exemplo: dois 7 e dois 10. É mais forte que um par.\n\n'Trinca' (Three of a Kind) são três cartas iguais. Trinca ganha de dois pares — três iguais é mais raro e difícil de formar.",
    howToAnswer: "Compare as mãos: veja se alguma tem par, dois pares ou trinca. Quanto mais cartas iguais, mais forte.",
    visualType: 'hand_ranking',
    tip: "Dois pares altos (AA+KK) é forte. Com board de 3 cartas do mesmo naipe, alguém pode ter flush — cuidado.",
  },
  'm1-u1-l3': {
    explanation: "'Straight' (sequência) são 5 cartas em sequência numérica independente do naipe (ex: 5-6-7-8-9). Vence qualquer par ou trinca.\n\n'Flush' são 5 cartas do mesmo naipe independente da ordem (ex: cinco cartas de copas). Vence straight.\n\nEntre straight e flush, o flush ganha — é mais difícil fazer 5 cartas do mesmo naipe.",
    howToAnswer: "Veja se alguma mão tem 5 cartas em sequência (straight) ou 5 do mesmo naipe (flush).",
    visualType: 'hand_ranking',
    tip: "Straight com AKQJT é o straight mais forte. Flush com Ás é o flush mais forte.",
  },
  'm1-u1-l4': {
    explanation: "'Full House' são três cartas iguais + um par. Ex: três 7 + dois 9. Muito forte, vence flush e straight.\n\n'Four of a Kind' (Quadra) são quatro cartas iguais — extremamente raro.\n\n'Straight Flush' são 5 cartas em sequência do mesmo naipe. Segunda mão mais forte do poker.\n\n'Royal Flush' é A-K-Q-J-T do mesmo naipe. A mão imbatível, quase nunca aparece.",
    howToAnswer: "Full House > Flush/Straight. Quadra > Full House. Straight Flush > tudo.",
    visualType: 'hand_ranking',
    tip: "Full House KKK+AA é mais forte que 777+99. Compare a trinca primeiro, depois o par.",
  },

  // ── Unit 2: Positions ──
  'm1-u2-l1': {
    explanation: "Em uma mesa 6-max, cada assento tem um nome que define a ordem de ação:\n\nUTG (Under the Gun) — primeiro a falar, sem informação\nHJ (Hijack) — segunda posição\nCO (Cut-Off) — uma antes do botão\nBTN (Button/Dealer) — melhor posição, age por último\nSB (Small Blind) — aposta pequena obrigatória\nBB (Big Blind) — aposta grande obrigatória\n\nAgir por último é vantajoso: você vê as ações de todos antes de decidir.",
    howToAnswer: "Identifique qual posição corresponde ao assento mostrado. A ordem é UTG → HJ → CO → BTN → SB → BB.",
    visualType: 'position',
    tip: "Ordem horária: UTG → HJ → CO → BTN → SB → BB. No pré-flop, UTG age primeiro, BB age por último.",
  },
  'm1-u2-l2': {
    explanation: "A ordem de ação muda entre pré-flop e pós-flop.\n\nPré-flop: UTG age primeiro, depois HJ, CO, BTN, SB, e BB por último.\n\nPós-flop: SB age primeiro, depois BB, UTG, HJ, CO, e BTN por último.\n\nO BTN age por último em todas as rodadas pós-flop — a maior vantagem do poker.",
    howToAnswer: "Siga a ordem: UTG→HJ→CO→BTN→SB→BB (pré-flop) ou SB→BB→UTG→HJ→CO→BTN (pós-flop).",
    visualType: 'position',
    tip: "BTN age por último sempre depois do flop. É a posição mais lucrativa.",
  },
  'm1-u2-l3': {
    explanation: "Quem age por último vê todos agirem antes. Se ninguém apostou, você pode apostar. Se alguém apostou forte, pode desistir sem perder mais fichas.\n\nO UTG age primeiro, sem saber o que vem depois — precisa de mãos mais fortes para entrar.\n\nO BTN age por último, com informação máxima — pode jogar mais mãos.\n\nPosição é informação, e informação é dinheiro no poker.",
    howToAnswer: "BTN é a melhor posição (age por último). UTG é a pior (age primeiro).",
    visualType: 'position',
    tip: "Jogue mais mãos no BTN/CO (posições tardias) e menos no UTG/HJ (posições iniciais).",
  },
  'm1-u2-l4': {
    explanation: "Cada posição sugere uma estratégia:\n\nUTG — seja seletivo: só AA, KK, QQ, AK\nHJ/CO — amplie um pouco: AJ, KQ, pares médios\nBTN — pode jogar muitas mãos: melhor posição\nSB — cautela: age quase primeiro no pós-flop\nBB — pode defender com mãos fracas: já pagou o blind\n\nO range de mãos aumenta conforme a posição melhora.",
    howToAnswer: "Posições iniciais (UTG/HJ) pedem mãos fortes. Posições tardias (CO/BTN) permitem mais variação.",
    visualType: 'position',
    tip: "Expanda seu range de UTG até BTN. Contraia de BTN até SB.",
  },

  // ── Unit 3: Terminology (renumbered) ──
  'm1-u3-l1': {
    explanation: "Ações básicas do poker:\n\nFold — desistir da mão. Perde o que já apostou, não perde mais.\nCall — pagar o valor da aposta para continuar.\nRaise — aumentar o valor da aposta.\nCheck — passar a vez (só quando não há aposta a pagar).\n\nEstas quatro ações são a base de todas as decisões no poker.",
    howToAnswer: "Leia o termo e escolha a definição correta. Fold = desistir, Call = pagar, Raise = aumentar, Check = passar.",
    visualType: 'terminology',
    tip: "Fold, Call, Raise, Check — domine esses 4 e você entende 90% das ações no poker.",
  },
  'm1-u3-l2': {
    explanation: "Termos avançados de apostas:\n\nC-Bet (Continuation Bet) — aposta no flop de quem deu raise pré-flop.\n3-Bet — terceiro aumento: alguém abre (1ª), alguém dá raise (2ª), você aumenta de novo (3ª).\nBlind — apostas obrigatórias (Small Blind e Big Blind) antes de ver as cartas.\nShowdown — revelação das cartas dos jogadores restantes para definir o vencedor.",
    howToAnswer: "C-bet e 3-bet são os mais importantes. C-bet = continuar a aposta. 3-bet = re-raise.",
    visualType: 'terminology',
    tip: "C-bet é eficaz quando você foi o agressor pré-flop. 3-bet indica força — use com AA, KK, AK.",
  },
  'm1-u3-l3': {
    explanation: "Termos de probabilidade:\n\nOuts — cartas no baralho que melhoram sua mão. Ex: 4 cartas de copas = 9 outs.\n\nEquity — chance percentual de vencer a mão.\n\nPot Odds — relação entre valor do call e tamanho do pote.\n\nImplied Odds — ganhos futuros esperados se acertar o draw.",
    howToAnswer: "Outs = cartas que ajudam. Equity = chance de vencer. Pot Odds = valor do call vs pote.",
    visualType: 'terminology',
    tip: "Regra do 4 e 2: no flop, outs × 4 = equity. No turn, outs × 2 = equity.",
  },
  'm1-u3-l4': {
    explanation: "Estratégia:\n\nBluff — apostar com mão fraca para fazer o oponente foldar uma mão melhor.\nValue Bet — apostar com mão forte para ser pago por mãos piores.\nRange — conjunto de mãos possíveis que o oponente pode ter.\nPosition — ordem de ação. Agir por último é vantagem por ter mais informação.",
    howToAnswer: "Bluff = enganar. Value Bet = cobrar com mão forte. Range = conjunto de mãos possíveis.",
    visualType: 'terminology',
    tip: "Misture bluff e value bet. Só bluff = previsível. Só value = fácil de ler.",
  },

  // ── Unit 4: Checkpoint (renumbered) ──
  'm1-u4-l1': {
    explanation: "Checkpoint do Módulo 1. Esta lição testa tudo que você aprendeu: ranking de mãos, posições e terminologia.\n\nSe passar com 80% ou mais, desbloqueia o Módulo 2 — Pot Odds.\n\nLeia cada pergunta com calma.",
    howToAnswer: "Identifique qual skill cada pergunta testa e responda. Você já praticou tudo.",
    visualType: 'hand_ranking',
    tip: "Se uma pergunta for difícil, responda e siga em frente. O que importa é o resultado final.",
  },

  // ── Module 2: Pot Odds ──
  'm2-u1-l1': {
    explanation: "Pot odds serve pra decidir uma coisa: CALL ou FOLD?\n\nPense numa aposta de R$ 10 num pote de R$ 20. Se você pagar R$ 10, o pote vai pra R$ 40. Você está pagando R$ 10 pra concorrer a R$ 40. Isso é tipo comprar um bilhete de rifa: se o bilhete custa R$ 10 e o prêmio é R$ 40, você precisa ganhar 1 a cada 4 tentativas pra não perder dinheiro. 1 em 4 = 25%.\n\nSe você acha que tem MAIS de 25% de chance de ganhar → vale pagar.\nSe tem MENOS → melhor não pagar.\n\nÉ só isso: pot odds = o % mínimo de chance que você precisa ter pra pagar sem prejuízo.",
    howToAnswer: "Calcule pot odds = call ÷ (pote + call + call). Esse número é sua 'meta': se sua chance de vencer for maior, paga.",
    visualType: 'pot_odds',
    tip: "Pot odds = o custo pra continuar. Chance de vencer maior que o custo? Call.",
  },
  'm2-u1-l2': {
    explanation: "Você não precisa calcular pot odds na mão toda vez. Só reconhecer 4 padrões:\n\nAPOSTA DE 1/3 DO POTE (ex: pote 30, aposta 10) → pot odds ≈ 20%\n→ Você precisa de pelo menos 20% de chance pra pagar.\n\nAPOSTA DE METADE (ex: pote 20, aposta 10) → pot odds ≈ 25%\n→ Precisa de 25% de chance.\n\nAPOSTA DE 2/3 (ex: pote 30, aposta 20) → pot odds ≈ 30%\n→ Precisa de 30% de chance.\n\nAPOSTA DO POTE TODO (ex: pote 20, aposta 20) → pot odds ≈ 33%\n→ Precisa de 33% de chance.\n\nNa mesa você só pensa: 'apostou metade = preciso de 25% pra pagar'.",
    howToAnswer: "Veja a aposta como fração do pote. Cada fração tem um % mínimo de chance que você precisa ter pra pagar.",
    visualType: 'pot_odds',
    tip: "Decore: 1/3→precisa de 20%, 1/2→25%, 2/3→~30%, pote cheio→33%. Esse é o 'preço' pra continuar.",
  },
  'm2-u1-l3': {
    explanation: "Agora o outro lado da balança: sua chance real de vencer (equidade).\n\nEquidade > pot odds → CALL (pagou barato pelo que vale)\nEquidade < pot odds → FOLD (pagou caro demais)\n\nExemplo: pote 30, aposta 10. Pot odds = 20% (preço pra continuar). Você tem um flush draw (~36% de chance de vencer). 36% > 20% → CALL. Você tá pagando 20% do pote pra ter 36% de chance. Bom negócio!\n\nOutro exemplo: mesmo pote 30, aposta 20 (2/3). Pot odds = 30%. Seu flush draw tem 36%. 36% > 30% → ainda vale call, mas já tá mais caro.\n\nViu? Pot odds é o PREÇO. Equidade é o VALOR. Só compra se o valor for maior que o preço.",
    howToAnswer: "Compare: equidade (sua chance) > pot odds (preço) → Call. Equidade < pot odds → Fold.",
    visualType: 'pot_odds',
    tip: "Flush draw ~36% de equidade. Metade do pote (25%)? Call barato. Pote cheio (33%)? Ainda paga, mas apertado.",
  },
  'm2-u1-l4': {
    explanation: "Pronto. Você tem tudo pra decidir na mesa. O passo a passo:\n\n1. QUANTO CUSTA? Olhe aposta ÷ pote. Reconheça a fração: 1/3, 1/2, 2/3 ou cheio?\n2. PREÇO MÍNIMO: Lembre o pot odds: 20%, 25%, 30% ou 33%\n3. SUA CHANCE: Estime sua equidade (ex: flush draw = ~36%)\n4. DECIDE: Se chance > preço → CALL. Se chance < preço → FOLD.\n\nNa mesa é rápido: 'apostou metade = 25%, tenho flush draw = 36%, 36 > 25, call fácil.'",
    howToAnswer: "1) fração → 2) pot odds = preço mínimo → 3) sua chance é maior? → Call / Fold.",
    visualType: 'pot_odds',
    tip: "Decore: metade = 25%, flush draw = 36%. Esses dois números já resolvem 80% das decisões de pot odds.",
  },
}
