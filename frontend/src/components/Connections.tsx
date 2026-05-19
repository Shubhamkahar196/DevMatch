import axios from "axios";
import BASE_URL from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import type { RootState } from "../utils/Store";

const Connections = () => {
  const connections = useSelector(
    (store: RootState) => store.connections
  );

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/request/connections",
        {
          withCredentials: true,
        }
      );

      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-base-content/60 bg-base-200 px-6 py-4 rounded-2xl shadow-sm">
          No Connections Found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">
          Connections
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          People you are connected with
        </p>
      </div>

      {/* Cards List Wrapper */}
      <div className="space-y-4">
        {connections.map((connection: any) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
          } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 border border-base-200 sm:border-none sm:bg-base-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-2xl mx-auto"
            >
              {/* Avatar Container */}
              <div className="avatar shrink-0">
                <div className="w-20 h-20 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img
                    alt={`${firstName}'s photo`}
                    className="object-cover"
                    src={photoUrl || "https://placeholder.co/150"}
                  />
                </div>
              </div>

              {/* Details Content */}
              <div className="text-center sm:text-left flex-1 min-w-0 w-full">
                <h2 className="font-bold text-xl truncate text-base-content">
                  {firstName + " " + lastName}
                </h2>
                
                {/* Visual Metadata Badges */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1 mb-2">
                  <span className="badge badge-sm badge-neutral capitalize">{gender}</span>
                  <span className="badge badge-sm badge-outline">{age} years old</span>
                </div>

                <p className="text-sm text-base-content/70 line-clamp-2 break-words">
                  {about || "No bio provided."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;