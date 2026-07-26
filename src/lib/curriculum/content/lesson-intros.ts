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

  // ── Module 3: Bluff & Range ──

  // Unit 1: Fundamentos do Bluff
  'm3-u1-l1': {
    explanation: "Bluff é apostar ou aumentar com uma mão fraca para fazer o oponente foldar uma mão melhor. É a arma mais poderosa do poker — sem bluff, o jogo vira mero sorteio de cartas.\n\nChave do bluff: seu oponente precisa ACREDITAR que você tem uma mão forte. A história que você conta (suas ações) precisa ser coerente. Se você representou força pré-flop e o flop vem com cartas altas, suas ações combinam com a história.\n\nBluff funciona melhor contra oponentes que sabem foldar. Nunca blefe contra quem paga tudo — eles não vão foldar, e seu bluff falha.",
    howToAnswer: "Identifique se a situação pede bluff: oponente que folda + história crível = bom bluff.",
    visualType: 'terminology',
    tip: "Bluff funciona contra jogadores que foldam. Contra 'payoff wizards', só value bet.",
  },
  'm3-u1-l2': {
    explanation: "Três condições ideais para bluff:\n\n1. POUCOS OPONENTES — Quanto mais gente na mão, maior a chance de alguém ter acertado. Bluff 1vs1 é muito mais eficaz.\n\n2. BOARD FAVORÁVEL — Boards que não acertam o range do oponente são ótimos para bluff. Ex: A-K-7 rainbow vs range de call do BB.\n\n3. HISTÓRIA CRÍVEL — Sua ação precisa combinar com a mão que você quer representar. Se você deu raise pré-flop e o flop tem Ás, pode representar Ás.\n\nFaltando qualquer uma dessas, o bluff perde muito valor.",
    howToAnswer: "Avalie: poucos oponentes? Board seco? História crível? Sim pra todas = bluff.",
    visualType: 'terminology',
    tip: "Bluff no flop é mais barato (aposta menor). Bluff no river é mais caro, mas faz foldar mãos mais fortes.",
  },
  'm3-u1-l3': {
    explanation: "Você não pode blefar sempre — precisa de equilíbrio. Se blefa demais, oponentes percebem e passam a te pagar. Se blefa de menos, perde valor.\n\nProporção clássica: 2 value bets para 1 bluff (2:1). Isso significa ~33% das suas apostas são bluff.\n\nEm boards secos, você pode aumentar a frequência de bluff. Em boards molhados, reduza.\n\nQuanto maior a aposta, menos vezes você precisa blefar — apostas grandes fazem foldar mais.",
    howToAnswer: "Calcule: bluffs / (bluffs + values) = frequência ideal. 1:2 = 33%, 1:1 = 50%, 1:3 = 25%.",
    visualType: 'terminology',
    tip: "No flop pode blefar mais (~40-50% das apostas). No river, reduza (~25-33%).",
  },
  'm3-u1-l4': {
    explanation: "Value bet = apostar com mão forte esperando ser pago por mãos piores. Bluff = apostar com mão fraca esperando fazer foldar mãos melhores.\n\nDiferença: no value bet, você QUER que paguem. No bluff, você QUER que foldem.\n\nMisturar os dois é essencial. Se só dá value bet quando tem mão forte, é fácil de ler. Se só blefa quando está fraco, também.\n\nO equilíbrio confunde o oponente: ele nunca sabe se sua aposta é valor ou bluff.",
    howToAnswer: "Value bet = quer ser pago (mão forte). Bluff = quer que foldem (mão fraca).",
    visualType: 'terminology',
    tip: "Se você nunca blefa, está perdendo valor. Se blefa demais, perde credibilidade. Equilíbrio é a chave.",
  },

  // Unit 2: C-Bet e Continuation
  'm3-u2-l1': {
    explanation: "C-Bet (Continuation Bet) é quando você deu raise pré-flop e aposta no flop. É chamada 'continuation' porque continua a história de que você tem mão forte.\n\nC-Bet é a aposta mais comum do poker. Funciona porque o oponente erra o flop ~70% das vezes. Se você foi o agressor pré-flop e aposta no flop, o oponente precisa ter acertado algo para pagar.\n\nC-Bet de 1/3 a 1/2 do pote é o padrão. Apostas menores funcionam bem em boards secos.",
    howToAnswer: "Você deu raise pré-flop e aposta no flop = C-Bet. Padrão: 1/3 a 1/2 do pote.",
    visualType: 'terminology',
    tip: "C-Bet de 1/3 do pote em board seco funciona tão bem quanto meia aposta, mas arrisca menos.",
  },
  'm3-u2-l2': {
    explanation: "Board Texture decide se C-Bet é boa ideia:\n\nBOARDS SECOS (ex: K-8-2 rainbow) — ótimos para C-Bet. Quase nenhum draw possível. O oponente só acertou se tiver K ou par médio. C-Bet baixo (1/3) faz foldar a maioria.\n\nBOARDS MOLHADOS (ex: 9-8-6 com dois naipes) — C-Bet arriscado. Muitos draws, oponente pode ter acertado. Prefira check ou C-Bet maior (2/3).\n\nBOARDS MÉDIOS (ex: J-T-3) — depende do oponente. Contra tight, C-Bet funciona. Contra loose, cuidado.",
    howToAnswer: "Board seco → C-Bet pequeno. Board molhado → check ou C-Bet grande. Board médio → depende do oponente.",
    visualType: 'terminology',
    tip: "Quanto mais draws possíveis no board, menos eficaz é o C-Bet. Ajuste o tamanho: seco=1/3, molhado=2/3+.",
  },
  'm3-u2-l3': {
    explanation: "Double Barrel = apostar no flop E no turn. Triple Barrel = apostar no flop, turn E river.\n\nCada barrel conta uma história mais forte. Um C-Bet no flop é comum. Um double barrel no turn diz: 'ainda estou forte'. Um triple barrel no river diz: 'tenho mão muito forte'.\n\nDouble barrel funciona quando o turn card é 'bom para o range do agressor' (carta alta, carta do naipe que você representa).\n\nTriple barrel é poderoso mas caro. Use quando tem pouca dúvida que o oponente vai foldar.",
    howToAnswer: "Flop = C-Bet. Turn = Double Barrel. River = Triple Barrel. Mais barrels = mais força representa.",
    visualType: 'terminology',
    tip: "Turn que completa draw que você pode ter (ex: terceira carta de um naipe) é excelente para double barrel bluff.",
  },
  'm3-u2-l4': {
    explanation: "Check-Raise: você passa (check), oponente aposta, e você aumenta (raise). Representa muita força — como se tivesse 'acordado' com uma mão forte.\n\nFloat: dar call no flok com intenção de roubar no turn. Você paga o C-Bet e, se o oponente passar no turn, você aposta e leva o pote.\n\nCheck-Raise é uma jogada poderosa mas cara (você coloca mais fichas). Use com moderação.\n\nFloat funciona melhor contra oponentes que fazem muito C-Bet mas desistem no turn se não acertaram.",
    howToAnswer: "Check-Raise = força (espera aposta e aumenta). Float = pagar no flop pra roubar no turn.",
    visualType: 'terminology',
    tip: "Check-Raise no flop funciona bem em boards molhados — você representa ter acertado o draw.",
  },

  // Unit 3: Leitura de Range
  'm3-u3-l1': {
    explanation: "Range é o conjunto de todas as mãos que um jogador pode ter em uma situação específica. Você nunca sabe a mão exata do oponente, mas pode estimar o range dele.\n\nExemplo: se alguém deu raise do UTG, o range dele é forte (AA, KK, QQ, AK, AQs). Se deu call no BTN, o range é mais amplo (pares baixos, suited connectors, Ax).\n\nPensar em range (em vez de 'qual mão ele tem?') é o que separa iniciantes de avançados. Você não precisa acertar a mão exata — precisa saber se seu range ganha do range dele.",
    howToAnswer: "Range = conjunto de mãos possíveis. Cada ação do oponente restringe o range dele.",
    visualType: 'terminology',
    tip: "Ação = informação. UTG raise = range forte. BTN call = range amplo. Cada ação narrows o range.",
  },
  'm3-u3-l2': {
    explanation: "A cada ação do oponente, o range dele se reduz (narrows).\n\nPré-flop: range inicial (todas as 1326 combos)\nApós call: range de mãos que pagam\nApós raise: range de mãos que aumentam\nApós C-Bet: range de mãos que apostam no flop\nApós call no flop: range de mãos que acertaram algo\n\nExemplo: UTG abre, você dá call no BTN. Flop A-7-2. UTG aposta. O range dele agora é: AQ+, AK, sets, talvez AA. Você pode foldar mãos médias porque o range dele é muito forte.\n\nNarrowing é o processo de eliminar mãos que o oponente NÃO pode ter com base nas ações.",
    howToAnswer: "Cada ação elimina mãos que não combinam com ela. Quanto mais ações, mais narrowed o range.",
    visualType: 'terminology',
    tip: "Tight players narrow rápido (poucas mãos passam). Loose players narrow devagar (muitas mãos possíveis).",
  },
  'm3-u3-l3': {
    explanation: "A diferença entre 'qual mão ele tem?' e 'qual o range dele?' é sutil mas fundamental.\n\nPensar em mão específica: 'Ele tem AK?' — se você acertar, joga bem. Se errar, joga mal.\n\nPensar em range: 'O range dele é AQ+, sets, e alguns bluffs. Meu par de KK ganha de AQ e perde pra sets. Contra o range todo, tenho ~55% de equidade.'\n\nCom ranges, você toma decisões lucrativas no longo prazo, mesmo errando a mão exata de vez em quando.",
    howToAnswer: "Range > mão específica. Pense em conjuntos, não em adivinhação.",
    visualType: 'terminology',
    tip: "Errar a mão exata não importa se sua decisão contra o range era correta. O lucro vem do longo prazo.",
  },
  'm3-u3-l4': {
    explanation: "Explorar = ajustar seu jogo contra oponentes específicos.\n\nOponente TIGHT (folda muito): blefe mais, value bet menos. Ele folda suas mãos médias, então bluff funciona.\n\nOponente LOOSE (paga muito): value bet mais, blefe menos. Ele paga com mãos fracas, então value bet lucra. Bluff contra ele é desperdício.\n\nOponente AGGRESSIVE (aposta muito): dê check-raise com mãos fortes, deixe ele apostar por você.\n\nOponente PASSIVE (check/call): aposte você mesmo, ele não vai apostar por você.",
    howToAnswer: "Identifique o tipo: tight/loose, aggressive/passive. Ajuste: bluff vs tight, value vs loose.",
    visualType: 'terminology',
    tip: "Contra tight: bluff mais. Contra loose: value mais. Contra agg: check-raise. Contra passive: aposta direta.",
  },

  // Unit 4: Checkpoint
  'm3-u4-l1': {
    explanation: "Checkpoint do Módulo 3 — Bluff & Range. Esta lição testa tudo: fundamentos do bluff, C-Bet, leitura de range.\n\nSe passar com 80% ou mais, você domina os conceitos de jogo psicológico.\n\nLembre-se: bluff é ferramenta, não regra. Use com inteligência.",
    howToAnswer: "Aplique tudo que aprendeu: frequência de bluff, C-Bet decisions e leitura de range.",
    visualType: 'terminology',
    tip: "Revise: 2:1 value:bluff, C-Bet em board seco, range narrow a cada ação.",
  },
}
