import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { User, Event, Registration } from '../types';

// ============================================
// AUTHENTICATION SERVICES
// ============================================

export const registerUser = async (email: string, password: string, userData: Omit<User, 'id'>) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Create user document in Firestore
    const userDoc: User = {
      ...userData,
      id: userId,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', userId), userDoc);

    return { success: true, user: userDoc };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    const userData = userDoc.data() as User;

    // Check if organizer is approved
    if (userData.role === 'organizer' && !userData.isApproved) {
      await firebaseSignOut(auth);
      return { 
        success: false, 
        error: 'Your organizer account is pending approval. Please wait for admin approval.' 
      };
    }

    return { success: true, user: userData };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async (firebaseUser: FirebaseUser) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// ============================================
// USER SERVICES
// ============================================

export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => doc.data() as User);
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
    return { success: true };
  } catch (error: any) {
    console.error('Update user error:', error);
    return { success: false, error: error.message };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

// ============================================
// EVENT SERVICES
// ============================================

export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const eventDoc = {
      ...eventData,
      registered: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'events'), eventDoc);
    
    return { 
      success: true, 
      eventId: docRef.id,
      event: { ...eventDoc, id: docRef.id }
    };
  } catch (error: any) {
    console.error('Create event error:', error);
    return { success: false, error: error.message };
  }
};

export const getAllEvents = async () => {
  try {
    const eventsSnapshot = await getDocs(collection(db, 'events'));
    return eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error('Get events error:', error);
    return [];
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as Event;
    }
    return null;
  } catch (error) {
    console.error('Get event error:', error);
    return null;
  }
};

export const updateEvent = async (eventId: string, updates: Partial<Event>) => {
  try {
    await updateDoc(doc(db, 'events', eventId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error: any) {
    console.error('Update event error:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    return { success: true };
  } catch (error: any) {
    console.error('Delete event error:', error);
    return { success: false, error: error.message };
  }
};

export const getEventsByOrganizer = async (organizerId: string) => {
  try {
    const q = query(
      collection(db, 'events'),
      where('organizerId', '==', organizerId)
    );
    const eventsSnapshot = await getDocs(q);
    return eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error('Get organizer events error:', error);
    return [];
  }
};

// ============================================
// REGISTRATION SERVICES
// ============================================

export const registerForEvent = async (eventId: string, userId: string) => {
  try {
    // Check if already registered
    const q = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      where('userId', '==', userId)
    );
    const existingReg = await getDocs(q);
    
    if (!existingReg.empty) {
      return { success: false, error: 'Already registered for this event' };
    }

    // Get event to check capacity
    const event = await getEventById(eventId);
    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    if (event.registered >= event.capacity) {
      return { success: false, error: 'Event is full' };
    }

    // Create registration
    const registration: Omit<Registration, 'id'> = {
      userId,
      eventId,
      registeredAt: new Date().toISOString(),
      status: 'registered'
    };

    const docRef = await addDoc(collection(db, 'registrations'), registration);

    // Update event registered count
    await updateEvent(eventId, {
      registered: event.registered + 1
    });

    return { success: true, registrationId: docRef.id };
  } catch (error: any) {
    console.error('Register for event error:', error);
    return { success: false, error: error.message };
  }
};

export const unregisterFromEvent = async (eventId: string, userId: string) => {
  try {
    // Find registration
    const q = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      where('userId', '==', userId)
    );
    const registrations = await getDocs(q);

    if (registrations.empty) {
      return { success: false, error: 'Registration not found' };
    }

    // Delete registration
    await deleteDoc(registrations.docs[0].ref);

    // Update event registered count
    const event = await getEventById(eventId);
    if (event && event.registered > 0) {
      await updateEvent(eventId, {
        registered: event.registered - 1
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Unregister from event error:', error);
    return { success: false, error: error.message };
  }
};

export const getUserRegistrations = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'registrations'),
      where('userId', '==', userId)
    );
    const registrationsSnapshot = await getDocs(q);
    return registrationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Registration));
  } catch (error) {
    console.error('Get user registrations error:', error);
    return [];
  }
};

export const getEventRegistrations = async (eventId: string) => {
  try {
    const q = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId)
    );
    const registrationsSnapshot = await getDocs(q);
    return registrationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Registration));
  } catch (error) {
    console.error('Get event registrations error:', error);
    return [];
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const isUserRegisteredForEvent = async (eventId: string, userId: string) => {
  try {
    const q = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      where('userId', '==', userId)
    );
    const registrations = await getDocs(q);
    return !registrations.empty;
  } catch (error) {
    console.error('Check registration error:', error);
    return false;
  }
};
