"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await login(email, password)
      sessionStorage.setItem("admin", "true")
      router.push("/admin/news")
    } catch (e) {
      console.error("submit error: ", e)
      setError("Invalid credentials")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0e0e0e] text-white px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-full max-w-md space-y-4'>
        <h2 className='text-xl font-semibold text-center'>🔐 Admin Login</h2>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-[#222] border border-gray-700 px-4 py-2 w-full rounded text-white'
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-[#222] border border-gray-700 px-4 py-2 w-full rounded text-white'
          required
        />
        {error && <p className='text-red-400 text-sm text-center'>{error}</p>}
        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'>
          Login
        </button>
      </form>
    </div>
  )
}
