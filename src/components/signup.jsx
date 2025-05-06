import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, data, navigate, longLink]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="mt-2 text-gray-300">
          Join Shortify to start shortening links
        </CardDescription>
        {error && <Error message={error?.message} className="mt-4" />}
      </CardHeader>

      <CardContent className="space-y-4 p-0">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            onChange={handleInputChange}
            className="w-full bg-gray-700/50 border-gray-600 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
          />
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleInputChange}
            className="w-full bg-gray-700/50 border-gray-600 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleInputChange}
            className="w-full bg-gray-700/50 border-gray-600 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
          />
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-2 pt-2">
          <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-300">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <input
              id="profile_pic"
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-600 file:text-white
                hover:file:bg-purple-700"
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>

      <CardFooter className="p-0 pt-6">
        <Button
          onClick={handleSignup}
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          {loading ? (
            <BeatLoader size={10} color="#fff" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              Create Account
            </span>
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default Signup;