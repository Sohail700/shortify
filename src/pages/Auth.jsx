import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");
  const [oldBrowser, setOldBrowser] = useState(false);

  useEffect(() => {
    // Feature detection for older browsers
    const isOldBrowser = () => {
      try {
        return (
          !CSS.supports("display", "grid") ||
          !CSS.supports("backdrop-filter", "blur(10px)")
        );
      } catch (e) {
        return true;
      }
    };
    setOldBrowser(isOldBrowser());
  }, []);

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate, longLink]);

  return (
    <div className=" bg-gray-900 text-white font-sans">
      <div
        className={`min-h-screen w-full flex flex-col items-center justify-center px-4 ${
          oldBrowser
            ? "bg-gray-900"
            : "bg-gradient-to-b from-purple-900/30 to-gray-900"
        }`}
      >
        <div className="text-center mb-8">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold mb-4 ${
              oldBrowser
                ? "text-white"
                : "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            }`}
          >
            {searchParams.get("createNew")
              ? "Almost there!"
              : "Welcome to Shortify"}
          </h1>
          <p
            className={`text-lg ${
              oldBrowser ? "text-gray-300" : "text-gray-300/80"
            }`}
          >
            {searchParams.get("createNew")
              ? "Login or sign up to shorten your link"
              : "Join thousands shortening links daily"}
          </p>
        </div>

        <Tabs
          defaultValue="login"
          className={`w-full max-w-md ${
            oldBrowser ? "bg-gray-800" : "bg-gray-800/50 backdrop-blur-md"
          } rounded-xl shadow-xl overflow-hidden border ${
            oldBrowser ? "border-gray-700" : "border-purple-500/20"
          }`}
        >
          {/* Decorative header */}
          <div
            className={`h-1 ${
              oldBrowser
                ? "bg-purple-600"
                : "bg-gradient-to-r from-purple-600 to-pink-600"
            }`}
          ></div>

          <TabsList
            className={`grid w-full grid-cols-2 ${
              oldBrowser ? "bg-gray-800" : "bg-gray-800/50"
            } p-0`}
          >
            <TabsTrigger
              value="login"
              className={`py-4 ${
                oldBrowser
                  ? "data-[state=active]:bg-gray-700"
                  : "data-[state=active]:bg-gray-700/50"
              } transition-all text-white`}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={`py-4 ${
                oldBrowser
                  ? "data-[state=active]:bg-gray-700"
                  : "data-[state=active]:bg-gray-700/50"
              } transition-all text-white`}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="m-0 p-6">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="m-0 p-6">
            <Signup />
          </TabsContent>
        </Tabs>

        {/* Simple footer */}
        <footer className="fixed bottom-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Shortify. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Auth;
