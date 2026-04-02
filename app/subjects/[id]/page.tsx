'use client'

import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Chapter = {
  id: string
  title: string
  order: number
}

export default function SubjectChapters({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [chapters, setChapters] = useState<Chapter[]>([])

  useEffect(() => {
    getChapters()
  }, [id])

  async function getChapters() {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('subject_id', id)
      .order('order', { ascending: true })

    if (error) {
      console.error(error)
      return
    }

    setChapters(data || [])
  }

  return (
    <main className="min-h-screen py-12">
      <div className="site-container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title text-white">Chapitres</h1>
            <p className="section-subtitle">
              Sélectionnez un chapitre pour ouvrir son cours PDF.
            </p>
          </div>

          <Link href="/subjects" className="dark-button">
            Retour aux matières
          </Link>
        </div>

        {chapters.length === 0 ? (
          <div className="glass-card p-6">
            <p className="text-zinc-300">Aucun chapitre disponible.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.id}`}
                className="glass-card card-hover p-6 block"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-orange-400">Chapitre {chapter.order}</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      {chapter.title}
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