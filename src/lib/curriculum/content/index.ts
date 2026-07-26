import type { Module, Unit, Lesson } from '../types'
import { module1, module1Units, module1Lessons } from './module-1-fundamentos'

export const allModules: Module[] = [
  module1,
]

export const allUnits: Unit[] = [
  ...module1Units,
]

export const allLessons: Lesson[] = [
  ...module1Lessons,
]

const moduleMap: Record<string, Module> = {}
for (const m of allModules) moduleMap[m.id] = m

const unitMap: Record<string, Unit> = {}
for (const u of allUnits) unitMap[u.id] = u

const lessonMap: Record<string, Lesson> = {}
for (const l of allLessons) lessonMap[l.id] = l

export function getModule(id: string): Module | undefined {
  return moduleMap[id]
}

export function getUnit(id: string): Unit | undefined {
  return unitMap[id]
}

export function getLesson(id: string): Lesson | undefined {
  return lessonMap[id]
}

export function getUnitsByModule(moduleId: string): Unit[] {
  return allUnits.filter(u => u.moduleId === moduleId).sort((a, b) => a.order - b.order)
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return allLessons.filter(l => l.unitId === unitId).sort((a, b) => a.order - b.order)
}

export { moduleMap, unitMap, lessonMap }
