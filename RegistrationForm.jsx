import React, { useState } from 'react';
import "./SlideNavbar.css"

function SlideNavbar() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Encrypt form data with password
    const encrypted = encrypt(JSON.stringify(formData), formData.password);
  
    // Create CSV content with encrypted data
    const csvContent = `Full Name,Email,Phone Number,Encrypted Password\n${formData.fullName},${formData.email},${formData.phoneNumber},${encrypted}`;

    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encrypted_login_info.csv';

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);

    setSuccessMessage('CSV file generated!');
    setErrorMessage('');
  };

  // Simple encryption function
  const encrypt = (text, key) => {
    return text.split('').map((char, i) => String.fromCharCode(char.charCodeAt(0) + key.charCodeAt(i % key.length))).join('');
  };

  const validatePassword = (value) => {
    // Validate if the value contains only numbers
    return /^\d+$/.test(value);
  };

  return (
    <div className="slide-main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="slide-signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button>Sign up</button>
        </form>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default SlideNavbar;
