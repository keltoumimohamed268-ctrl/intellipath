'use client'

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
    return <div style={{ padding: 20 }}>Chargement...</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{chapter.title}</h1>

      {chapter.pdf_url ? (
        <div style={{ marginTop: 20 }}>
          <a href={chapter.pdf_url} target="_blank" rel="noopener noreferrer">
            Ouvrir le PDF dans un nouvel onglet
          </a>

          <iframe
            src={chapter.pdf_url}
            width="100%"
            height="700px"
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginTop: '12px',
            }}
          />
        </div>
      ) : (
        <p>Aucun PDF disponible pour ce chapitre.</p>
      )}
    </div>
  )
}