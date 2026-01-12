// src/lib/firebase-server.ts
// Server-side Firebase using REST API (Cloudflare Workers compatible)

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!FIREBASE_PROJECT_ID) {
  console.warn("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set");
}

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// Helper to convert Firestore REST format to plain object
function parseFirestoreDocument(doc: any): Record<string, any> {
  const fields = doc.fields || {};
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(fields)) {
    result[key] = parseFirestoreValue(value as any);
  }

  // Extract document ID from name
  if (doc.name) {
    const parts = doc.name.split("/");
    result._id = parts[parts.length - 1];
  }

  return result;
}

function parseFirestoreValue(value: any): any {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return new Date(value.timestampValue).getTime();
  if (value.nullValue !== undefined) return null;
  if (value.arrayValue !== undefined) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  if (value.mapValue !== undefined) {
    return parseFirestoreDocument({ fields: value.mapValue.fields });
  }
  return null;
}

// Convert JS value to Firestore REST format
function toFirestoreValue(value: any): any {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (typeof value === "boolean") return { booleanValue: value };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === "object") {
    const fields: any = {};
    for (const [k, v] of Object.entries(value)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

// API Functions
export async function getCollection(
  collectionName: string,
  options?: {
    orderBy?: string;
    orderDirection?: "ASCENDING" | "DESCENDING";
    limit?: number;
  }
): Promise<any[]> {
  const url = new URL(`${FIRESTORE_BASE_URL}/${collectionName}`);

  if (options?.limit) {
    url.searchParams.set("pageSize", String(options.limit));
  }

  if (options?.orderBy) {
    url.searchParams.set("orderBy", `${options.orderBy} ${options.orderDirection || "DESCENDING"}`);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Firestore GET Error [${url.toString()}]:`, error);
    throw new Error(`Firestore error: ${response.status} - ${error} - URL: ${collectionName}`);
  }

  const data = await response.json();
  const documents = data.documents || [];

  return documents.map(parseFirestoreDocument);
}

export async function getDocument(
  collectionName: string,
  documentId: string
): Promise<any | null> {
  const url = `${FIRESTORE_BASE_URL}/${collectionName}/${documentId}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = await response.text();
    console.error("Firestore GET Document Error:", error);
    throw new Error(`Firestore error: ${response.status}`);
  }

  const doc = await response.json();
  return parseFirestoreDocument(doc);
}

export async function createDocument(
  collectionName: string,
  data: Record<string, any>
): Promise<string> {
  const url = `${FIRESTORE_BASE_URL}/${collectionName}`;

  const fields: any = {};
  for (const [key, value] of Object.entries(data)) {
    fields[key] = toFirestoreValue(value);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Firestore POST Error:", error);
    throw new Error(`Firestore error: ${response.status}`);
  }

  const doc = await response.json();
  const parts = doc.name.split("/");
  return parts[parts.length - 1]; // Return document ID
}

export async function updateDocument(
  collectionName: string,
  documentId: string,
  data: Record<string, any>
): Promise<void> {
  const url = `${FIRESTORE_BASE_URL}/${collectionName}/${documentId}`;

  const fields: any = {};
  for (const [key, value] of Object.entries(data)) {
    fields[key] = toFirestoreValue(value);
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Firestore PATCH Error:", error);
    throw new Error(`Firestore error: ${response.status}`);
  }
}

export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  const url = `${FIRESTORE_BASE_URL}/${collectionName}/${documentId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Firestore DELETE Error:", error);
    throw new Error(`Firestore error: ${response.status}`);
  }
}
