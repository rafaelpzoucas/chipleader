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
    </main>
  )
}
