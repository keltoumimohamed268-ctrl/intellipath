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
    <div style={{ padding: 20 }}>
      <h1>Chapitres</h1>

      {chapters.map((chapter) => (
        <div key={chapter.id} style={{ marginBottom: 12 }}>
          <Link href={`/chapters/${chapter.id}`}>{chapter.title}</Link>
        </div>
      ))}
    </div>
  )
}