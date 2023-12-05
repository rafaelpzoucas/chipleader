export default function DashboardLayout({
  children,
  userHeader,
  active,
  ranking,
  history,
}: {
  children: React.ReactNode
  userHeader: React.ReactNode
  active: React.ReactNode
  ranking: React.ReactNode
  history: React.ReactNode
}) {
  return (
    <main className="space-y-6 pb-10">
      {/* {userHeader} */}

      <section className="px-4">{active}</section>

      <section className="px-4">{ranking}</section>

      <section>
        <h1 className="ml-4 mb-3 font-bold">Últimos jogos</h1>
        {history}
      </section>
    </main>
  )
}
