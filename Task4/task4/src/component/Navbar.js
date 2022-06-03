import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  const navItem = (
    <>
      <li>
        <Link to="/add">Add Station</Link>
      </li>
      <li>
        <Link to="/manageStations">Manage Stations</Link>
      </li>
      {
        <li>
          {user ? (
            <div className="flex items-center">
              <button
                className="font-bold bg-primary btn btn-sm "
                onClick={logout}
              >
                SignOut
              </button>
              <p className="text-xs ">
                {user?.displayName?.slice(0, 8) || "as"}
              </p>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      }
    </>
  );
  return (
    <div class="navbar bg-base-100 container mx-auto max-w-7xl">
      <div class="navbar-start">
        <Link class="btn btn-ghost normal-case text-xl" to={"/"}>
          Radio
        </Link>
      </div>

      <div class="navbar-end">
        <div class="dropdown dropdown-left">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">{navItem}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
