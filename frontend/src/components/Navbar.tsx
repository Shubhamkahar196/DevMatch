import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { removeUser } from "../utils/Slice";


const Navbar = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
       await axios.post(BASE_URL + "/auth/logout",{},{withCredentials:true});
       dispatch(removeUser());
       navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm px-6">
      
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevMatch</Link>
      </div>

      <div className="flex gap-4 items-center">

        {user && (
          <div className="dropdown dropdown-end">

            <div className="flex items-center gap-2">
              
              <p className="font-medium">
                Welcome {user.firstName}
              </p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>

            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li>
                <a onClick={handleLogout}>Logout</a>
                </li>
            </ul>

          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;