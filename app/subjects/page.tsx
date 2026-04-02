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
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Matières</h1>
          <p className="mt-2 text-gray-600">
            Choisissez une matière pour voir les chapitres disponibles.
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600">Aucune matière disponible.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {subject.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
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