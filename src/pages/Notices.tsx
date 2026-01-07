import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Clock, AlertTriangle, Info, CheckCircle, Pin } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  type: 'urgent' | 'important' | 'general' | 'exam' | 'cultural';
  date: string;
  author: string;
  isPinned: boolean;
  expiryDate?: string;
}

const Notices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    // Simulate loading notices
    const loadNotices = async () => {
      setLoading(true);
      
      // Mock data - in real app, this would come from API
      const mockNotices: Notice[] = [
        {
          id: 1,
          title: "Mid-Semester Examination Schedule Released",
          content: "The mid-semester examination schedule for all departments has been released. Students are advised to check their respective department notice boards and the college website for detailed timetables. Examinations will commence from March 15, 2024.",
          type: 'exam',
          date: '2024-02-10',
          author: 'Academic Office',
          isPinned: true,
          expiryDate: '2024-03-20'
        },
        {
          id: 2,
          title: "Annual Cultural Fest - Nexus 2024 Registration Open",
          content: "Registration for the annual cultural fest 'Nexus 2024' is now open. Students can participate in various events including dance, music, drama, art, and literary competitions. Registration deadline: February 25, 2024.",
          type: 'cultural',
          date: '2024-02-08',
          author: 'Cultural Committee',
          isPinned: true,
          expiryDate: '2024-02-25'
        },
        {
          id: 3,
          title: "Library Timing Changes - Weekend Hours",
          content: "Due to maintenance work, the library will have modified timings during weekends. Saturday: 9:00 AM - 5:00 PM, Sunday: Closed. Regular timings will resume from next week.",
          type: 'important',
          date: '2024-02-07',
          author: 'Library Administration',
          isPinned: false,
          expiryDate: '2024-02-18'
        },
        {
          id: 4,
          title: "Scholarship Application Deadline Extended",
          content: "The deadline for merit-based scholarship applications has been extended to February 28, 2024. Students who meet the eligibility criteria are encouraged to apply through the student portal.",
          type: 'important',
          date: '2024-02-06',
          author: 'Student Affairs',
          isPinned: false,
          expiryDate: '2024-02-28'
        },
        {
          id: 5,
          title: "Campus WiFi Maintenance - Temporary Disruption",
          content: "The campus WiFi network will undergo scheduled maintenance on February 12, 2024, from 2:00 AM to 6:00 AM. Internet services may be temporarily unavailable during this period.",
          type: 'urgent',
          date: '2024-02-05',
          author: 'IT Department',
          isPinned: false,
          expiryDate: '2024-02-12'
        },
        {
          id: 6,
          title: "Guest Lecture on Artificial Intelligence",
          content: "The Computer Science Department is organizing a guest lecture on 'Future of Artificial Intelligence' by Dr. Sarah Johnson from MIT. Date: February 20, 2024, Time: 2:00 PM, Venue: Main Auditorium.",
          type: 'general',
          date: '2024-02-04',
          author: 'CS Department',
          isPinned: false,
          expiryDate: '2024-02-20'
        }
      ];

      setNotices(mockNotices);
      setLoading(false);
    };

    loadNotices();
  }, []);

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="text-red-400" size={20} />;
      case 'important':
        return <Info className="text-yellow-400" size={20} />;
      case 'exam':
        return <CheckCircle className="text-blue-400" size={20} />;
      case 'cultural':
        return <Megaphone className="text-purple-400" size={20} />;
      default:
        return <Info className="text-gray-400" size={20} />;
    }
  };

  const getNoticeTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'important':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'exam':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cultural':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const filteredNotices = selectedType === 'all' 
    ? notices 
    : notices.filter(notice => notice.type === selectedType);

  const pinnedNotices = filteredNotices.filter(notice => notice.isPinned);
  const regularNotices = filteredNotices.filter(notice => !notice.isPinned);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Notices & Announcements
          </h1>
          <p className="text-gray-300 text-lg">
            Stay updated with important college announcements and notices
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm border border-gray-700/50">
            {[
              { key: 'all', label: 'All Notices' },
              { key: 'urgent', label: 'Urgent' },
              { key: 'important', label: 'Important' },
              { key: 'exam', label: 'Examinations' },
              { key: 'cultural', label: 'Cultural' },
              { key: 'general', label: 'General' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedType(filter.key)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedType === filter.key
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-400">
              <Pin size={20} />
              Pinned Notices
            </h2>
            <div className="space-y-4">
              {pinnedNotices.map((notice) => (
                <div key={notice.id} className="card border-l-4 border-emerald-500">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {getNoticeIcon(notice.type)}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {notice.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{new Date(notice.date).toLocaleDateString()}</span>
                            </div>
                            <span>By {notice.author}</span>
                            {notice.expiryDate && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeTypeColor(notice.type)}`}>
                        {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices */}
        <div className="space-y-4">
          {regularNotices.length === 0 ? (
            <div className="text-center py-20">
              <Megaphone size={64} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No notices found
              </h3>
              <p className="text-gray-500">
                {selectedType === 'all' 
                  ? "No notices available at the moment."
                  : `No ${selectedType} notices available.`
                }
              </p>
            </div>
          ) : (
            regularNotices.map((notice) => (
              <div key={notice.id} className="card hover:scale-[1.02] transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      {getNoticeIcon(notice.type)}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {notice.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(notice.date).toLocaleDateString()}</span>
                          </div>
                          <span>By {notice.author}</span>
                          {notice.expiryDate && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeTypeColor(notice.type)}`}>
                      {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;