'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FiEye, FiEyeOff, FiCheck, FiX, FiUser, FiMail, FiLock, FiStar, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { registerapi } from '@/api/auth';
import { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import Footer from '@/components/Footer';

const SignupPage: React.FC = () => {
  const router = useRouter();

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation state
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null);
  const [lastNameValid, setLastNameValid] = useState<boolean | null>(null);
  const [dateOfBirthValid, setDateOfBirthValid] = useState<boolean | null>(null);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  // Terms checkboxes
  const [agreedToTerms, setAgreedToSubscription] = useState(false);
  const [agreedToPrivacy, setAgreedToProfitShare] = useState(false);
  const [agreedTorisk, setAgreedrisk] = useState(false);

  // Referral from URL
  useEffect(() => {
    const refParam = new URLSearchParams(window.location.search).get('ref');
    if (refParam) setReferralCode(refParam);
  }, []);

  // Validations
  useEffect(() => {
    setUsernameValid(username.length === 0 ? null : /^[a-zA-Z0-9_]{3,20}$/.test(username));
  }, [username]);

  useEffect(() => {
    setEmailValid(email.length === 0 ? null : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  useEffect(() => {
    setFirstNameValid(firstName.length === 0 ? null : /^[a-zA-Z]{2,50}$/.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setLastNameValid(lastName.length === 0 ? null : /^[a-zA-Z]{2,50}$/.test(lastName));
  }, [lastName]);

  useEffect(() => {
    if (dateOfBirth.length === 0) {
      setDateOfBirthValid(null);
      return;
    }

    const selectedDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    setDateOfBirthValid(actualAge >= 18 && actualAge <= 120 && selectedDate < today);
  }, [dateOfBirth]);

  useEffect(() => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  }, [password]);

  const ValidationIndicator = useMemo(
    () => ({ isValid }: { isValid: boolean | null }) => {
      if (isValid === null) return null;
      return isValid ? <FiCheck className="w-5 h-5 text-green-400" /> : <FiX className="w-5 h-5 text-red-400" />;
    },
    []
  );

  const isFormValid = useMemo(
    () =>
      usernameValid &&
      emailValid &&
      firstNameValid &&
      lastNameValid &&
      dateOfBirthValid &&
      Object.values(passwordValidations).every((v) => v) &&
      agreedToTerms &&
      agreedToPrivacy &&
      agreedTorisk,
    [usernameValid, emailValid, firstNameValid, lastNameValid, dateOfBirthValid, passwordValidations, agreedToTerms, agreedToPrivacy, agreedTorisk]
  );

  const validateForm = useCallback(() => {
    if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
      toast.error('All fields are required');
      return false;
    }
    if (!usernameValid) {
      toast.error('Invalid username');
      return false;
    }
    if (!emailValid) {
      toast.error('Invalid email');
      return false;
    }
    if (!firstNameValid) {
      toast.error('Invalid first name');
      return false;
    }
    if (!lastNameValid) {
      toast.error('Invalid last name');
      return false;
    }
    if (!dateOfBirthValid) {
      toast.error('Invalid date of birth. You must be at least 18 years old');
      return false;
    }
    if (!Object.values(passwordValidations).every((v) => v)) {
      toast.error('Password does not meet requirements');
      return false;
    }
    if (!agreedToTerms || !agreedToPrivacy || !agreedTorisk) {
      toast.error('You must agree to all terms');
      return false;
    }
    if (referralCode && referralCode.length > 8) {
      toast.error('Referral code must be less than or equal to 8 characters');
      return false;
    }
    return true;
  }, [username, email, password, firstName, lastName, dateOfBirth, usernameValid, emailValid, firstNameValid, lastNameValid, dateOfBirthValid, passwordValidations, agreedToTerms, agreedToPrivacy, agreedTorisk, referralCode]);

  const registerUser = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      referral_code: referralCode,
      agreed_to_terms: agreedToTerms,
      agreed_to_privacy: agreedToPrivacy,
      agreed_to_risk_disclosure: agreedTorisk,
    }
    try {
      const res = await registerapi(payload);

      if (res.status !== 201) throw new Error(res.data.message || 'Registration failed');

      toast.success('Account created successfully!');
      router.replace('/login');
    } catch (err: any) {
      console.error("Axios error:", err);

      if (err.response) {
        const data = err.response.data;

        if (data?.detail) {
          toast.error(data.detail);
        } else if (data?.non_field_errors) {
          toast.error(data.non_field_errors.join(", "));
        } else if (typeof data === "object") {
          const messages: string[] = [];
          for (const key in data) {
            if (Array.isArray(data[key])) {
              messages.push(...data[key]);
            } else if (typeof data[key] === "string") {
              messages.push(data[key]);
            }
          }
          if (messages.length > 0) {
            toast.error(messages.join(" | "));
          } else {
            toast.error("An error occurred. Please try again.");
          }
        } else {
          toast.error(data?.message || "Request failed");
        }
      } else if (err.request) {
        toast.error("Network error - please try again");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [username, email, password, firstName, lastName, dateOfBirth, referralCode, agreedToTerms, agreedToPrivacy, agreedTorisk, validateForm, router]);

  const maxDate = useMemo(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }, []);

  const minDate = useMemo(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 120);
    return today.toISOString().split('T')[0];
  }, []);

  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center py-10 px-4 text-primary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-background backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-cyan-700/50"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Join Namaio</h2>
            {/* <p className="text-secondary">Start your automated trading journey</p> */}
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Two Column Grid for larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className={`w-full pl-12 pr-12 py-3  border rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 transition ${firstNameValid === null ? 'border-gray-600 focus:ring-blue-500' : firstNameValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <ValidationIndicator isValid={firstNameValid} />
                    </div>
                  </div>
                  {firstName.length > 0 && !firstNameValid && <p className="mt-2 text-sm text-red-400">2-50 letters only, no spaces or numbers</p>}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      className={`w-full pl-12 pr-12 py-3  border rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 transition ${usernameValid === null ? 'border-gray-600 focus:ring-blue-500' : usernameValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <ValidationIndicator isValid={usernameValid} />
                    </div>
                  </div>
                  {username.length > 0 && !usernameValid && <p className="mt-2 text-sm text-red-400">3-20 characters, letters, numbers, underscores only</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Date of Birth</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-primary" />
                    </div>

                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      min={minDate}
                      max={maxDate}
                      className={`w-full pl-12 pr-12 py-3  border rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 transition ${dateOfBirthValid === null ? 'border-gray-600 focus:ring-blue-500' : dateOfBirthValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <ValidationIndicator isValid={dateOfBirthValid} />
                    </div>
                  </div>
                  {dateOfBirth.length > 0 && !dateOfBirthValid && <p className="mt-2 text-sm text-red-400">You must be at least 18 years old</p>}
                </div>

                {/* Referral */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Referral Code (optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiStar className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code"
                      className="w-full pl-12 py-3  border border-gray-600 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                  </div>
                  {referralCode && (
                    <div className={`mt-2 flex items-center gap-2 ${referralCode.length <= 8 ? "text-green-400" : "text-red-400"}`}>
                      {referralCode.length <= 8 ? (
                        <></>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FiX className="w-3 h-3" />
                          <span className="text-sm">Must be less than or eqaul to 8 characters</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className={`w-full pl-12 pr-12 py-3  border rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 transition ${lastNameValid === null ? 'border-gray-600 focus:ring-blue-500' : lastNameValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <ValidationIndicator isValid={lastNameValid} />
                    </div>
                  </div>
                  {lastName.length > 0 && !lastNameValid && <p className="mt-2 text-sm text-red-400">2-50 letters only, no spaces or numbers</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-12 py-3  border rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 transition ${emailValid === null ? 'border-gray-600 focus:ring-blue-500' : emailValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500'
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <ValidationIndicator isValid={emailValid} />
                    </div>
                  </div>
                  {email.length > 0 && !emailValid && <p className="mt-2 text-sm text-red-400">Enter a valid email address</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-12 py-3  border border-gray-600 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-3  rounded-lg p-4 space-y-2 text-xs">
                      <div className={`flex items-center gap-2 ${passwordValidations.length ? 'text-green-400' : 'text-red-400'}`}>
                        {passwordValidations.length ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} 8+ characters
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidations.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                        {passwordValidations.uppercase ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Uppercase letter
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidations.number ? 'text-green-400' : 'text-red-400'}`}>
                        {passwordValidations.number ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Number
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidations.symbol ? 'text-green-400' : 'text-red-400'}`}>
                        {passwordValidations.symbol ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />} Special symbol
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Terms Checkboxes - Full Width */}
            <div className="space-y-4 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToSubscription(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                  id="subscription-checkbox"
                />
                <label htmlFor="subscription-checkbox" className="flex items-center text-sm text-primary cursor-pointer">
                  I agree to the{' '}
                  <Link href={"/terms-and-conditions"}>
                    <span className="ml-1 underline text-secondary hover:text-blue-500">
                      Terms And Conditions
                    </span>
                  </Link>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToProfitShare(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                  id="profit-checkbox"
                />
                <label htmlFor="profit-checkbox" className="flex items-center text-sm text-primary cursor-pointer">
                  I agree to the{' '}
                  <Link href={"/privacy-policy"}>
                    <span className="ml-1 underline text-secondary hover:text-blue-500">
                      Privacy Policy
                    </span>
                  </Link>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreedTorisk}
                  onChange={(e) => setAgreedrisk(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                  id="risk-checkbox"
                />
                <label htmlFor="risk-checkbox" className="flex items-center text-sm text-primary cursor-pointer">
                  I agree to the{' '}
                  <Link href={"/risk-disclosure"}>
                    <span className="ml-1 underline text-secondary hover:text-blue-500">
                      Risk Disclosure
                    </span>
                  </Link>
                </label>
              </div>
            </div>

            {/* Register Button - Full Width */}
            <button
              type="button"
              disabled={loading || !isFormValid}
              onClick={registerUser}
              className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${loading || !isFormValid
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:scale-105'
                }`}
            >
              {loading ? 'Loading...' : 'Register'}
              <FiArrowRight className="w-5 h-5" />
            </button>

            <div className="text-center pt-4 border-t border-gray-700/50">
              <p className="text-primary">
                Already have an account?{' '}
                <Link href="/login" className="text-secondary hover:text-blue-400 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default SignupPage;