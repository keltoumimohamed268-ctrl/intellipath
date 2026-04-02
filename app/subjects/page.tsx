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
    <main className="min-h-screen py-12">
      <div className="site-container">
        <div className="mb-10">
          <h1 className="section-title text-white">Matières</h1>
          <p className="section-subtitle">
            Choisissez une matière pour accéder aux chapitres et aux cours PDF.
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="glass-card p-6">
            <p className="text-zinc-300">Aucune matière disponible.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="glass-card card-hover p-6 block"
              >
                <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
                <h2 className="text-2xl font-semibold text-white">{subject.name}</h2>
                <p className="mt-3 text-sm text-zinc-400">
                  Ouvrir les chapitres
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}