import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate(); // Use navigate to handle programmatic redirects

  const navigationItems = [
    {
      linkName: "Profile",
      href: "/profile",
    },
    {
      linkName: "Logout",
      href: "/logout",
    },
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleKeyDown = (e) => {
    if (isOpen) {
      e.preventDefault(); // Only prevent default on key events
      switch (e.key) {
        case "ArrowDown":
          setCurrentItem((prevItem) =>
            prevItem === navigationItems.length - 1 ? 0 : prevItem + 1
          );
          break;
        case "ArrowUp":
          setCurrentItem((prevItem) =>
            prevItem === 0 ? navigationItems.length - 1 : prevItem - 1
          );
          break;
        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  // const handleLinkClick = (href) => {
  //   // Close the dropdown and navigate to the clicked route
  //   setIsOpen(false);
  //   navigate(href); // Use navigate to programmatically redirect
  // };

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const profileHandler = async () => {
    setIsOpen(false);
    navigate("/profile");
  };

  return (
    <header className="relative z-20 w-full bg-white shadow-lg">
      <div className="mx-auto max-w-full px-6">
        <nav aria-label="main navigation" className="flex justify-between">
          {/* Brand logo */}
          <Link
            to="/"
            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
          >
            MERN Auth
          </Link>

          {!userInfo && (
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
        ${
          isToggleOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
            : ""
        }
      `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
          )}

          {!userInfo && (
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 ml-auto md:mr-8 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  to="/login"
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  onClick={() => setIsToggleOpen(false)}
                >
                  <span>Sign in</span>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link
                  to="/register"
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4  transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  onClick={() => setIsToggleOpen(false)}
                >
                  <span>Sign Up</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Dropdown for Authenticated Users */}
          {userInfo && (
            <div className="ml-auto flex items-center">
              <div className="relative" ref={wrapperRef}>
                <button
                  className="flex items-center gap-2 bg-emerald-500 text-white rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen ? "true" : "false"}
                >
                  {/* <img
                    src="https://i.pravatar.cc/40?img=35"
                    alt="user name"
                    className="rounded-full border-2"
                  /> */}
                  <p className="p-1">{userInfo.name}</p>
                </button>

                <ul
                  className={`${
                    isOpen ? "block" : "hidden"
                  } absolute right-0 mt-2 w-48 bg-white shadow-lg`}
                >
                  <li>
                    <button
                      className="w-full text-left p-2 hover:bg-emerald-50"
                      onClick={profileHandler}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-left p-2 hover:bg-emerald-50"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
