import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail,
  Phone,
  FileText,
  Video,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  Clock
} from 'lucide-react';

const EnhancedHelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'guides', label: 'User Guides', icon: Book },
    { id: 'videos', label: 'Video Tutorials', icon: Video },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle }
  ];

  const faqs = [
    {
      id: 1,
      category: 'Event Management',
      question: 'How do I approve an event request?',
      answer: 'To approve an event request, navigate to the "Approvals" section from the main menu. Find the event you want to review, click on it to view details, and then click the "Approve" button. You can also add comments for the organizer.',
      tags: ['approval', 'events', 'workflow'],
      popularity: 95
    },
    {
      id: 2,
      category: 'User Management',
      question: 'How do I add a new organizer to the system?',
      answer: 'Go to the "Organizers" section and click "Add Organizer". Fill in the required information including name, email, department, and designation. The new organizer will receive an email with login credentials.',
      tags: ['organizers', 'users', 'registration'],
      popularity: 87
    },
    {
      id: 3,
      category: 'Analytics',
      question: 'How can I generate monthly reports?',
      answer: 'Visit the "Analytics" section and select the desired time range using the dropdown menu. Click "Export Report" to download a comprehensive PDF report with all event statistics and participation data.',
      tags: ['reports', 'analytics', 'export'],
      popularity: 78
    },
    {
      id: 4,
      category: 'System Settings',
      question: 'How do I change notification preferences?',
      answer: 'Go to "Settings" > "Notifications" to customize your notification preferences. You can enable/disable email notifications, push notifications, and set the frequency for different types of alerts.',
      tags: ['notifications', 'settings', 'preferences'],
      popularity: 82
    },
    {
      id: 5,
      category: 'Event Management',
      question: 'What should I do if an event exceeds capacity?',
      answer: 'When an event approaches or exceeds capacity, you\'ll receive an automatic notification. You can either increase the capacity limit in the event settings or create a waiting list for additional participants.',
      tags: ['capacity', 'events', 'management'],
      popularity: 71
    },
    {
      id: 6,
      category: 'Security',
      question: 'How do I enable two-factor authentication?',
      answer: 'Navigate to "Settings" > "Security" and toggle on "Two-Factor Authentication". Follow the setup wizard to configure your preferred authentication method (SMS or authenticator app).',
      tags: ['security', '2fa', 'authentication'],
      popularity: 89
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Admin Portal',
      description: 'Complete guide to navigating and using the admin portal effectively',
      category: 'Basics',
      readTime: '10 min',
      lastUpdated: '2024-01-10',
      downloadUrl: '/guides/getting-started.pdf'
    },
    {
      id: 2,
      title: 'Event Approval Workflow',
      description: 'Step-by-step process for reviewing and approving event requests',
      category: 'Event Management',
      readTime: '15 min',
      lastUpdated: '2024-01-08',
      downloadUrl: '/guides/event-approval.pdf'
    },
    {
      id: 3,
      title: 'Managing Organizers and Permissions',
      description: 'How to add, remove, and manage organizer accounts and their permissions',
      category: 'User Management',
      readTime: '12 min',
      lastUpdated: '2024-01-05',
      downloadUrl: '/guides/organizer-management.pdf'
    },
    {
      id: 4,
      title: 'Analytics and Reporting',
      description: 'Understanding analytics data and generating comprehensive reports',
      category: 'Analytics',
      readTime: '20 min',
      lastUpdated: '2024-01-03',
      downloadUrl: '/guides/analytics-reporting.pdf'
    },
    {
      id: 5,
      title: 'System Configuration',
      description: 'Configuring system settings, notifications, and security options',
      category: 'Configuration',
      readTime: '18 min',
      lastUpdated: '2023-12-28',
      downloadUrl: '/guides/system-config.pdf'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Admin Portal Overview',
      description: 'Quick tour of the admin portal interface and main features',
      duration: '5:30',
      category: 'Getting Started',
      thumbnail: '/thumbnails/overview.jpg',
      videoUrl: '/videos/admin-overview.mp4'
    },
    {
      id: 2,
      title: 'Event Approval Process',
      description: 'Detailed walkthrough of the event approval workflow',
      duration: '8:45',
      category: 'Event Management',
      thumbnail: '/thumbnails/approval.jpg',
      videoUrl: '/videos/event-approval.mp4'
    },
    {
      id: 3,
      title: 'Managing Notifications',
      description: 'How to configure and manage notification settings',
      duration: '6:20',
      category: 'Settings',
      thumbnail: '/thumbnails/notifications.jpg',
      videoUrl: '/videos/notifications.mp4'
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description: 'Understanding and using the analytics dashboard effectively',
      duration: '12:15',
      category: 'Analytics',
      thumbnail: '/thumbnails/analytics.jpg',
      videoUrl: '/videos/analytics.mp4'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderFAQ = () => (
    <div className="space-y-4">
      {filteredFaqs.map((faq) => (
        <div key={faq.id} className="bg-gray-700 rounded-lg border border-gray-600">
          <button
            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-600 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {faq.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400" />
                  <span className="text-xs text-gray-400">{faq.popularity}% helpful</span>
                </div>
              </div>
              <h3 className="text-white font-medium">{faq.question}</h3>
            </div>
            {expandedFaq === faq.id ? (
              <ChevronDown size={20} className="text-gray-400" />
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
            )}
          </button>
          
          {expandedFaq === faq.id && (
            <div className="px-4 pb-4 border-t border-gray-600">
              <p className="text-gray-300 mt-3 mb-4">{faq.answer}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Tags:</span>
                {faq.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderGuides = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredGuides.map((guide) => (
        <div key={guide.id} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <div className="flex items-start justify-between mb-3">
            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
              {guide.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={12} />
              {guide.readTime}
            </div>
          </div>
          
          <h3 className="text-white font-semibold text-lg mb-2">{guide.title}</h3>
          <p className="text-gray-300 mb-4">{guide.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Updated: {guide.lastUpdated}
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                <FileText size={14} />
                Read Online
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-500 transition-colors">
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVideos = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <div key={video.id} className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
          <div className="relative">
            <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
              <Video size={48} className="text-gray-400" />
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
              {video.duration}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                {video.category}
              </span>
            </div>
            
            <h3 className="text-white font-semibold mb-2">{video.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{video.description}</p>
            
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Video size={16} />
              Watch Video
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Methods */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
          
          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mail size={20} color="white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Email Support</h3>
                <p className="text-gray-400 text-sm">Get help via email</p>
              </div>
            </div>
            <p className="text-gray-300 mb-3">
              Send us an email and we'll respond within 24 hours.
            </p>
            <a 
              href="mailto:admin-support@college.edu"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              admin-support@college.edu
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Phone size={20} color="white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Phone Support</h3>
                <p className="text-gray-400 text-sm">Call us directly</p>
              </div>
            </div>
            <p className="text-gray-300 mb-3">
              Available Monday-Friday, 9 AM - 5 PM EST
            </p>
            <a 
              href="tel:+1-555-123-4567"
              className="text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              +1 (555) 123-4567
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle size={20} color="white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Live Chat</h3>
                <p className="text-gray-400 text-sm">Chat with our team</p>
              </div>
            </div>
            <p className="text-gray-300 mb-3">
              Get instant help through our live chat system.
            </p>
            <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
              Start Chat
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h2 className="text-2xl font-semibold text-white mb-4">Send us a Message</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>General Question</option>
                <option>Technical Issue</option>
                <option>Feature Request</option>
                <option>Bug Report</option>
                <option>Account Issue</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your issue or question in detail..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faq': return renderFAQ();
      case 'guides': return renderGuides();
      case 'videos': return renderVideos();
      case 'contact': return renderContact();
      default: return renderFAQ();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
        <p className="text-gray-400">Find answers, guides, and get support for the admin portal</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help articles, guides, or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {React.createElement(tab.icon, { size: 16 })}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default EnhancedHelpPage;