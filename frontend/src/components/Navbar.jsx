import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          TaskManager Pro
        </Link>

        <button
          type="button"
          onClick={handleToggle}
          className="rounded-md border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 sm:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
          {isAuthenticated ? (
            <>
              <span className="text-slate-600">Hi, {user?.name}</span>
              <Link
                to="/dashboard"
                className="rounded-md px-3 py-1.5 text-slate-700 transition hover:bg-slate-100"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-white transition hover:bg-emerald-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-1.5 text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-emerald-600 px-3 py-1.5 text-white transition hover:bg-emerald-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white sm:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 text-sm font-medium">
            {isAuthenticated ? (
              <>
                <span className="text-slate-600">Hi, {user?.name}</span>
                <Link
                  to="/dashboard"
                  onClick={handleClose}
                  className="rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                  className="rounded-md bg-emerald-600 px-3 py-2 text-left text-white transition hover:bg-emerald-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleClose}
                  className="rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleClose}
                  className="rounded-md bg-emerald-600 px-3 py-2 text-white transition hover:bg-emerald-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
