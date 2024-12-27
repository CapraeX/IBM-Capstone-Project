import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import GiveReviews from './NewReview';

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  useEffect(() => {
    // Obtener los datos de 'lastAppointment' del sessionStorage
    const lastAppointment = sessionStorage.getItem('lastAppointment');
    if (lastAppointment) {
      setAppointments(JSON.parse(lastAppointment));
    }

    // Obtener los datos de 'reviews' del sessionStorage
    const reviews = sessionStorage.getItem('reviews');
    if (reviews) {
      setFeedbacks(JSON.parse(reviews));
    }
  }, []);

  const handleFeedbackChange = (appointmentId, feedback) => {
    const updatedFeedbacks = { ...feedbacks, [appointmentId]: feedback };
    setFeedbacks(updatedFeedbacks);
    sessionStorage.setItem('reviews', JSON.stringify(updatedFeedbacks));
  };

  const handleProvideFeedback = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setShowReviewForm(true);
  };

  const handleCloseModal = () => {
    setShowReviewForm(false);
  };

  return (
    <div className="review-form">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.doctorSpeciality}</td>
              <td>
                <button onClick={() => handleProvideFeedback(index)}>
                  Click Here
                </button>
              </td>
              <td>
                {feedbacks[index] && (
                  <div>
                    <p><strong>{feedbacks[index].name}:</strong> {feedbacks[index].review}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showReviewForm && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <GiveReviews
              appointmentId={currentAppointmentId}
              onSubmit={(feedback) => {
                handleFeedbackChange(currentAppointmentId, feedback);
                setShowReviewForm(false);
              }}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;