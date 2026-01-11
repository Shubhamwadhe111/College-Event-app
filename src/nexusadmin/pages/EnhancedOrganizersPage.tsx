import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Phone,
  Building,
  Calendar,
  UserCheck,
  AlertCircle,
  RefreshCw,
  Download,
  X,
  Save,
  Trash2
} from 'lucide-react';

interface Organizer {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: string;
  eventsCreated: number;
  totalParticipants: number;
  joinedDate: string;
  lastActive: string;
  approvalStatus: string;
  rating: number;
  isApproved?: boolean;
  createdAt?: string;
}

const STORAGE_KEY = 'nexus_demo_users';

const EnhancedOrganizersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
  const [newOrganizer, setNewOrganizer] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: 'Event Organizer'
  });

  // Load organizers from backend API with timeout
  const loadOrganizers = async () => {
    setIsLoading(true);
    try {
      console.log('=== LOADING ORGANIZERS FROM BACKEND ===');
      
      // Try to fetch from backend first with timeout
      const API_URL = process.env.REACT_APP_API_URL || 'https://nexus-event-backend.onrender.com/api';
      
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_URL}/admin/pending-organizers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const backendOrganizers = await response.json();
        console.log('Fetched organizers from backend:', backendOrganizers);
        
        // Transform backend data to match our interface
        const organizersList: Organizer[] = backendOrganizers.map((org: any) => ({
          id: org.organizer_id?.toString() || org.id?.toString(),
          name: org.full_name || org.name,
          email: org.email,
          phone: org.phone || 'Not provided',
          department: org.department || 'Not specified',
          designation: org.designation || 'Event Organizer',
          status: org.account_status === 'approved' ? 'active' : org.account_status === 'rejected' ? 'inactive' : 'pending',
          eventsCreated: org.events_created || 0,
          totalParticipants: 0,
          joinedDate: org.created_at ? new Date(org.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
          lastActive: org.created_at ? new Date(org.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
          approvalStatus: org.account_status || 'pending',
          rating: 0,
          isApproved: org.account_status === 'approved'
        }));
        
        console.log('Transformed organizers:', organizersList);
        setOrganizers(organizersList);
      } else {
        console.log('Backend not available, falling back to localStorage');
        // Fallback to localStorage if backend is not available
        loadOrganizersFromLocalStorage();
      }
    } catch (error) {
      console.error('Error loading organizers from backend:', error);
      console.log('Falling back to localStorage');
      // Fallback to localStorage on error
      loadOrganizersFromLocalStorage();
    }
    setIsLoading(false);
  };

  // Fallback: Load organizers from localStorage
  const loadOrganizersFromLocalStorage = () => {
    try {
      console.log('Loading from localStorage...');
      const usersData = localStorage.getItem(STORAGE_KEY);
      
      if (usersData) {
        const users = JSON.parse(usersData);
        const organizersList: Organizer[] = [];
        
        Object.entries(users).forEach(([key, user]: [string, any]) => {
          if (user.role === 'organizer') {
            const isApproved = user.isApproved === true;
            
            organizersList.push({
              id: user.id || key,
              name: user.name,
              email: user.email,
              phone: user.phone || 'Not provided',
              department: user.department || user.college || 'Not specified',
              designation: user.designation || 'Event Organizer',
              status: isApproved ? 'active' : 'pending',
              eventsCreated: 0,
              totalParticipants: 0,
              joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
              lastActive: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
              approvalStatus: isApproved ? 'approved' : 'pending',
              rating: 0,
              isApproved: isApproved
            });
          }
        });
        
        console.log('Found organizers in localStorage:', organizersList.length);
        setOrganizers(organizersList);
      } else {
        console.log('No localStorage data found');
        setOrganizers([]);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      setOrganizers([]);
    }
  };

  useEffect(() => {
    loadOrganizers();
  }, []);

  const tabs = [
    { id: 'all', label: 'All', count: organizers.length },
    { id: 'active', label: 'Active', count: organizers.filter(o => o.status === 'active').length },
    { id: 'pending', label: 'Pending', count: organizers.filter(o => o.approvalStatus === 'pending').length },
    { id: 'inactive', label: 'Inactive', count: organizers.filter(o => o.status === 'inactive').length }
  ];

  const filteredOrganizers = organizers.filter(organizer => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && organizer.approvalStatus === 'pending') ||
                      (activeTab !== 'pending' && organizer.status === activeTab);
    const matchesSearch = organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organizer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organizer.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = async (organizerId: string) => {
    try {
      console.log('Approving organizer:', organizerId);
      
      // Use storage service abstraction (works with both backend and localStorage)
      const { getStorageService } = await import('../../services/storageAbstraction');
      const storageService = getStorageService();
      
      await storageService.approveOrganizer(organizerId, 'approve');
      
      console.log('Organizer approved successfully');
      alert('Organizer approved successfully!');
      await loadOrganizers();
    } catch (error) {
      console.error('Error approving organizer:', error);
      alert('Failed to approve organizer. Please try again.');
    }
  };

  const handleReject = async (organizerId: string) => {
    if (!window.confirm('Are you sure you want to reject this organizer?')) return;
    
    try {
      console.log('Rejecting organizer:', organizerId);
      
      // Use storage service abstraction (works with both backend and localStorage)
      const { getStorageService } = await import('../../services/storageAbstraction');
      const storageService = getStorageService();
      
      await storageService.approveOrganizer(organizerId, 'reject');
      
      console.log('Organizer rejected successfully');
      alert('Organizer rejected successfully!');
      await loadOrganizers();
    } catch (error) {
      console.error('Error rejecting organizer:', error);
      alert('Failed to reject organizer. Please try again.');
    }
  };

  const handleToggleStatus = (organizerId: string) => {
    try {
      const usersData = localStorage.getItem(STORAGE_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        if (users[organizerId]) {
          users[organizerId].isApproved = !users[organizerId].isApproved;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
          loadOrganizers();
        }
      }
    } catch (error) {
      console.error('Error toggling organizer status:', error);
    }
  };

  const handleExport = () => {
    try {
      const exportData = organizers.map(org => ({
        Name: org.name,
        Email: org.email,
        Phone: org.phone,
        Department: org.department,
        Designation: org.designation,
        Status: org.status,
        'Approval Status': org.approvalStatus,
        'Joined Date': org.joinedDate
      }));
      
      // Create CSV content
      const headers = Object.keys(exportData[0] || {}).join(',');
      const rows = exportData.map(row => Object.values(row).map(v => `"${v}"`).join(','));
      const csv = [headers, ...rows].join('\n');
      
      // Download file
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `organizers_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert('Organizers exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export organizers');
    }
  };

  const handleAddOrganizer = () => {
    if (!newOrganizer.name || !newOrganizer.email) {
      alert('Please fill in name and email');
      return;
    }
    
    try {
      const usersData = localStorage.getItem(STORAGE_KEY);
      const users = usersData ? JSON.parse(usersData) : {};
      
      // Check if email exists
      const emailExists = Object.values(users).some((u: any) => u.email === newOrganizer.email);
      if (emailExists) {
        alert('Email already exists');
        return;
      }
      
      // Generate new ID
      const newId = Date.now().toString();
      
      users[newId] = {
        id: newId,
        name: newOrganizer.name,
        email: newOrganizer.email,
        phone: newOrganizer.phone,
        department: newOrganizer.department,
        designation: newOrganizer.designation,
        role: 'organizer',
        isApproved: true, // Admin-added organizers are pre-approved
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      loadOrganizers();
      setShowAddModal(false);
      setNewOrganizer({ name: '', email: '', phone: '', department: '', designation: 'Event Organizer' });
      alert('Organizer added successfully!');
    } catch (error) {
      console.error('Error adding organizer:', error);
      alert('Failed to add organizer');
    }
  };

  const handleViewOrganizer = (organizer: Organizer) => {
    setSelectedOrganizer(organizer);
    setShowViewModal(true);
  };

  const handleEditOrganizer = (organizer: Organizer) => {
    setSelectedOrganizer(organizer);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedOrganizer) return;
    
    try {
      const usersData = localStorage.getItem(STORAGE_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        if (users[selectedOrganizer.id]) {
          users[selectedOrganizer.id] = {
            ...users[selectedOrganizer.id],
            name: selectedOrganizer.name,
            email: selectedOrganizer.email,
            phone: selectedOrganizer.phone,
            department: selectedOrganizer.department,
            designation: selectedOrganizer.designation
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
          loadOrganizers();
          setShowEditModal(false);
          setSelectedOrganizer(null);
          alert('Organizer updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error updating organizer:', error);
      alert('Failed to update organizer');
    }
  };

  const handleDeleteOrganizer = (organizerId: string) => {
    if (!window.confirm('Are you sure you want to delete this organizer?')) return;
    
    try {
      const usersData = localStorage.getItem(STORAGE_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        delete users[organizerId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        loadOrganizers();
        alert('Organizer deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting organizer:', error);
      alert('Failed to delete organizer');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.4)' };
      case 'pending': return { background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)' };
      case 'inactive': return { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: '1px solid rgba(107, 114, 128, 0.4)' };
      default: return { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: '1px solid rgba(107, 114, 128, 0.4)' };
    }
  };

  const totalEvents = organizers.reduce((sum, o) => sum + o.eventsCreated, 0);

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
    border: '1px solid rgba(255,255,255,0.1)'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '1.5rem',
      paddingTop: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: 0, marginBottom: '0.5rem' }}>
                Organizers Management
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
                Manage event organizers, approvals, and permissions
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleExport}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}>
                <Download size={18} />
                Export
              </button>
              <button 
                onClick={loadOrganizers}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}>
                <RefreshCw size={18} />
                Refresh
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}>
                <Plus size={18} />
                Add Organizer
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Total Organizers</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{organizers.length}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Active</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{organizers.filter(o => o.status === 'active').length}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserCheck size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: organizers.filter(o => o.approvalStatus === 'pending').length > 0 
              ? 'rgba(245, 158, 11, 0.1)' 
              : 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: organizers.filter(o => o.approvalStatus === 'pending').length > 0 
              ? '1px solid rgba(245, 158, 11, 0.3)' 
              : '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Pending Approval</p>
                <p style={{ color: organizers.filter(o => o.approvalStatus === 'pending').length > 0 ? '#f59e0b' : '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
                  {organizers.filter(o => o.approvalStatus === 'pending').length}
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: 0, marginBottom: '0.5rem' }}>Total Events</p>
                <p style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{totalEvents}</p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={24} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.1)',
                    color: activeTab === tab.id ? '#ffffff' : 'rgba(255,255,255,0.7)'
                  }}
                >
                  {tab.label}
                  <span style={{
                    marginLeft: '0.5rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'
                  }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: '250px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="text"
                placeholder="Search organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <RefreshCw size={32} style={{ color: '#10b981', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Loading organizers from cloud database...</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.85rem' }}>
              This may take 30-60 seconds if the backend is waking up
            </p>
          </div>
        )}

        {/* Organizers List */}
        {!isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOrganizers.map((organizer) => (
              <div key={organizer.id} style={{
                background: organizer.approvalStatus === 'pending' 
                  ? 'rgba(245, 158, 11, 0.05)' 
                  : 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '1.25rem',
                border: organizer.approvalStatus === 'pending' 
                  ? '1px solid rgba(245, 158, 11, 0.3)' 
                  : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: organizer.approvalStatus === 'pending' 
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                        : 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>
                        {organizer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{organizer.name}</h3>
                        <span style={{
                          ...getStatusStyle(organizer.status),
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          {organizer.status === 'active' && <CheckCircle size={12} />}
                          {organizer.status === 'pending' && <Clock size={12} />}
                          {organizer.status === 'inactive' && <XCircle size={12} />}
                          {organizer.status.charAt(0).toUpperCase() + organizer.status.slice(1)}
                        </span>
                        {organizer.approvalStatus === 'pending' && (
                          <span style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}>
                            <AlertCircle size={12} />
                            Needs Approval
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                          <Mail size={14} />
                          {organizer.email}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                          <Phone size={14} />
                          {organizer.phone}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                          <Building size={14} />
                          {organizer.department}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Designation</p>
                          <p style={{ color: '#ffffff', fontSize: '0.85rem', margin: 0, fontWeight: 500 }}>{organizer.designation}</p>
                        </div>
                        <div>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>Registered</p>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>{organizer.joinedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleViewOrganizer(organizer)}
                      title="View Details"
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        borderRadius: '8px',
                        color: '#3b82f6',
                        cursor: 'pointer'
                      }}>
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEditOrganizer(organizer)}
                      title="Edit"
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(245, 158, 11, 0.2)',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        borderRadius: '8px',
                        color: '#f59e0b',
                        cursor: 'pointer'
                      }}>
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteOrganizer(organizer.id)}
                      title="Delete"
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}>
                      <Trash2 size={16} />
                    </button>

                    {organizer.approvalStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(organizer.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(organizer.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {organizer.approvalStatus === 'approved' && (
                      <button
                        onClick={() => handleToggleStatus(organizer.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: organizer.status === 'active' 
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                            : 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {organizer.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredOrganizers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Users size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, margin: 0, marginBottom: '0.5rem' }}>
              {activeTab === 'pending' ? 'No pending approvals' : 'No organizers found'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0, marginBottom: '1rem' }}>
              {activeTab === 'pending' 
                ? 'All organizer requests have been processed' 
                : 'Organizers who register on the main website will appear here'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} />
              Add First Organizer
            </button>
          </div>
        )}
      </div>

      {/* Add Organizer Modal */}
      {showAddModal && (
        <div style={modalOverlayStyle} onClick={() => setShowAddModal(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Add New Organizer</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Name *</label>
                <input
                  type="text"
                  value={newOrganizer.name}
                  onChange={e => setNewOrganizer({...newOrganizer, name: e.target.value})}
                  style={inputStyle}
                  placeholder="Enter organizer name"
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Email *</label>
                <input
                  type="email"
                  value={newOrganizer.email}
                  onChange={e => setNewOrganizer({...newOrganizer, email: e.target.value})}
                  style={inputStyle}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Phone</label>
                <input
                  type="tel"
                  value={newOrganizer.phone}
                  onChange={e => setNewOrganizer({...newOrganizer, phone: e.target.value})}
                  style={inputStyle}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Department/Organization</label>
                <input
                  type="text"
                  value={newOrganizer.department}
                  onChange={e => setNewOrganizer({...newOrganizer, department: e.target.value})}
                  style={inputStyle}
                  placeholder="Enter department or organization"
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Designation</label>
                <input
                  type="text"
                  value={newOrganizer.designation}
                  onChange={e => setNewOrganizer({...newOrganizer, designation: e.target.value})}
                  style={inputStyle}
                  placeholder="Enter designation"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrganizer}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={18} />
                  Add Organizer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Organizer Modal */}
      {showViewModal && selectedOrganizer && (
        <div style={modalOverlayStyle} onClick={() => setShowViewModal(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Organizer Details</h2>
              <button onClick={() => setShowViewModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: selectedOrganizer.approvalStatus === 'pending' 
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                  : 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '2rem' }}>
                  {selectedOrganizer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{selectedOrganizer.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0.25rem 0' }}>{selectedOrganizer.designation}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <Mail size={18} color="#10b981" />
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Email</p>
                  <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: 0 }}>{selectedOrganizer.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <Phone size={18} color="#10b981" />
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Phone</p>
                  <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: 0 }}>{selectedOrganizer.phone}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <Building size={18} color="#10b981" />
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Department</p>
                  <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: 0 }}>{selectedOrganizer.department}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <Calendar size={18} color="#10b981" />
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Joined Date</p>
                  <p style={{ color: '#ffffff', fontSize: '0.9rem', margin: 0 }}>{selectedOrganizer.joinedDate}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <CheckCircle size={18} color={selectedOrganizer.status === 'active' ? '#10b981' : '#f59e0b'} />
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>Status</p>
                  <p style={{ color: selectedOrganizer.status === 'active' ? '#10b981' : '#f59e0b', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>
                    {selectedOrganizer.status.charAt(0).toUpperCase() + selectedOrganizer.status.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowViewModal(false)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '1.5rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Organizer Modal */}
      {showEditModal && selectedOrganizer && (
        <div style={modalOverlayStyle} onClick={() => setShowEditModal(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Edit Organizer</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Name</label>
                <input
                  type="text"
                  value={selectedOrganizer.name}
                  onChange={e => setSelectedOrganizer({...selectedOrganizer, name: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Email</label>
                <input
                  type="email"
                  value={selectedOrganizer.email}
                  onChange={e => setSelectedOrganizer({...selectedOrganizer, email: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Phone</label>
                <input
                  type="tel"
                  value={selectedOrganizer.phone}
                  onChange={e => setSelectedOrganizer({...selectedOrganizer, phone: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Department</label>
                <input
                  type="text"
                  value={selectedOrganizer.department}
                  onChange={e => setSelectedOrganizer({...selectedOrganizer, department: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>Designation</label>
                <input
                  type="text"
                  value={selectedOrganizer.designation}
                  onChange={e => setSelectedOrganizer({...selectedOrganizer, designation: e.target.value})}
                  style={inputStyle}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EnhancedOrganizersPage;
