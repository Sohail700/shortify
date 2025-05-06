import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut, User, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { UrlState } from "@/context";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  // Simple fallback for browsers that don't support backdrop-filter
  const supportsBackdrop =
    typeof CSS !== "undefined" && CSS.supports("backdrop-filter", "blur(10px)");

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Progress bar for loading state */}
        {loading && (
          <div className="h-1 w-full bg-purple-100 overflow-hidden">
            <div
              className="h-full bg-purple-600 animate-progress"
              style={{
                animation: "progress 2s linear infinite",
                backgroundImage:
                  "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #8B5CF6 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        )}

        {/* Main navigation */}
        <nav
          className={`py-3 px-4 sm:px-6 w-full flex justify-between items-center ${
            supportsBackdrop ? "bg-gray-900/90 backdrop-blur-sm" : "bg-gray-900"
          } border-b border-gray-700`}
        >
          {/* Logo/Link */}
          <Link
            to="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
            aria-label="Go to homepage"
          >
            <div className="flex items-center transition-transform hover:scale-105 active:scale-95">
              <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Shortify
              </span>
            </div>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!user ? (
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-2 rounded-md font-medium text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
              >
                Login / Signup
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="User menu"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.user_metadata?.profile_pic}
                        className="w-full h-full object-cover"
                        alt="User profile"
                      />
                      <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base">
                        {user?.user_metadata?.name?.charAt(0) || (
                          <User size={16} />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg"
                  align="end"
                >
                  <DropdownMenuLabel className="text-white px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium truncate">
                        {user?.user_metadata?.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
                    <Link
                      to="/dashboard"
                      className="flex items-center w-full text-gray-200 hover:text-white"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4 text-purple-400" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
                    <Link
                      to="/dashboard/links"
                      className="flex items-center w-full text-gray-200 hover:text-white"
                    >
                      <LinkIcon className="mr-2 h-4 w-4 text-purple-400" />
                      <span>My Links</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                    className="px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 focus:bg-gray-700 focus:text-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      </header>

      {/* Fallback styles for browsers that don't support CSS animations */}
      <style>{`
        @keyframes progress {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media not all and (min-resolution:.001dpcm) {
          /* Safari and older browsers fallbacks */
          nav {
            background: #111827 !important; /* solid fallback */
          }
          .animate-progress {
            animation: none;
            background: linear-gradient(90deg, #8B5CF6, #EC4899) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
