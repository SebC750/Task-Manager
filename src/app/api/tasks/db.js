const { initializeApp, getApps, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

const serviceAccountKey = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_id: process.env.FIREBASE_CLIENT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL
}

if (getApps().length === 0) {
    if (process.env.NODE_ENV === 'production') {
        initializeApp()
    } else {
        initializeApp({
            credential: cert(serviceAccountKey)
        })
    }
}

const db = getFirestore()

export default db;