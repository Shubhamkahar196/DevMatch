import axios from "axios"
import BASE_URL from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requestSlice"
import type { RootState } from "../utils/Store"

const Requests = () => {
  const requests = useSelector((store: RootState) => store.requests)
  const dispatch = useDispatch()

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/", { withCredentials: true })
      console.log(res.data.data);
      dispatch(addRequest(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRequest();
  }, [])

  if (!requests) return null; 

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-base-content/60 bg-base-200 px-6 py-4 rounded-2xl shadow-sm">
          No Requests Found
        </h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">
          Requests
        </h1>
        <p className="text-sm text-base-content/60 mt-1">
          Manage your incoming connection requests
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((request: any) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
          } = request;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 border border-base-200 sm:border-none sm:bg-base-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-2xl mx-auto"
            >
              {/* Avatar Container */}
              <div className="avatar shrink-0">
                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1 mb-2">
                  <span className="badge badge-sm badge-neutral capitalize">{gender}</span>
                  <span className="badge badge-sm badge-outline">{age} years old</span>
                </div>
                <p className="text-sm text-base-content/70 line-clamp-2 break-words">
                  {about || "No bio provided."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 w-full sm:w-auto justify-center pt-2 sm:pt-0 border-t border-base-200 sm:border-none">
                <button className="btn btn-error btn-sm sm:btn-md flex-1 sm:flex-initial sm:w-28 rounded-xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Reject
                </button>
                <button className="btn btn-primary btn-sm sm:btn-md flex-1 sm:flex-initial sm:w-28 rounded-xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;