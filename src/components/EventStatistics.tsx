import React from 'react';
import { Event } from '../types';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

interface EventStatisticsProps {
  events: Event[];
}

const EventStatistics: React.FC<EventStatisticsProps> = ({ events }) => {
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registered, 0);
  const totalRevenue = events.reduce((sum, event) => sum + (event.price * event.registered), 0);
  const avgRegistrations = totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0;
  
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const completedEvents = events.filter(e => e.status === 'completed').length;
  
  const mostPopularEvent = events.length > 0
    ? events.reduce((max, event) => 
        event.registered > (max?.registered || 0) ? event : max, 
      events[0])
    : null;

  const stats = [
    {
      label: 'Total Events',
      value: totalEvents,
      icon: Calendar,
      color: 'emerald',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    },
    {
      label: 'Total Registrations',
      value: totalRegistrations,
      icon: Users,
      color: 'teal',
      bgColor: 'rgba(20, 184, 166, 0.1)',
      borderColor: 'rgba(20, 184, 166, 0.3)'
    },
    {
      label: 'Avg. Registrations',
      value: avgRegistrations,
      icon: TrendingUp,
      color: 'cyan',
      bgColor: 'rgba(6, 182, 212, 0.1)',
      borderColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="card p-6 text-center hover:scale-105 transition-transform"
              style={{
                background: stat.bgColor,
                borderColor: stat.borderColor
              }}
            >
              <div className="flex justify-center mb-3">
                <Icon className="w-8 h-8" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Event Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Event Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Upcoming</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold">
                {upcomingEvents}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Completed</span>
              <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-semibold">
                {completedEvents}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ongoing</span>
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold">
                {events.filter(e => e.status === 'ongoing').length}
              </span>
            </div>
          </div>
        </div>

        {/* Most Popular Event */}
        {mostPopularEvent && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🏆 Most Popular Event</h3>
            <div className="space-y-2">
              <div className="font-medium text-emerald-400">{mostPopularEvent.title}</div>
              <div className="text-sm text-gray-300">
                {mostPopularEvent.registered} registrations
              </div>
              <div className="text-xs text-gray-400">
                {mostPopularEvent.capacity > 0 ? Math.round((mostPopularEvent.registered / mostPopularEvent.capacity) * 100) : 0}% capacity filled
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Events by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from(new Set(events.map(e => e.category))).map(category => {
            const count = events.filter(e => e.category === category).length;
            return (
              <div key={category} className="text-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">{count}</div>
                <div className="text-xs text-gray-300 mt-1">{category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventStatistics;
