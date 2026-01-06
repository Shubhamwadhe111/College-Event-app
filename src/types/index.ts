export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'student' | 'organizer' | 'admin' | 'master';
  avatar?: string;
  phone?: string;
  registeredEvents: string[];
  createdAt: string;
  college?: string;
  department?: string;
  year?: string;
  isApproved?: boolean; // For organizer approval
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  collegeId?: string; // For multi-college support
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  location: string;
  venue: string;
  capacity: number;
  registered: number;
  organizer: string;
  organizerId: string;
  category: EventCategory;
  tags: string[];
  image: string;
  images?: string[];
  price: number;
  isPaid: boolean;
  registrationDeadline: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  requirements?: string[];
  prizes?: string[];
  contactInfo: {
    email: string;
    phone?: string;
  };
  paymentInfo?: {
    upiId?: string;
    phoneNumber?: string;
    qrCode?: string;
    bankDetails?: string;
  };
  socialLinks?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type EventCategory = 
  | 'Technology' 
  | 'Cultural' 
  | 'Sports' 
  | 'Academic' 
  | 'Career' 
  | 'Workshop' 
  | 'Competition' 
  | 'Seminar' 
  | 'Conference'
  | 'Hackathon'
  | 'Other';

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  status: 'registered' | 'waitlisted' | 'cancelled';
  paymentStatus?: 'pending' | 'completed' | 'failed';
  teamMembers?: TeamMember[];
}

export interface TeamMember {
  name: string;
  email: string;
  studentId: string;
  role?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  eventId?: string;
}

export interface FilterOptions {
  category?: EventCategory;
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  status?: Event['status'];
  search?: string;
}