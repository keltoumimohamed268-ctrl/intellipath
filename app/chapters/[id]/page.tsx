'use client'

import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Chapter = {
  id: string
  title: string
  pdf_url: string
}

export default function ChapterDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [chapter, setChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    getChapter()
  }, [id])

  async function getChapter() {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    setChapter(data)
  }

  if (!chapter) {
    return (
      <main className="min-h-screen py-12">
        <div className="site-container">
          <div className="glass-card p-6 text-zinc-300">Chargement...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="site-container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title text-white">{chapter.title}</h1>
            <p className="section-subtitle">
              Consultez le cours directement sur la plateforme.
            </p>
          </div>

          <Link href="/subjects" className="dark-button">
            Retour
          </Link>
        </div>

        <div className="glass-card p-5 md:p-6">
          {chapter.pdf_url ? (
            <div>
              <a
                href={chapter.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="orange-button"
              >
                Ouvrir le PDF dans un nouvel onglet
              </a>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={chapter.pdf_url}
                  width="100%"
                  height="760px"
                  style={{ border: 'none', background: '#111' }}
                />
              </div>
            </div>
          ) : (
            <p className="text-zinc-300">Aucun PDF disponible pour ce chapitre.</p>
          )}
        </div>
      </div>
    </main>
  )
}