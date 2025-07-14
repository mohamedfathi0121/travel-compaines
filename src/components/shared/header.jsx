import React, { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth(); // Assuming you have a useAuth hook to get user info

  return (
    <header className="w-full  bg-background shadow-md z-50 relative border-b border-gray-300">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-text-primary whitespace-nowrap"
        >
          AdventureCo
        </Link>
        <ul className="flex w-100 justify-start gap-4 hidden md:flex space-x-6 ml-6 text-sm font-medium text-text-primary">
          <li>
            <Link to={"/"} className="hover:text-blue-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to={"/login"} className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"} className="hover:text-blue-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to={"/profile"} className="hover:text-blue-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/trips"} className="hover:text-blue-600">
                  My Trips{" "}
                </Link>
              </li>
            </>
          )}
        </ul>



          <div className="hidden md:flex">
            {user && (
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-button-primary hover:bg-button-primary-hover shadow-text-secondary hover:shadow-sm text-button-text font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
          <div className="hidden md:flex">
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? (
              <FiX className="w-6 h-6 text-text-primary" />
            ) : (
              <FiMenu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3 text-sm font-medium text-text-primary">
          <a href="#" className="hover:text-text-primary">
            Explore
          </a>
          <a href="#" className="hover:text-text-primary">
            Create
          </a>
          <a href="#" className="hover:text-text-primary">
            About
          </a>
          <ThemeSwitcher />
        </div>
      )}
    </header>
  );
}
