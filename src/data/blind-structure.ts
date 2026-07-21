export type BlindLevel = {
  level: number
  smallBlind: number
  bigBlind: number
  isBreak?: boolean
}

export function generateBlindLevels(count: number): BlindLevel[] {
  if (count <= DEFAULT_BLIND_STRUCTURE.length) {
    return DEFAULT_BLIND_STRUCTURE.slice(0, count).map((l) => ({
      ...l,
      isBreak: false,
    }))
  }
  const result = DEFAULT_BLIND_STRUCTURE.map((l) => ({ ...l, isBreak: false }))
  while (result.length < count) {
    const last = result[result.length - 1]
    result.push({
      level: result.length + 1,
      smallBlind: last.bigBlind,
      bigBlind: last.bigBlind * 2,
      isBreak: false,
    })
  }
  return result
}

export const DEFAULT_BLIND_STRUCTURE: BlindLevel[] = [
  { level: 1, smallBlind: 10, bigBlind: 20 },
  { level: 2, smallBlind: 25, bigBlind: 50 },
  { level: 3, smallBlind: 50, bigBlind: 100 },
  { level: 4, smallBlind: 75, bigBlind: 150 },
  { level: 5, smallBlind: 100, bigBlind: 200 },
  { level: 6, smallBlind: 150, bigBlind: 300 },
  { level: 7, smallBlind: 200, bigBlind: 400 },
  { level: 8, smallBlind: 250, bigBlind: 500 },
  { level: 9, smallBlind: 300, bigBlind: 600 },
  { level: 10, smallBlind: 400, bigBlind: 800 },
  { level: 11, smallBlind: 500, bigBlind: 1000 },
  { level: 12, smallBlind: 600, bigBlind: 1200 },
  { level: 13, smallBlind: 800, bigBlind: 1600 },
  { level: 14, smallBlind: 1000, bigBlind: 2000 },
  { level: 15, smallBlind: 1200, bigBlind: 2400 },
  { level: 16, smallBlind: 1500, bigBlind: 3000 },
  { level: 17, smallBlind: 2000, bigBlind: 4000 },
  { level: 18, smallBlind: 2500, bigBlind: 5000 },
  { level: 19, smallBlind: 3000, bigBlind: 6000 },
  { level: 20, smallBlind: 4000, bigBlind: 8000 },
]
