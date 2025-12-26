import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User, Event, Registration } from '../types';

export const exportUsersToPDF = (users: User[], title: string = 'Users List') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setTextColor(16, 185, 129); // Emerald color
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
  
  // Prepare table data
  const tableData = users.map(user => [
    user.name,
    user.email,
    user.studentId,
    user.role,
    user.college || 'N/A',
    user.department || 'N/A',
    user.approvalStatus || 'approved'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Name', 'Email', 'Student ID', 'Role', 'College', 'Department', 'Status']],
    body: tableData,
    startY: 35,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129], // Emerald color
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: 35 }
  });
  
  // Save the PDF
  doc.save(`${title.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
};

export const exportEventRegistrationsToPDF = (
  event: Event,
  registrations: Registration[],
  users: User[]
) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setTextColor(16, 185, 129);
  doc.text('Event Registrations', 14, 20);
  
  // Add event details
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Event: ${event.title}`, 14, 30);
  doc.setFontSize(10);
  doc.text(`Date: ${event.date} | Location: ${event.location}`, 14, 36);
  doc.text(`Total Registrations: ${registrations.length}`, 14, 42);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 48);
  
  // Prepare table data
  const tableData = registrations.map((reg, index) => {
    const user = users.find(u => u.id === reg.userId);
    return [
      (index + 1).toString(),
      user?.name || 'Unknown',
      user?.email || 'N/A',
      user?.studentId || 'N/A',
      user?.college || 'N/A',
      new Date(reg.registeredAt).toLocaleDateString()
    ];
  });
  
  // Add table
  autoTable(doc, {
    head: [['#', 'Name', 'Email', 'Student ID', 'College', 'Registered On']],
    body: tableData,
    startY: 55,
    theme: 'grid',
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });
  
  // Save the PDF
  doc.save(`${event.title.replace(/\s+/g, '_')}_Registrations_${Date.now()}.pdf`);
};

export const exportOrganizersToPDF = (organizers: User[]) => {
  exportUsersToPDF(organizers, 'Organizers List');
};

export const exportStudentsToPDF = (students: User[]) => {
  exportUsersToPDF(students, 'Students List');
};
