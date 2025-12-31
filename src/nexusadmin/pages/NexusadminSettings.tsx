import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, Shield, Database, Activity, Bell, Lock, User } from 'lucide-react';
import { toast } from 'react-toastify';

const NexusadminSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'system' | 'security' | 'notifications'>('profile');

  const handleSaveProfile = () => {
    toast.success('Profile settings saved');
  };

  const handleSystemSetting = (setting: string) => {
    toast.success(`${setting} updated successfully`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Nexusadmin Settings</h1>
          <p className="text-gray-400">Configure system settings and preferences</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Database className="w-4 h-4" />
            System
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Lock className="w-4 h-4" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Admin Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Admin ID
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.studentId}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.department || ''}
                    placeholder="IT Administration"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Save Profile Changes
              </button>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">System Configuration</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Database Status</h3>
                      <p className="text-gray-400 text-sm">Monitor database connectivity</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Auto-Approval</h3>
                      <p className="text-gray-400 text-sm">Automatically approve organizer registrations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Event Moderation</h3>
                      <p className="text-gray-400 text-sm">Require admin approval for new events</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">System Maintenance</h3>
                      <p className="text-gray-400 text-sm">Enable maintenance mode</p>
                    </div>
                    <button
                      onClick={() => handleSystemSetting('Maintenance mode')}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-colors"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => handleSystemSetting('Password')}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <button
                      onClick={() => handleSystemSetting('Two-factor authentication')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                    >
                      Enable
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Session Timeout</h3>
                      <p className="text-gray-400 text-sm">Automatically log out after inactivity</p>
                    </div>
                    <select className="px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">New User Registrations</h3>
                      <p className="text-gray-400 text-sm">Get notified when new users register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Organizer Applications</h3>
                      <p className="text-gray-400 text-sm">Get notified of pending organizer approvals</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">Event Creation</h3>
                      <p className="text-gray-400 text-sm">Get notified when new events are created</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">System Alerts</h3>
                      <p className="text-gray-400 text-sm">Get notified of system issues and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleSystemSetting('Notification preferences')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Save Notification Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-400" />
          Nexusadmin System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Version</p>
            <p className="text-white font-semibold">Nexusadmin v1.0.0</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Admin Level</p>
            <p className="text-white font-semibold">Full Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexusadminSettings;