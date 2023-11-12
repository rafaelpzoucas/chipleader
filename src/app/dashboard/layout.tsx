import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function DashboardLayout({
  children,
  active,
  ranking,
  history,
}: {
  children: React.ReactNode
  active: React.ReactNode
  ranking: React.ReactNode
  history: React.ReactNode
}) {
  return (
    <main className="space-y-6 pb-10">
      {children}

      <div className="flex px-4">
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Novo jogo
        </Button>
      </div>

      <section className="px-4">{active}</section>

      <section className="px-4">{ranking}</section>

      <section className="space-y-3">
        <h1 className="ml-4 font-bold">Últimos jogos</h1>
        {history}
      </section>
    </main>
  )
}
