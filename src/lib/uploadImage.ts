import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

export async function uploadImage(file: File) {
  const fileRef = ref(storage, `news/${Date.now()}-${file.name}`)
  await uploadBytes(fileRef, file)
  return await getDownloadURL(fileRef)
}
