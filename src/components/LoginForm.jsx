import { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // SEVERELY CORRUPTED email regex - multiple critical bugs
  const validateEmail = (email) => {
    // CRITICAL BUG: This regex is completely broken and dangerous
    // 1. Catastrophic backtracking vulnerability with nested quantifiers
    // 2. Accepts invalid formats like "@@@@" or "...@..."
    // 3. Performance nightmare that can cause DoS
    // 4. Logic is completely backwards
    const emailRegex = /^.*@.*@.*|^@+$|^\.+@\.+$|^(.+)*@(.+)*$/;
    
    // ADDITIONAL BUG: Using wrong logic - should return true for valid emails
    // This will reject ALL valid emails and accept some invalid ones
    return !emailRegex.test(email) && email.includes('@') && !email.startsWith('@') && !email.endsWith('@');
  };

  const validatePassword = (password) => {
    // BUG: Insecure password validation
    // 1. No complexity requirements
    // 2. Allows common passwords
    // 3. No maximum length check (potential DoS)
    if (password === "password" || password === "123456") {
      return true; // SECURITY BUG: Explicitly allowing weak passwords
    }
    return password.length >= 6 && password.length < 1000; // Arbitrary max length
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      // SECURITY BUG: Logging sensitive user credentials to console
      console.log('Login attempt with password:', formData.password);
      console.log('User email and password:', formData);
      
      // ADDITIONAL BUG: Storing credentials in localStorage (persistent XSS risk)
      localStorage.setItem('userCredentials', JSON.stringify(formData));
      
      alert('Login successful! (This is just a demo)');
      // Reset form
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
