import { addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
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
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error(`No document found in ${collectionName} with ID ${id}`);
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
      savedOffers: [],
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

  async saveOffer(offerId, userId) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }
    const savedOffers = userDoc.data().savedOffers || [];
    if (!savedOffers.includes(offerId)) {
      savedOffers.push(offerId);
      await setDoc(userDocRef, { savedOffers }, { merge: true });
    }
  },

  async unsaveOffer(offerId, userId) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }
    const savedOffers = userDoc.data().savedOffers || [];
    if (savedOffers.includes(offerId)) {
      savedOffers.splice(savedOffers.indexOf(offerId), 1);
      await setDoc(userDocRef, { savedOffers }, { merge: true });
    }
  },

  async getByUser(collectionName, userId) {
    const q = query(collection(db, collectionName), where("creator", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getByCategory(collectionName, category) {
    const q = query(collection(db, collectionName), where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getSavedOffers(userId) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }
    const savedOffers = userDoc.data().savedOffers || [];
    const offers = await Promise.all(savedOffers.map(offerId => this.getById("offers", offerId)));
    return offers;
  },

  async deleteSavedOffer(offerId, userId) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User data not found in Firestore.");
    }
    const savedOffers = userDoc.data().savedOffers || [];
    if (savedOffers.includes(offerId)) {
      savedOffers.splice(savedOffers.indexOf(offerId), 1);
      await setDoc(userDocRef, { savedOffers }, { merge: true });
    }
  },

  async delete(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },
  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
  },

  async deleteUser(userId) {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
  },

  async updateUser(userId, data) {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, data, { merge: true });
  },
};

