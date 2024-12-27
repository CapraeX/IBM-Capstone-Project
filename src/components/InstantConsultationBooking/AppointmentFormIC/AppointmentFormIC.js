import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      // Create appointment data for notification
      const appointmentData = {
        doctorName,
        doctorSpeciality,
        name,
        phoneNumber,
        review:''
      };

      // Verificar si el elemento 'lastAppointment' existe en sessionStorage
      let lastAppointment = sessionStorage.getItem('lastAppointment');

      if (lastAppointment) {
        // Si existe, convertirlo a un array (si no lo es) y añadirle appointmentData
        lastAppointment = JSON.parse(lastAppointment);
        if (!Array.isArray(lastAppointment)) {
          lastAppointment = [lastAppointment];
        }
        lastAppointment.push(appointmentData);
      } else {
        // Si no existe, crear el elemento 'lastAppointment' con el valor de appointmentData
        lastAppointment = [appointmentData];
      }

      // Guardar el array actualizado en sessionStorage
      sessionStorage.setItem('lastAppointment', JSON.stringify(lastAppointment));
      console.log('Appointment Data:', lastAppointment);

      onSubmit({ name, phoneNumber });
      setName('');
      setPhoneNumber('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC
