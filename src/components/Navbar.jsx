import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-[#0b1220] via-[#111827] to-[#0b1220] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] px-6 backdrop-blur-md border-b border-white/10">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-extrabold tracking-wide text-red-400 hover:text-yellow-400 transition-all duration-300 hover:scale-[1.03]"
        >
          👩‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none flex items-center gap-4">
          <div className="hidden sm:block text-sm font-medium text-gray-300">
            Welcome,
            <span className="ml-1 text-yellow-400 font-semibold">
              {user.firstName}
            </span>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 rounded-full ring-2 ring-red-400 ring-offset-2 ring-offset-[#0b1220] hover:ring-yellow-400 transition-all">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 w-52 rounded-xl p-2 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-gray-200"
            >
              <li>
                <Link
                  to="/profile"
                  className="rounded-lg hover:bg-red-500/10 hover:text-yellow-400 transition"
                >
                  👤 Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="rounded-lg hover:bg-red-500/10 hover:text-yellow-400 transition"
                >
                  🔗 Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/request"
                  className="rounded-lg hover:bg-red-500/10 hover:text-yellow-400 transition"
                >
                  📩 Requests
                </Link>
              </li>


              <div className="divider my-1 opacity-20"></div>

              <li>
                <a
                  onClick={handleLogout}
                  className="rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
                >
                  🚪 Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
