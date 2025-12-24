// src/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

export function getAdminDB(): Firestore {
  const currentApps = getApps();

  if (currentApps.length <= 0) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
    // Fixes the "invalid private key" or "project_id missing" error on Cloudflare
    const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Firebase Admin credentials missing from Environment Variables");
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return getFirestore();
}