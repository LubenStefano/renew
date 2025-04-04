import { addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

export const request = {
  async getAll(collectionName) {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(collectionName, data) {
    return await addDoc(collection(db, collectionName), data);
  },

  async getLatest(collectionName, count = 10) {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No such document!");
    }
  },

  async registerUser(email, password, additionalData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      id: user.uid,
      createdAt: new Date().toISOString(), 
      email,
      ...additionalData
    });
    return user;
  },

  async loginUser(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }
    return { id: user.uid, email: user.email, ...userDoc.data() }; // Return full user data
  },

  async logoutUser() {
    await auth.signOut();
  },
};
