'use client'

import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Path = {
  id: string
  name: string
  order: number
}

export default function SubjectPaths({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [paths, setPaths] = useState<Path[]>([])

  useEffect(() => {
    getPaths()
  }, [id])

  async function getPaths() {
    const { data, error } = await supabase
      .from('paths')
      .select('*')
      .eq('subject_id', id)
      .order('order', { ascending: true })

    if (error) {
      console.error(error)
      return
    }

    setPaths(data || [])
  }

  return (
    <main className="min-h-screen py-12">
      <div className="site-container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title text-white">Parcours</h1>
            <p className="section-subtitle">
              Sélectionnez un parcours pour voir les chapitres disponibles.
            </p>
          </div>

          <Link href="/subjects" className="dark-button">
            Retour aux matières
          </Link>
        </div>

        {paths.length === 0 ? (
          <div className="glass-card p-6">
            <p className="text-zinc-300">Aucun parcours disponible.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {paths.map((path) => (
              <Link
                key={path.id}
                href={`/paths/${path.id}`}
                className="glass-card card-hover p-6 block"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-orange-400">Parcours {path.order}</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      {path.name}
                    </h2>
                  </div>

                  <span className="text-sm text-zinc-400">Ouvrir</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}