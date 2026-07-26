import type { SkillTag, GeneratorFn } from '../types'
import { generate as generateHandRanking } from './handRanking'
import { generate as generatePosition } from './position'
import { generate as generatePotOdds } from './potOdds'
import { generate as generateTerminology } from './terminology'
import { generate as generateBluffRange } from './bluffRange'

export const generators: Record<SkillTag, GeneratorFn> = {
  hand_ranking: { generate: generateHandRanking },
  position: { generate: generatePosition },
  pot_odds: { generate: generatePotOdds },
  terminology: { generate: generateTerminology },
  bluff_range: { generate: generateBluffRange },
}
