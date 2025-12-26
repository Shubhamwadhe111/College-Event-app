import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, Event, Registration } from '../types';

// Users Collection
export const usersCollection = collection(db, 'users');
export const eventsCollection = collection(db, 'events');
export const registrationsCollection = collection(db, 'registrations');

// User Operations
export const createUser = async (userData: Omit<User, 'id'>) => {
  const docRef = await addDoc(usersCollection, {
    ...userData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, userData);
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

// Event Operations
export const createEvent = async (eventData: Omit<Event, 'id'>) => {
  const docRef = await addDoc(eventsCollection, {
    ...eventData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

export const getEvent = async (eventId: string) => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Event : null;
};

export const getAllEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
};

export const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
  const docRef = doc(db, 'events', eventId);
  await updateDoc(docRef, {
    ...eventData,
    updatedAt: Timestamp.now()
  });
};

export const deleteEvent = async (eventId: string) => {
  const docRef = doc(db, 'events', eventId);
  await deleteDoc(docRef);
};

// Registration Operations
export const createRegistration = async (registrationData: Omit<Registration, 'id'>) => {
  const docRef = await addDoc(registrationsCollection, {
    ...registrationData,
    registeredAt: Timestamp.now()
  });
  return docRef.id;
};

export const getUserRegistrations = async (userId: string) => {
  const q = query(registrationsCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
};

export const getEventRegistrations = async (eventId: string) => {
  const q = query(registrationsCollection, where('eventId', '==', eventId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
};
