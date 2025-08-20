import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  CheckCircle,
  AlertCircle,
  Building,
  Loader,
} from "lucide-react";
import {
  validateEmail,
  validatePassword,
  validateAvatar,
} from "../../utils/helper";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  /* Handle input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    /* Clear error when user starts typing */
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));

    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, avatar: file }));
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormState((prev) => ({
        ...prev,
        avatarPreview: e.target.result,
        errors: { ...prev.errors, avatar: "" },
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please select a role" : "",
      avatar: "",
    };

    /* Remove empty errors */
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    setFormState((prev) => ({ ...prev, errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      /* Api */
    } catch (error) {
      console.log("error", error);

      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Registration failed. Please try again",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg"
        >
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Account Created!
          </h2>
          <p className="mb-4 text-gray-600">
            Welcome to JobPortal! Your account has been successfully created.
          </p>
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">
            Redirecting to your dashboard ...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="text-ray-600 text-sm">
            Join thousands of professionals finding their dream jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border py-3 pl-10 pr-4 ${formState.errors.fullName ? "border-red-500" : "border-gray-300"} transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your full name"
              />
            </div>
            {formState.errors.fullName && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-lg border py-3 pl-10 pr-4 ${formState.errors.fullName ? "border-red-500" : "border-gray-300"} transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter you email"
              />
            </div>
            {formState.errors.email && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                onChange={handleInputChange}
                className={`w-full rounded-lg border py-3 pl-10 pr-12 ${
                  formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                placeholder="Create a strong password"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              >
                {formState.showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Photo</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5mb</p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formState.errors.avatar}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`rounded-lg border-2 p-4 transition-all ${
                  formData.role === "jobseeker"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <UserCheck className="mx-auto mb-2 h-8 w-8" />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">
                  Looking for opportunities
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`rounded-lg border-2 p-4 transition-all ${
                  formData.role === "employer"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building className="mx-auto mb-2 h-8 w-8" />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Hiring talent</div>
              </button>
            </div>
            {formState.errors.role && (
              <p className="mt-2 flex items-center text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {formState.errors.role}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {formState.errors.submit && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="flex items-center text-sm text-red-700">
                <AlertCircle className="mr-2 h-4 w-4" />
                {formState.errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formState.loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Creating Account ...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
