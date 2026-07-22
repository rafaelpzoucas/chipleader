import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function DashboardLayout({
  active,
  history,
}: {
  active: React.ReactNode
  history: React.ReactNode
}) {
  return (
    <main className="space-y-6 pb-10 py-4">
      <section className="px-4">{active}</section>
      <section>
        <h1 className="ml-4 mb-3 font-bold">Últimos jogos</h1>
        {history}
      </section>
      <div className="fixed bottom-6 right-6">
        <Link
          href="/learn"
          className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 shadow-lg hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium text-sm">Academy</span>
        </Link>
      </div>
    </main>
  )
}
