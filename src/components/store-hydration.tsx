'use client'

import { useGameStore } from '@/store/game-store'
import { useEffect } from 'react'

export function StoreHydration() {
  useEffect(() => {
    useGameStore.persist.rehydrate()
  }, [])

  return null
}
