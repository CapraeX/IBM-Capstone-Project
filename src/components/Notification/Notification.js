import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const checkAppointment = () => {
            const lastAppointment = sessionStorage.getItem('lastAppointment');
            console.log('Last Appointment00000:', JSON.parse(lastAppointment));
            if (lastAppointment) {
                setAppointmentData(JSON.parse(lastAppointment)[0]);
                setShowNotification(true);
                // Clear notification from localStorage after showing it
                localStorage.removeItem('lastAppointment');
            }
        };

        // Check when component mounts
        checkAppointment();

        // Check every second
        const interval = setInterval(checkAppointment, 10000);

        // Clear interval when component unmounts
        return () => clearInterval(interval);
    }, []);


    if (!showNotification || !appointmentData) return null;

    return (
        <div className="notification-container">
            <div className="notification-card">

                <div className="notification-content">
                    <h3 className="notification-title">Appointment Details</h3>
                    <div className="notification-details">
                        <p><strong>Doctor:</strong> {appointmentData.doctorName}</p>
                        <p><strong>Specialty:</strong> {appointmentData.doctorSpeciality}</p>
                        <p><strong>Patient:</strong> {appointmentData.name}</p>
                        
                        <p><strong>Date:</strong> {appointmentData.selectedDate ? appointmentData.selectedDate : "Today"}</p>
                        <p><strong>Time:</strong> {appointmentData.selectedSlot ? appointmentData.selectedSlot : "Now"}</p>
                        <p><strong>Phone:</strong> {appointmentData.phoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;