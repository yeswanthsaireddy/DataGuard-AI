
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Activity, Database, ShieldCheck } from 'lucide-react'
import { getHealth, type HealthResponse } from './services/api'

function App() {
  const [health, setHealth] =
    useState<HealthResponse | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getHealth()
      .then((data) => {
        if (active) setHealth(data)
      })
      .catch(() => {
        if (active) {
          setError('Unable to connect to the backend.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <ShieldCheck className="text-blue-600" size={32} />

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              DataGuard AI
            </h1>
            <p className="text-sm text-slate-500">
              Intelligent Data Quality Platform
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Welcome to DataGuard AI
        </h2>

        <p className="mt-2 text-slate-600">
          Your intelligent data quality monitoring workspace.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <DashboardCard
            title="Datasets"
            value="0"
            icon={<Database />}
          />

          <DashboardCard
            title="Analyses"
            value="0"
            icon={<Activity />}
          />

          <DashboardCard
            title="Quality Score"
            value="--"
            icon={<ShieldCheck />}
          />
        </div>

        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            Backend connection
          </h3>

          {loading && (
            <p className="mt-3 text-slate-500">
              Checking backend...
            </p>
          )}

          {error && (
            <p className="mt-3 text-red-600">{error}</p>
          )}

          {health && (
            <div className="mt-4 space-y-2">
              <p className="text-green-700">
                ● Backend connected successfully
              </p>

              <p className="text-sm text-slate-600">
                Application: {health.application}
              </p>

              <p className="text-sm text-slate-600">
                Environment: {health.environment}
              </p>

              <p className="text-sm text-slate-600">
                Status: {health.status}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  icon: ReactNode
}

function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <span className="text-blue-600">{icon}</span>
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}

export default App
