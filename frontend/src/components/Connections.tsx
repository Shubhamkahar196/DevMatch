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
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="text-center mt-2">

      <h1 className="font-bold text-4xl tracking-tight mb-5">
        Connections
      </h1>

      {connections.map((connection: any) => {

        const {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about
        } = connection;

        return (
          <div
            key={connection._id}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-xl w-1/2 mx-auto mb-4"
          >
            <img
              alt="photo"
              className="w-20 h-20 rounded-full object-cover"
              src={photoUrl}
            />

            <div className="text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>

              <p>{age + ", " + gender}</p>

              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;