import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {


  return (
    <div>
      <main className="min-h-screen ">
        <Header />
        <Outlet />
      </main>

      {/* Footer - Simple and clean */}
      <footer
        className={`py-8 px-4 sm:px-6 lg:px-8 bg-black  border-t border-gray-700`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-purple-400">Shortify</span>
            <p className="text-gray-400 mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
