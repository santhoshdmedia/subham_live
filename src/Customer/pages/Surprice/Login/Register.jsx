import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer,toast } from "react-toastify";
import { motion } from 'framer-motion';
import {  Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./register.css"

const Register = () => {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: new Array(6).fill(""),
    showOtpField: false,
  });

  // Validation state
  const [validation, setValidation] = useState({
    password: {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      matchesConfirm: false,
    },
    isPasswordValid: false,
  });

  // UI state
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Refs
  const otpInputRefs = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Color scheme
  const colors = {
    primary: "#e2821a",
    primaryLight: "#f3b05a",
    primaryDark: "#c96f15",
    background: "#f8f5f0",
    text: "#333333",
    lightText: "#ffffff",
    success: "#4CAF50",
    error: "#F44336",
  };

  // Password validation rules
  const passwordRules = {
    minLength: { regex: /^.{8,}$/, message: "At least 8 characters" },
    hasUpperCase: { regex: /[A-Z]/, message: "1 uppercase letter" },
    hasLowerCase: { regex: /[a-z]/, message: "1 lowercase letter" },
    hasNumber: { regex: /[0-9]/, message: "1 number" },
    hasSpecialChar: {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "1 special character",
    },
  };

  // Validate password and update state
  const validatePassword = (password, confirmPassword) => {
    const newValidation = {
      password: {
        minLength: passwordRules.minLength.regex.test(password),
        hasUpperCase: passwordRules.hasUpperCase.regex.test(password),
        hasLowerCase: passwordRules.hasLowerCase.regex.test(password),
        hasNumber: passwordRules.hasNumber.regex.test(password),
        hasSpecialChar: passwordRules.hasSpecialChar.regex.test(password),
        matchesConfirm: password === confirmPassword && password !== "",
      },
      isPasswordValid: false,
    };

    // Check if all validations pass
    newValidation.isPasswordValid =
      Object.values(newValidation.password).every(Boolean);

    setValidation(newValidation);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "confirmPassword") {
      validatePassword(
        name === "password" ? value : form.password,
        name === "confirmPassword" ? value : form.confirmPassword
      );
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input changes
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    
    const newOtp = [...form.otp];
    newOtp[index] = value;
    setForm((prev) => ({ ...prev, otp: newOtp }));

    // Move focus to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  // Start the countdown timer
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(300);
    setCanResendOtp(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  // Send OTP function
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!validation.isPasswordValid) {
        toast.error("Please fix password validation errors before proceeding");
        return;
      }

      const response = await axios.post(
        "https://subham-backend-2.onrender.com/api/auth/send-mail-otp ",
        {
          phone: form.phone,
          email: form.email,
          name: form.name,
        }
      );

      setForm((prev) => ({ ...prev, showOtpField: true }));
      startTimer();
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify OTP and register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const otpValue = form.otp.join("");
      
      const response = await axios.post(
        "http://localhost:5058/api/auth/verify-mail-otp",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password:form.password,
          otp: otpValue,
        }
      );

      if (response.data.success) {
        setForm((prev) => ({
          ...prev,
          showOtpField: false,
          verificationStatus: "success",
          userData: response.data.user,
        }));
        
        stopTimer();
        toast.success(response.data.isNewUser ? "Registration successful!" : "Already Registered back!");
        navigate('/new-login')
      } else {
        toast.warn(`Verification failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.error || "An error occurred during verification");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP function
  const handleResendOtp = async () => {
    setIsSubmitting(true);
    try {
      await handleSendOtp({ preventDefault: () => {} });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      className="min-h-[100vh] flex items-center justify-center register_page"
      // style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md mx-4">
        {/* Card Header */}
        <div
          className="text-center py-6 px-4 rounded-t-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <h2 className="text-3xl font-bold" style={{ color: colors.lightText }}>
            Create Your Account
          </h2>
          <p className="mt-2" style={{ color: "#f3d9b8" }}>
            Join our community today
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-white p-6 rounded-b-lg shadow-lg">
          <form onSubmit={form.showOtpField ? handleSubmit : handleSendOtp}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
                  placeholder="Enter your name"
                  style={{
                    borderColor: colors.primaryLight,
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
                  placeholder="Enter your email"
                  style={{
                    borderColor: colors.primaryLight,
                  }}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0" style={{ borderColor: colors.primaryLight }}>
                    +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-r-lg border focus:outline-none transition-all"
                    placeholder="9876543210"
                    style={{
                      borderColor: colors.primaryLight,
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
                    placeholder="Enter password"
                    style={{
                      borderColor: colors.primaryLight,
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all"
                    placeholder="Confirm password"
                    style={{
                      borderColor: validation.password.matchesConfirm ? colors.success : colors.primaryLight,
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Validation Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(passwordRules).map(([key, rule]) => (
                  <div key={key} className="flex items-center">
                    <span style={{ color: validation.password[key] ? colors.success : colors.error }}>
                      {validation.password[key] ? "✓" : "✗"}
                    </span>
                    <span className="ml-1">{rule.message}</span>
                  </div>
                ))}
                <div className="flex items-center">
                  <span style={{ color: validation.password.matchesConfirm ? colors.success : colors.error }}>
                    {validation.password.matchesConfirm ? "✓" : "✗"}
                  </span>
                  <span className="ml-1">Passwords match</span>
                </div>
              </div>

              {/* OTP Field */}
              {form.showOtpField && (
                <div className="space-y-3">
                  <label htmlFor="otp" className="block text-sm font-medium" style={{ color: colors.text }}>
                    OTP Verification
                  </label>
                  <div className="flex space-x-3 justify-center">
                    {form.otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        className="w-12 h-12 text-center text-2xl border rounded-lg focus:outline-none"
                        style={{
                          borderColor: colors.primaryLight,
                        }}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className={`text-sm ${timeLeft > 0 ? "text-gray-500" : "text-red-500"}`}>
                      {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : "OTP expired"}
                    </span>
                    {canResendOtp && (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isSubmitting}
                        className="text-sm font-medium hover:underline"
                        style={{ color: colors.primary }}
                      >
                        {isSubmitting ? "Sending..." : "Resend OTP"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg font-medium transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.lightText,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {form.showOtpField ? "Verifying..." : "Sending OTP..."}
                    </>
                  ) : form.showOtpField ? (
                    "Verify & Register"
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: colors.text }}>
              Already have an account?{" "}
              <Link
                to={"/new-login"}
                className="font-medium hover:underline"
                style={{ color: colors.primary }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;



export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://subham-backend-2.onrender.com/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Store user data or token as needed
        localStorage.setItem('token', JSON.stringify(response.data.token));
        
        // Redirect to dashboard or home page
        navigate('/influencer-page');
        toast.success("login successful")
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4 login_page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-orange-500 py-6 px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-orange-100 mt-2"
            >
              Sign in to your account
            </motion.p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-right"
              >
                <a 
                  href="/forgot-password" 
                  className="text-sm text-orange-600 hover:underline"
                >
                  Forgot password?
                </a>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to={"/new-register"} 
                  className="text-orange-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};
