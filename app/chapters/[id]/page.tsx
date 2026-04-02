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
            <p className="mb-2 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-300">
              Lecture du chapitre
            </p>
            <h1 className="section-title">{chapter.title}</h1>
            <p className="section-subtitle">
              Consultez le cours directement sur la plateforme ou ouvrez-le dans un nouvel onglet.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/subjects" className="dark-button">
              Retour aux matières
            </Link>

            {chapter.pdf_url && (
              <a
                href={chapter.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="orange-button"
              >
                Ouvrir le PDF
              </a>
            )}
          </div>
        </div>

        <div className="glass-card p-4 md:p-6">
          {chapter.pdf_url ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src={chapter.pdf_url}
                width="100%"
                height="820px"
                style={{ border: 'none', background: '#000' }}
                title={chapter.title}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-zinc-300">Aucun PDF disponible pour ce chapitre.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}