"use client"

import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import NewsCard from "@/components/ui/NewsCard"
import { Loader2, Upload, X, AlertCircle, Image } from "lucide-react"

const TiptapEditor = dynamic(() => import("@/components/editor/TiptapEditor"), {
  ssr: false,
})

interface NewsItem {
  id: string
  title: string
  description: string
  imageUrl?: string
}

interface NewsForm {
  title: string
  description: string
  heroImage: File | null
}

interface ToastMessage {
  type: "success" | "error" | "info"
  message: string
}

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [form, setForm] = useState<NewsForm>({
    title: "",
    description: "",
    heroImage: null,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false)

  const heroImageInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<any>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin") === "true"
    if (!isLoggedIn) {
      router.push("/admin/login")
    } else {
      fetchNews()
    }
  }, [router])

  const showToast = (type: ToastMessage["type"], message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 5000)
  }

  const fetchNews = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const res = await axios.get<{ items: NewsItem[] }>("/api/news")
      setNews(res.data.items)
    } catch (error) {
      showToast("error", "Failed to fetch news items. Please try again.")
      console.error("Error fetching news:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes

    if (file.size > maxSize) {
      throw new Error("Image size must be 5MB or smaller.")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "bgm_intro_web_news")
    formData.append("folder", "bgm")

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dksxwp1ci/image/upload",
      formData
    )
    return res.data.secure_url
  }

  // Handler for content images (drag/drop in editor)
  const handleContentImageUpload = async (file: File): Promise<string> => {
    setIsUploadingContentImage(true)
    try {
      const imageUrl = await uploadToCloudinary(file)
      showToast("success", "Content image uploaded successfully!")
      return imageUrl
    } catch (error: any) {
      const errorMessage = error.message || "Failed to upload content image"
      showToast("error", errorMessage)
      throw error
    } finally {
      setIsUploadingContentImage(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      showToast("error", "Title and description are required.")
      return
    }

    if (isUploadingContentImage) {
      showToast("error", "Please wait for content images to finish uploading.")
      return
    }

    setIsSubmitting(true)

    try {
      let heroImageUrl = ""

      // Upload hero image if provided
      if (form.heroImage) {
        heroImageUrl = await uploadToCloudinary(form.heroImage)
      }

      const payload = {
        title: form.title,
        description: form.description,
        ...(heroImageUrl && { imageUrl: heroImageUrl }),
      }

      if (editingId) {
        await axios.put(`/api/news/${editingId}`, payload)
        showToast("success", "News item updated successfully!")
      } else {
        await axios.post("/api/news", payload)
        showToast("success", "News item created successfully!")
      }

      resetForm()
      fetchNews()
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred"
      showToast("error", errorMessage)
      console.error("Error submitting news:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = (): void => {
    setForm({ title: "", description: "", heroImage: null })
    setEditingId(null)
    setHeroImagePreview(null)
    if (heroImageInputRef.current) heroImageInputRef.current.value = ""
  }

  const handleEdit = (item: NewsItem): void => {
    setForm({ title: item.title, description: item.description, heroImage: null })
    setEditingId(item.id)
    setHeroImagePreview(item.imageUrl || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string): Promise<void> => {
    setIsSubmitting(true)
    try {
      await axios.delete(`/api/news/${id}`)
      showToast("success", "News item deleted successfully!")
      setDeleteConfirm(null)
      fetchNews()
    } catch (error) {
      showToast("error", "Failed to delete news item. Please try again.")
      console.error("Error deleting news:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHeroImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null
    setForm({ ...form, heroImage: file })

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setHeroImagePreview(null)
    }
  }

  const removeHeroImage = (): void => {
    setForm({ ...form, heroImage: null })
    setHeroImagePreview(null)
    if (heroImageInputRef.current) heroImageInputRef.current.value = ""
  }

  return (
    <div className='p-6 my-28 max-w-[1240px] mx-auto bg-[#1a1a1a] text-white min-h-screen'>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}>
          <AlertCircle className='w-5 h-5' />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Content Image Upload Progress */}
      {isUploadingContentImage && (
        <div className='fixed top-20 right-6 z-50 px-6 py-4 bg-blue-600 rounded-lg shadow-lg flex items-center gap-3'>
          <Loader2 className='w-5 h-5 animate-spin' />
          <span>Uploading content image...</span>
        </div>
      )}

      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>📰 News Management</h1>
        <p className='text-gray-400 text-sm'>
          Create and manage news articles with hero images and rich content
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className='mb-12 bg-[#222] shadow-xl p-6 rounded-lg space-y-6 border border-gray-800'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>
            {editingId ? "Edit News Item" : "Create New News Item"}
          </h2>
          {editingId && (
            <button
              type='button'
              onClick={resetForm}
              className='text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2'>
              <X className='w-4 h-4' />
              Cancel Editing
            </button>
          )}
        </div>

        {/* Title Field */}
        <div>
          <label className='block text-sm font-medium mb-2 text-gray-300'>
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='Enter news title...'
            className='bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Hero Image Upload */}
        <div>
          <label className='block text-sm font-medium mb-2 text-gray-300'>
            <Image className='w-4 h-4 inline mr-2' />
            Hero Image (optional, max 5MB)
          </label>
          <p className='text-xs text-gray-500 mb-3'>
            This image will be displayed as the main cover/thumbnail for the news article
          </p>

          {heroImagePreview ? (
            <div className='relative inline-block'>
              <img
                src={heroImagePreview}
                alt='Hero Preview'
                className='w-full max-w-md h-64 object-cover rounded-lg border border-gray-700'
              />
              <button
                type='button'
                onClick={removeHeroImage}
                disabled={isSubmitting}
                className='absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors disabled:opacity-50'>
                <X className='w-4 h-4' />
              </button>
            </div>
          ) : (
            <label className='flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition-colors bg-[#1a1a1a]'>
              <div className='flex flex-col items-center'>
                <Upload className='w-10 h-10 text-gray-500 mb-2' />
                <span className='text-sm text-gray-400'>Click to upload hero image</span>
                <span className='text-xs text-gray-500 mt-1'>PNG, JPG up to 5MB</span>
              </div>
              <input
                type='file'
                accept='image/*'
                ref={heroImageInputRef}
                onChange={handleHeroImageChange}
                className='hidden'
                disabled={isSubmitting}
              />
            </label>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className='block text-sm font-medium mb-2 text-gray-300'>
            Content <span className='text-red-500'>*</span>
          </label>
          <div className='bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 mb-3'>
            <p className='text-xs text-blue-300 flex items-start gap-2'>
              <AlertCircle className='w-4 h-4 mt-0.5 flex-shrink-0' />
              <span>
                <strong>Pro Tip:</strong> You can drag and drop images directly into the
                editor or paste them from your clipboard. These images will be embedded
                within your news content.
              </span>
            </p>
          </div>
          <div className='rounded-lg overflow-hidden border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500'>
            <TiptapEditor
              ref={editorRef}
              content={form.description}
              onChange={(html) => setForm({ ...form, description: html })}
              onImageUpload={handleContentImageUpload}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className='flex gap-4 pt-4 border-t border-gray-800'>
          <button
            type='submit'
            disabled={isSubmitting || isUploadingContentImage}
            className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2'>
            {isSubmitting && <Loader2 className='w-4 h-4 animate-spin' />}
            {editingId ? "Update News" : "Publish News"}
          </button>

          {editingId && (
            <button
              type='button'
              onClick={resetForm}
              disabled={isSubmitting}
              className='border border-gray-600 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
              Cancel
            </button>
          )}
        </div>

        {isUploadingContentImage && (
          <div className='bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-3'>
            <p className='text-sm text-yellow-300 flex items-center gap-2'>
              <Loader2 className='w-4 h-4 animate-spin' />
              Uploading content image... Please wait before submitting.
            </p>
          </div>
        )}
      </form>

      {/* News List Section */}
      <div>
        <h2 className='text-2xl font-bold mb-6 flex items-center justify-between'>
          <span>Published News</span>
          <span className='text-sm font-normal text-gray-400'>
            {news.length} {news.length === 1 ? "item" : "items"}
          </span>
        </h2>

        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
            <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
          </div>
        ) : news.length === 0 ? (
          <div className='text-center py-20 bg-[#222] rounded-lg border border-gray-800'>
            <p className='text-gray-400 text-lg'>No news items yet</p>
            <p className='text-gray-500 text-sm mt-2'>
              Create your first news item above
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {news.map((item, index) => (
              <div key={item.id}>
                <div className='bg-[#222] p-4 rounded-lg shadow-lg border border-gray-800 hover:border-gray-700 transition-all'>
                  <NewsCard
                    key={"newscardinadmin" + index}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    id={item.id}
                  />
                  <div className='flex gap-3 mt-4 pt-4 border-t border-gray-800'>
                    <button
                      onClick={() => handleEdit(item)}
                      disabled={isSubmitting}
                      className='flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 rounded-lg font-medium transition-colors disabled:opacity-50'>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      disabled={isSubmitting}
                      className='flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 rounded-lg font-medium transition-colors disabled:opacity-50'>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-[#222] rounded-lg p-6 max-w-md w-full border border-gray-800 shadow-2xl'>
            <h3 className='text-xl font-bold mb-3'>Confirm Delete</h3>
            <p className='text-gray-400 mb-6'>
              Are you sure you want to delete this news item? This action cannot be
              undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isSubmitting}
                className='flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2'>
                {isSubmitting && <Loader2 className='w-4 h-4 animate-spin' />}
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={isSubmitting}
                className='flex-1 border border-gray-600 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
