import { addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useErrorHandler } from '../hooks/useErrorHandler';

export const request = {
  async getAll(collectionName, signal) {
    const { handleError } = useErrorHandler();
    try {
      const snapshot = await getDocs(collection(db, collectionName), { signal });
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, 'Failed to fetch all documents.');
      }
    }
  },

  async create(collectionName, data) {
    const { handleError } = useErrorHandler();
    try {
      return await addDoc(collection(db, collectionName), data);
    } catch (error) {
      handleError(error, 'Failed to create a new document.');
    }
  },

  async getLatest(collectionName, count = 10) {
    const { handleError } = useErrorHandler();
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, 'Failed to fetch latest documents.');
    }
  },

  async getById(collectionName, id, signal) {
    const { handleError } = useErrorHandler();
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef, { signal });
      if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          throw new Error(`No document found in ${collectionName} with ID ${id}`);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, `Failed to fetch document with ID ${id}.`);
      }
    }
  },

  async registerUser(email, password, additionalData) {
    const { handleError } = useErrorHandler();
    try {
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
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please log in or use a different email.');
      }
      handleError(error, 'Failed to register user.');
      throw error; // Ensure the error propagates to the caller
    }
  },

  async loginUser(email, password) {
    const { handleError } = useErrorHandler();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        handleError(new Error("User data not found in Firestore."), 'Failed to log in user.');
        throw new Error("User data not found in Firestore.");
      }
      return { id: user.uid, email: user.email, ...userDoc.data() }; // Return full user data
    } catch (error) {
      handleError(error, 'Failed to log in user.');
      throw error; // Ensure the error propagates to the caller
    }
  },

  async logoutUser() {
    const { handleError } = useErrorHandler();
    try {
      await auth.signOut();
    } catch (error) {
      handleError(error, 'Failed to log out user.');
    }
  },

  async saveOffer(offerId, userId) {
    const { handleError } = useErrorHandler();
    try {
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
    } catch (error) {
      handleError(error, 'Failed to save offer.');
    }
  },

  async unsaveOffer(offerId, userId) {
    const { handleError } = useErrorHandler();
    try {
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
    } catch (error) {
      handleError(error, 'Failed to unsave offer.');
    }
  },

  async getByUser(collectionName, userId) {
    const { handleError } = useErrorHandler();
    try {
      const q = query(collection(db, collectionName), where("creator", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleError(error, 'Failed to fetch documents by user.');
    }
  },

  async getByCategory(collectionName, category, signal) {
    const { handleError } = useErrorHandler();
    try {
      const q = query(collection(db, collectionName), where("category", "==", category));
      const snapshot = await getDocs(q, { signal });
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, 'Failed to fetch documents by category.');
      }
    }
  },

  async getSavedOffers(userId, signal) {
    const { handleError } = useErrorHandler();
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef, { signal });
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
      const savedOffers = userDoc.data().savedOffers || [];
      const offers = await Promise.all(savedOffers.map(offerId => this.getById("offers", offerId, signal)));
      return offers;
    } catch (error) {
      if (error.name !== 'AbortError') {
        handleError(error, 'Failed to fetch saved offers.');
      }
    }
  },

  async deleteSavedOffer(offerId, userId) {
    const { handleError } = useErrorHandler();
    try {
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
    } catch (error) {
      handleError(error, 'Failed to delete saved offer.');
    }
  },

  async delete(collectionName, id) {
    const { handleError } = useErrorHandler();
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleError(error, `Failed to delete document with ID ${id}.`);
    }
  },

  async update(collectionName, id, data) {
    const { handleError } = useErrorHandler();
    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      handleError(error, `Failed to update document with ID ${id}.`);
    }
  },

  async deleteUser(userId) {
    const { handleError } = useErrorHandler();
    try {
      // Delete all offers created by the user
      const userOffersQuery = query(collection(db, "offers"), where("creator", "==", userId));
      const userOffersSnapshot = await getDocs(userOffersQuery);
      const batch = writeBatch(db);

      // Collect all offer IDs created by the user
      const offerIds = [];
      userOffersSnapshot.forEach(doc => {
        offerIds.push(doc.id);
        batch.delete(doc.ref);
      });

      // Remove the user's offers from other users' savedOffers
      if (offerIds.length > 0) {
        const usersQuery = query(collection(db, "users"), where("savedOffers", "array-contains-any", offerIds));
        const usersSnapshot = await getDocs(usersQuery);
        usersSnapshot.forEach(userDoc => {
          const userData = userDoc.data();
          const updatedSavedOffers = userData.savedOffers.filter(offerId => !offerIds.includes(offerId));
          batch.set(userDoc.ref, { savedOffers: updatedSavedOffers }, { merge: true });
        });
      }

      // Commit the batch operation
      await batch.commit();

      // Delete the user document
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);

      // Return a confirmation
      return { success: true, message: `User with ID ${userId} and their offers have been deleted.` };
    } catch (error) {
      handleError(error, `Failed to delete user with ID ${userId}.`);
    }
  },

  async updateUser(userId, data) {
    const { handleError } = useErrorHandler();
    try {
      if (!data || typeof data !== "object") {
          throw new Error("Invalid data provided for updating user. Data must be a non-null object.");
      }
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, data, { merge: true });
    } catch (error) {
      handleError(error, `Failed to update user with ID ${userId}.`);
    }
  },

  async getUserById(userId) {
    const { handleError } = useErrorHandler();
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      handleError(error, `Failed to fetch user with ID ${userId}.`);
    }
  },
};

