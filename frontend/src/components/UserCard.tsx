import axios from "axios";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  age?: string | number;
  gender?: string;
  about?: string;
};

const UserCard = ({
  user,
}: {
  user?: User | null;
}) => {

  const safeUser = user ?? {};

  const _id =
    typeof safeUser._id === "string"
      ? safeUser._id
      : undefined;

  const dispatch = useDispatch();

  // Handle image fallback
  const imageSrc =
    typeof user?.photoUrl === "string" &&
    user.photoUrl.trim() !== ""
      ? user.photoUrl
      : null;

  const handleSendRequest = async (
    status: "PENDING",
    userId: string
  ) => {

    try {

      const res = await axios.post(
        BASE_URL + "/request/send/" + userId,
        { status },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      // Remove acted user from feed
      dispatch(removeFeed(userId));

    } catch (error: any) {

      console.log(error.message);

    }
  };

  return (
    <div className="card bg-gray-900 w-full max-w-sm sm:w-96 shadow-sm overflow-hidden rounded-3xl">

      {/* Image Section */}
      <figure className="h-64 w-full bg-gray-300 flex items-center justify-center overflow-hidden">

        {imageSrc ? (

          <img
            src={imageSrc}
            alt={`${user?.firstName || "User"}'s profile`}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="text-gray-400 font-medium">
            No Image Provided
          </div>

        )}

      </figure>

      {/* Card Body */}
      <div className="card-body p-6">

        {/* Name */}
        <h2 className="card-title text-xl font-bold text-gray-500">

          {user?.firstName} {user?.lastName}

        </h2>

        {/* About Section */}
        {user && (

          <div className="space-y-1">

            {/* Age + Gender */}
            {(user.age || user.gender) && (

              <p className="text-sm font-semibold text-gray-500">

                {user.age ? `${user.age} yrs` : ""}

                {user.age && user.gender ? ", " : ""}

                {user.gender}

              </p>

            )}

            {/* About */}
            <p className="text-sm text-gray-600 italic mt-1 break-words">

              {user.about ||
                "No bio description provided yet."}

            </p>

          </div>

        )}

        {/* Buttons */}
        <div className="card-actions justify-end mt-4 gap-2">

          {/* Ignore */}
          <button
            disabled={!_id}
            onClick={() =>
              _id && dispatch(removeFeed(_id))
            }
            className="btn btn-ghost border hover:bg-red-600 border-gray-300 rounded-full px-5 text-sm font-medium"
          >
            Ignore
          </button>

          {/* Interested */}
          <button
            disabled={!_id}
            onClick={() =>
              _id &&
              handleSendRequest("PENDING", _id)
            }
            className="btn btn-secondary hover:bg-blue-600 rounded-full px-5 text-sm font-medium"
          >
            Interested
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserCard;









// import axios from "axios";
// import BASE_URL from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { removeFeed } from "../utils/feedSlice";

// const UserCard = ({ user }: { user?: Record<string, unknown> | null }) => {
//   const safeUser = user ?? {};
//   const _id =
//     typeof (safeUser as { _id?: string })._id === "string"
//       ? (safeUser as { _id?: string })._id
//       : undefined;

//   const dispatch = useDispatch();

//   // Fix: If photoUrl is missing or an empty string, set it to null

//   const imageSrc =
//     typeof user?.photoUrl === "string" && user.photoUrl.trim() !== ""
//       ? user.photoUrl
//       : null;

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + userId,
//         { status },
//         {
//           withCredentials: true,
//         },
//       );

//       console.log(res.data);

//       dispatch(removeFeed(userId));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="card bg-gray-900  w-full max-w-sm sm:w-96 shadow-sm overflow-hidden rounded-3xl">
//       <figure className="h-64 w-full bg-gray-300 flex items-center justify-center overflow-hidden">
//         {imageSrc ? (
//           <img
//             src={imageSrc}
//             alt={`${user?.firstName || "User"}'s profile`}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="text-gray-400  font-medium">No Image Provided</div>
//         )}
//       </figure>

//       <div className="card-body p-6">
//         <h2 className="card-title text-xl font-bold text-gray-500">
//           {user?.firstName} {user?.lastName}
//         </h2>

//         {user && (
//           <div className="space-y-1">
//             {/* Show age/gender info only if at least one exists */}
//             {(user.age || user.gender) && (
//               <p className="text-sm font-semibold text-gray-500">
//                 {user.age ? `${user.age} yrs` : ""}
//                 {user.age && user.gender ? ", " : ""}
//                 {user.gender}
//               </p>
//             )}
//             <p className="text-sm text-gray-600 italic mt-1 wrap-break-word">
//               {user.about || "No bio description provided yet."}
//             </p>
//           </div>
//         )}

//         <div className="card-actions justify-end mt-4 gap-2">
//           <button
//             disabled={!_id}
//             onClick={() => _id && dispatch(removeFeed(_id))}
//             className="btn btn-ghost border hover:bg-red-600 border-gray-300 rounded-full px-5 text-sm font-medium"
//           >
//             Ignore
//           </button>

//           <button
//             disabled={!_id}
//             onClick={() => _id && handleSendRequest("PENDING", _id)}
//             className="btn btn-secondary hover:bg-blue-600 rounded-full px-5 text-sm font-medium"
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
