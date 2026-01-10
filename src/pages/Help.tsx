import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  User,
  Calendar,
  Plus,
  Settings,
  Shield,
  Book,
  MessageSquare
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I register for an event?",
      answer: "To register for an event, navigate to the Events page, find the event you're interested in, and click on it to view details. If registration is open and you meet the requirements, you'll see a 'Register' button. Click it and follow the prompts to complete your registration.",
      category: "registration"
    },
    {
      id: 2,
      question: "Can I cancel my event registration?",
      answer: "Yes, you can cancel your registration up to 24 hours before the event starts. Go to 'My Events' page, find the event you want to cancel, and click the 'Cancel Registration' button. Please note that some events may have different cancellation policies.",
      category: "registration"
    },
    {
      id: 3,
      question: "How do I create an event as an organizer?",
      answer: "If you have organizer privileges, go to the 'Create Event' page from the navigation menu. Fill in all required details including event title, description, date, time, location, and upload a poster if available. Submit the event for admin approval. You'll be notified once it's approved.",
      category: "organizer"
    },
    {
      id: 4,
      question: "Why is my event still pending approval?",
      answer: "All events created by organizers must be approved by college administrators before they become visible to students. This process typically takes 1-2 business days. You can check the status of your events in the 'My Events' section.",
      category: "organizer"
    },
    {
      id: 5,
      question: "How do I become an event organizer?",
      answer: "To become an event organizer, you need to register with an organizer account. During registration, select 'Organizer' as your account type. Your account will be reviewed by administrators before approval.",
      category: "account"
    },
    {
      id: 6,
      question: "I forgot my password. How can I reset it?",
      answer: "Currently, password reset functionality is being implemented. For now, please contact the college IT support or administration office with your registered email address to reset your password manually.",
      category: "account"
    },
    {
      id: 7,
      question: "How do I receive notifications about events?",
      answer: "Notifications are automatically sent for events you've registered for, including reminders and updates. You can view all your notifications in the Notifications page. Make sure to check your notifications regularly for important updates.",
      category: "notifications"
    },
    {
      id: 8,
      question: "What should I do if I encounter a technical issue?",
      answer: "If you encounter any technical issues, try refreshing the page first. If the problem persists, contact the IT support team using the contact information provided below. Please describe the issue in detail and mention which browser you're using.",
      category: "technical"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Topics', icon: Book },
    { key: 'registration', label: 'Event Registration', icon: Calendar },
    { key: 'organizer', label: 'Event Creation', icon: Plus },
    { key: 'account', label: 'Account & Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Settings },
    { key: 'technical', label: 'Technical Issues', icon: Shield }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
          }}>
            <HelpCircle size={36} color="white" />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Help & Support
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find answers to common questions and get support for using the Nexus Event Management Platform
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem'
        }}>
          {/* Sidebar */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
                Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        background: selectedCategory === category.key 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                          : 'transparent',
                        color: selectedCategory === category.key ? '#ffffff' : '#94a3b8',
                        fontWeight: selectedCategory === category.key ? 600 : 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      <IconComponent size={18} />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* Search Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b'
                }} />
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* FAQ Section */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
                Frequently Asked Questions
              </h2>
              
              {filteredFAQs.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <HelpCircle size={64} style={{ color: '#64748b', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    No results found
                  </h3>
                  <p style={{ color: '#64748b' }}>
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        style={{
                          width: '100%',
                          padding: '1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', paddingRight: '1rem' }}>
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                        ) : (
                          <ChevronRight size={20} style={{ color: '#64748b', flexShrink: 0 }} />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div style={{
                          padding: '0 1.25rem 1.25rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <p style={{ color: '#94a3b8', lineHeight: '1.7', paddingTop: '1rem', margin: 0 }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
                Contact Support
              </h2>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                Can't find what you're looking for? Get in touch with our support team.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <Mail size={20} style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                      Email Support
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      For technical issues and general inquiries
                    </p>
                    <a href="mailto:support@nexus.college.edu" style={{ color: '#10b981', textDecoration: 'none' }}>
                      support@nexus.college.edu
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <Phone size={20} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                      Phone Support
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      For urgent issues and immediate assistance
                    </p>
                    <a href="tel:+919876543210" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(168, 85, 247, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <MapPin size={20} style={{ color: '#a855f7' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                      Office Location
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Visit us for in-person support
                    </p>
                    <span style={{ color: '#a855f7' }}>
                      Student Affairs Office, Room 201
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(234, 179, 8, 0.2)',
                    borderRadius: '10px'
                  }}>
                    <Clock size={20} style={{ color: '#eab308' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                      Office Hours
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      When you can reach us
                    </p>
                    <span style={{ color: '#eab308' }}>
                      Mon-Fri: 9AM - 5PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
