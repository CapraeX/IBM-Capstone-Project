import React, { useState } from 'react';

const GiveReviews = ({ appointmentId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;

    if (!name || !review || rating <= 0) {
      setShowWarning(true);
      return;
    }

    // Formatear el review
    const feedback = { name, review, rating };

    // Guardar el review en el sessionStorage
    let reviews = JSON.parse(sessionStorage.getItem('reviews')) || [];
    reviews.push(feedback);
    sessionStorage.setItem('reviews', JSON.stringify(reviews));

    // Llamar a la función onSubmit proporcionada
    onSubmit(feedback);

    // Limpiar el formulario
    setFormData({ name: '', review: '', rating: 0 });
    setShowWarning(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Give Your Feedback</h2>
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default GiveReviews;