// lib/auth.ts
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { app } from "@/lib/firebase"

const auth = getAuth(app)

export const login = async (email: string, password: string) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password)
  return userCred.user
}

export const logout = async () => {
  await signOut(auth)
}
