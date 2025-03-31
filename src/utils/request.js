import { addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


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
};
