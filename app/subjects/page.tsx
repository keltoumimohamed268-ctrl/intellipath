'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Subject = {
  id: string
  name: string
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    getSubjects()
  }, [])

  async function getSubjects() {
    const { data, error } = await supabase.from('subjects').select('*')

    if (error) {
      console.error(error)
      return
    }

    setSubjects(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Subjects</h1>

      {subjects.map((subject) => (
        <div key={subject.id} style={{ marginBottom: 12 }}>
          <Link href={`/subjects/${subject.id}`}>{subject.name}</Link>
        </div>
      ))}
    </div>
  )
}