import { useSelector } from "react-redux";
import type { RootState } from "../utils/Store";

const Navbar = () => {
  const user = useSelector((store: RootState) => store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm px-6">
      
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevMatch</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>

          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;