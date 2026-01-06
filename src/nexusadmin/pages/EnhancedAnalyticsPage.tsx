import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar, 
  Activity,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  MapPin
} from 'lucide-react';

const EnhancedAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('events');

  const analyticsData = {
    overview: {
      totalEvents: 156,
      totalParticipants: 2847,
      activeOrganizers: 24,
      avgParticipation: 18.2,
      growthRate: 12.5,
      completionRate: 94.2
    },
    eventsByCategory: [
      { category: 'Technology', count: 45, percentage: 28.8, growth: 15.2 },
      { category: 'Cultural', count: 38, percentage: 24.4, growth: 8.7 },
      { category: 'Sports', count: 32, percentage: 20.5, growth: -2.1 },
      { category: 'Academic', count: 25, percentage: 16.0, growth: 22.3 },
      { category: 'Professional', count: 16, percentage: 10.3, growth: 5.8 }
    ],
    monthlyTrends: [
      { month: 'Aug', events: 12, participants: 245 },
      { month: 'Sep', events: 18, participants: 387 },
      { month: 'Oct', events: 22, participants: 456 },
      { month: 'Nov', events: 19, participants: 398 },
      { month: 'Dec', events: 15, participants: 312 },
      { month: 'Jan', events: 23, participants: 489 }
    ],
    topOrganizers: [
      { name: 'John Smith', events: 12, participants: 450, rating: 4.8 },
      { name: 'Sarah Johnson', events: 8, participants: 680, rating: 4.9 },
      { name: 'Mike Wilson', events: 6, participants: 234, rating: 4.6 },
      { name: 'Emily Davis', events: 5, participants: 198, rating: 4.7 },
      { name: 'Alex Brown', events: 4, participants: 156, rating: 4.5 }
    ],
    popularVenues: [
      { venue: 'Main Auditorium', events: 28, capacity: 500, utilization: 85 },
      { venue: 'Conference Hall', events: 22, capacity: 200, utilization: 92 },
      { venue: 'Sports Complex', events: 18, capacity: 300, utilization: 78 },
      { venue: 'Innovation Hub', events: 15, capacity: 150, utilization: 88 },
      { venue: 'Library Hall', events: 12, capacity: 100, utilization: 95 }
    ],
    participationTrends: {
      registrationRate: 78.5,
      attendanceRate: 85.2,
      satisfactionScore: 4.6,
      repeatParticipation: 42.3
    }
  };

  const timeRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Comprehensive insights into college event performance</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar size={20} color="white" />
            </div>
            <span className={`flex items-center gap-1 text-sm ${getGrowthColor(analyticsData.overview.growthRate)}`}>
              {getGrowthIcon(analyticsData.overview.growthRate)}
              {Math.abs(analyticsData.overview.growthRate)}%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.overview.totalEvents}</p>
          <p className="text-gray-400 text-sm">Total Events</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Users size={20} color="white" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              8.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.overview.totalParticipants.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Total Participants</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Activity size={20} color="white" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              3.1%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.overview.activeOrganizers}</p>
          <p className="text-gray-400 text-sm">Active Organizers</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Target size={20} color="white" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              2.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.overview.avgParticipation}</p>
          <p className="text-gray-400 text-sm">Avg Participation</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Award size={20} color="white" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              1.8%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.overview.completionRate}%</p>
          <p className="text-gray-400 text-sm">Completion Rate</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <Clock size={20} color="white" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp size={16} />
              4.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.participationTrends.satisfactionScore}</p>
          <p className="text-gray-400 text-sm">Satisfaction Score</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Events by Category */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Events by Category</h2>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.eventsByCategory.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  />
                  <span className="text-white font-medium">{category.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{category.count} events</span>
                  <span className="text-gray-400">{category.percentage}%</span>
                  <span className={`flex items-center gap-1 text-sm ${getGrowthColor(category.growth)}`}>
                    {getGrowthIcon(category.growth)}
                    {Math.abs(category.growth)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Monthly Trends</h2>
            <LineChart size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.monthlyTrends.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white font-medium w-12">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.events / 25) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-16">{month.events} events</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{month.participants} participants</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Organizers */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Top Organizers</h2>
            <Users size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.topOrganizers.map((organizer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {organizer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{organizer.name}</p>
                    <p className="text-gray-400 text-sm">{organizer.events} events • {organizer.participants} participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < Math.floor(organizer.rating) ? 'bg-yellow-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">{organizer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Venues */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Popular Venues</h2>
            <MapPin size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.popularVenues.map((venue, index) => (
              <div key={index} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{venue.venue}</span>
                  <span className="text-gray-400 text-sm">{venue.utilization}% utilized</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>{venue.events} events</span>
                  <span>Capacity: {venue.capacity}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${venue.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participation Insights */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Participation Insights</h2>
          <BarChart3 size={20} className="text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">{analyticsData.participationTrends.registrationRate}%</span>
            </div>
            <p className="text-white font-medium">Registration Rate</p>
            <p className="text-gray-400 text-sm">Students who register for events</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">{analyticsData.participationTrends.attendanceRate}%</span>
            </div>
            <p className="text-white font-medium">Attendance Rate</p>
            <p className="text-gray-400 text-sm">Registered students who attend</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">{analyticsData.participationTrends.satisfactionScore}</span>
            </div>
            <p className="text-white font-medium">Satisfaction Score</p>
            <p className="text-gray-400 text-sm">Average event rating</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">{analyticsData.participationTrends.repeatParticipation}%</span>
            </div>
            <p className="text-white font-medium">Repeat Participation</p>
            <p className="text-gray-400 text-sm">Students attending multiple events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsPage;