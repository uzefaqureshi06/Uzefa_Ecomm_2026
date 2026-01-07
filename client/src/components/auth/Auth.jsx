import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UploadCloud } from "lucide-react";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { signin, userSignUp } from "../../redux/actions/auth";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const fileInputRef = useRef(null);
  const [state, setState] = useState({
    isSignup: false,
    step: 1,
    showPassword: false,
    user: null,
    errors: {}, // ✅ NEW
    formData: {
      avatar: "",
      fname: "",
      lname: "",
      number: "",
      email: "",
      password: "",
      country: "",
      state: "",
      city: "",
      pinCode: "",
      address1: "",
      address2: "",
    },
  });

  const { isSignup, step, showPassword, user, formData, errors } = state;

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      errors: { ...prev.errors, [name]: "" }, // ✅ clear error on change
    }));
  };
  const handleAvatarFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setState((p) => ({
        ...p,
        errors: { ...p.errors, avatar: "Only image files allowed" },
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setState((p) => ({
        ...p,
        formData: { ...p.formData, avatar: reader.result },
        errors: { ...p.errors, avatar: "" },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleAvatarFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e) => {
    handleAvatarFile(e.target.files[0]);
  };

  // 🔐 Step-wise validation with errors
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.avatar) newErrors.avatar = "Avatar is required";
      if (!formData.fname) newErrors.fname = "First name is required";
      if (!formData.lname) newErrors.lname = "Last name is required";
      if (!formData.number) newErrors.number = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.state) newErrors.state = "State is required";
    }

    if (step === 3) {
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.pinCode) newErrors.pinCode = "Pin code is required";
      if (!formData.address1) newErrors.address1 = "Address line 1 is required";
    }

    setState((prev) => ({ ...prev, errors: newErrors }));

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setState((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => setState((prev) => ({ ...prev, step: prev.step - 1 }));

  const toggleAuth = () =>
    setState((prev) => ({
      ...prev,
      isSignup: !prev.isSignup,
      step: 1,
      errors: {},
    }));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isSignup && step < 3) {
      e.preventDefault();
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await dispatch(userSignUp(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3000);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(signin(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        e.preventDefault();

        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (isSignup && !validateStep()) return;

    setState((prev) => ({ ...prev, user: prev.formData }));
    console.log("Auth Data:", formData);
  };

  // 🔹 Helper for rendering error text
  const ErrorText = ({ name }) =>
    errors[name] ? <p className="error-text">{errors[name]}</p> : null;

  const renderSignupFields = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div
              className="avatar-dropzone flex items-center justify-center flex-col"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
            >
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="avatar"
                  className="avatar-preview"
                />
              ) : (
                <>
                  <UploadCloud className="text-[#d4af37]" size={40} />
                  <p>Drag & drop or click to upload avatar</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>
            <ErrorText name="avatar" />

            <input
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
            />
            <ErrorText name="fname" />

            <input
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
            />
            <ErrorText name="lname" />

            <input
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
            />
            <ErrorText name="number" />
          </>
        );

      case 2:
        return (
          <>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <ErrorText name="email" />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={() =>
                  setState((p) => ({ ...p, showPassword: !p.showPassword }))
                }
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
            </div>
            <ErrorText name="password" />

            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
            <ErrorText name="country" />

            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <ErrorText name="state" />
          </>
        );

      case 3:
        return (
          <>
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <ErrorText name="city" />

            <input
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
            />
            <ErrorText name="pinCode" />

            <input
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleChange}
            />
            <ErrorText name="address1" />

            <input
              name="address2"
              placeholder="Address Line 2"
              value={formData.address2}
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isSignup ? `Sign Up (Step ${step}/3)` : "Sign In"}</h2>

        <form onSubmit={onFormSubmit} onKeyDown={handleKeyDown}>
          {!isSignup ? (
            <>
              <input name="email" placeholder="Email" onChange={handleChange} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button onClick={(e) => handleSignIn(e)} className="primary-btn">
                Sign In
              </button>
            </>
          ) : (
            <>
              {renderSignupFields()}

              <div className="btn-group">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="secondary-btn"
                  >
                    Prev
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-btn"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleSignUp(e)}
                    className="primary-btn"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </>
          )}
        </form>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={toggleAuth}>{isSignup ? " Sign In" : " Sign Up"}</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
