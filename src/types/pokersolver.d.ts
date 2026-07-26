declare module 'pokersolver' {
  export class Card {
    constructor(value: string, suit: string)
    value: string
    suit: string
    rank: number
    toString(): string
  }

  export class Hand {
    readonly cardPool: Card[]
    readonly name: string
    readonly descr: string
    readonly rank: number

    static solve(cards: string[]): Hand
    static winners(hands: Hand[]): Hand[]
  }
}
