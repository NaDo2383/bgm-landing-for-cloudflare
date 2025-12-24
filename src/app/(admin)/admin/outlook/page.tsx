"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { FormEvent, useEffect, useState } from "react"

interface OutlookForm {
  title: string
  path: string
}

interface OutlookItem {
  title: string
  path: string
  id: string
  year: number
}

export default function OutlookPage() {
  const [form, setForm] = useState<OutlookForm>({
    title: "",
    path: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [outlooks, setOutlooks] = useState<OutlookItem[]>([])
  const router = useRouter()
  const date = new Date()

  const resetForm = (): void => {
    setForm({ title: "", path: "" })
    setEditingId(null)
  }

  const fetchOutlook = async (): Promise<void> => {
    const res = await axios.get<OutlookItem[]>("/api/outlook")
    setOutlooks(res.data)
  }

  const handleEdit = (item: OutlookItem): void => {
    setForm({ title: item.title, path: item.path })
    setEditingId(item.id)
  }

  const handleDelete = async (id: string): Promise<void> => {
    await axios.delete(`/api/outlook/${id}`)
    fetchOutlook()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const payload = {
      title: form.title,
      path: form.path,
      year: date.getFullYear(),
    }

    if (editingId) {
      await axios.put(`/api/outlook/${editingId}`, payload)
    } else {
      await axios.post("/api/outlook", payload)
    }

    resetForm()
    fetchOutlook()
  }

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin") === "true"
    if (!isLoggedIn) {
      router.push("/admin/login")
    } else {
      fetchOutlook()
    }
  }, [router])

  return (
    <div className='p-6 my-28 max-w-[1240px] mx-auto bg-[#1a1a1a] text-white'>
      <h1 className='text-2xl font-bold mb-4'>Outlook</h1>

      <form
        onSubmit={handleSubmit}
        className='mb-8 bg-[#1a1a1a] shadow p-4 rounded space-y-4'>
        <input
          type='text'
          placeholder='Title'
          className='bg-[#222] border border-gray-700 text-white px-4 py-2 w-full rounded'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type='text'
          placeholder='Path'
          className='bg-[#222] border border-gray-700 text-white px-4 py-2 w-full rounded'
          value={form.path}
          onChange={(e) => setForm({ ...form, path: e.target.value })}
        />

        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded'>
          {"Add Outlook"}
        </button>
      </form>

      <div className='  w-full'>
        {outlooks.map((item) => (
          <div
            key={item.id}
            className='bg-[#1a1a1a] p-4 flex justify-between items-center rounded shadow'>
            <div className='flex gap-2.5'>
              {item.year} - {item.title}:
              <Link href={item.path} target='_blank'>
                {item.path}
              </Link>
            </div>
            <div className='flex justify-between gap-6 mt-2'>
              <button
                onClick={() => handleEdit(item)}
                className='text-blue-400 text-sm hover:underline'>
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className='text-red-400 text-sm hover:underline'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
