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
  Book
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
      answer: "To become an event organizer, you need to register with an organizer account using the admin code provided by your college administration. If you don't have the code, contact the college office or student affairs department.",
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
      question: "Can I edit my profile information?",
      answer: "Yes, you can edit your profile information by going to the Profile page from the user menu. You can update your name, contact information, and other details. Some information like email address may require admin verification.",
      category: "account"
    },
    {
      id: 8,
      question: "How do I receive notifications about events?",
      answer: "Notifications are automatically sent for events you've registered for, including reminders and updates. You can view all your notifications in the Notifications page. Make sure to check your notifications regularly for important updates.",
      category: "notifications"
    },
    {
      id: 9,
      question: "What should I do if I encounter a technical issue?",
      answer: "If you encounter any technical issues, try refreshing the page first. If the problem persists, contact the IT support team using the contact information provided below. Please describe the issue in detail and mention which browser you're using.",
      category: "technical"
    },
    {
      id: 10,
      question: "Are there any rules for event participation?",
      answer: "Yes, all participants must follow the college code of conduct during events. Specific rules may vary by event type. Check the event details page for any special requirements or restrictions. Inappropriate behavior may result in removal from the event and account suspension.",
      category: "rules"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Topics', icon: Book },
    { key: 'registration', label: 'Event Registration', icon: Calendar },
    { key: 'organizer', label: 'Event Creation', icon: Plus },
    { key: 'account', label: 'Account & Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Settings },
    { key: 'technical', label: 'Technical Issues', icon: Shield },
    { key: 'rules', label: 'Rules & Policies', icon: Book }
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
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions and get support for using the Nexus Event Management Platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.key
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-white">Frequently Asked Questions</h2>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle size={64} className="mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="card">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-white pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="text-emerald-400 flex-shrink-0" size={20} />
                        ) : (
                          <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-6 border-t border-gray-700/50">
                          <p className="text-gray-300 leading-relaxed pt-4">
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
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-6 text-white">Contact Support</h2>
              <p className="text-gray-300 mb-6">
                Can't find what you're looking for? Get in touch with our support team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <Mail className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Support</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      For technical issues and general inquiries
                    </p>
                    <a 
                      href="mailto:support@nexus.college.edu" 
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      support@nexus.college.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Phone className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone Support</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      For urgent issues and immediate assistance
                    </p>
                    <a 
                      href="tel:+1234567890" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <MapPin className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Office Location</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Visit us for in-person support
                    </p>
                    <p className="text-purple-400">
                      Student Affairs Office<br />
                      Main Building, Room 201
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <Clock className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Office Hours</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      When you can reach us
                    </p>
                    <p className="text-yellow-400">
                      Mon-Fri: 9:00 AM - 5:00 PM<br />
                      Sat: 10:00 AM - 2:00 PM
                    </p>
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