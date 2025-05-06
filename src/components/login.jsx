import { Input } from "./ui/input";
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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./error";
import { login } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

const Login = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, data, fetchUser, navigate, longLink]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="mt-2 text-gray-300">
          Sign in to access your dashboard
        </CardDescription>
        {error && <Error message={error.message} className="mt-4" />}
      </CardHeader>

      <CardContent className="space-y-4 p-0">
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

        <div className="flex justify-end pt-2">
          <button 
            type="button" 
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>
      </CardContent>

      <CardFooter className="p-0 pt-6">
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          {loading ? (
            <BeatLoader size={10} color="#fff" />
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign In
            </span>
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default Login;