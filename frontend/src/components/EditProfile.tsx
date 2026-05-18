
import { useState } from "react";
import UserCard from "./UserCard";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slice";
import BASE_URL from "../utils/constant";

const PRIMARY_COLOR = "bg-[#6C5CE7]"; // A vibrant purple
const PRIMARY_TEXT_COLOR = "text-[#6C5CE7]";
const SECONDARY_TEXT_COLOR = "text-[#A29BFE]"; // Lighter purple for subtler text
const INPUT_BORDER_COLOR = "border-[#D1D5DB]"; // Standard grey border
const HOVER_COLOR = "hover:bg-[#5A4BCF]"; // Darker purple hover state

const EditProfile = ({ user }) => {
  const [FirstName, setFirstName] = useState(user?.firstName || "");

  const [LastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [error, setError] = useState("");

  const [showToast,setShowToast] = useState(false);
  const dispatch = useDispatch()

  // const saveProfile = async()=>{
  //   try {
  //     const res = await axios.put(BASE_URL + "/user/edit-profile",{
  //         firstName: FirstName,
  //             lastName: LastName,
  //             photoUrl,
  //             age,
  //             gender,
  //             about
  //     },{withCredentials: true})
  //    dispatch(addUser(res.data?.data || res.data));
      
  //     setShowToast(true);
  //     setTimeout(() => {
  //       setShowToast(false);
  //     }, 3000);

  const saveProfile = async () => {
  setError("");
  console.log("Profile save button click")
  try {
    const res = await axios.put(
      BASE_URL + "/user/edit-profile",
      {
        firstName: FirstName,
        lastName: LastName,
        photoUrl,
        age,
        gender,
        about
      },
      { withCredentials: true }
    );
    

    const updatedData = res.data?.data || res.data;

    
    dispatch(addUser({
      ...user,        // Keep existing fields (like photoUrl, id, etc.)
      ...updatedData 
    }));
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Something went wrong");
  }
};
    

  return (
    <>
    <div className="min-h-screen w-full bg-violet-300 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans overflow-x-hidden">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
        
        {/* Form Container */}
        <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl shadow-xl transition-all">
          <div className="mb-6 text-center">
            <h2 className={`text-xl font-semibold ${SECONDARY_TEXT_COLOR}`}>
              Edit
            </h2>
            <h1 className={`text-3xl sm:text-4xl font-extrabold ${PRIMARY_TEXT_COLOR} tracking-tight`}>
              Profile
            </h1>
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Edit your First Name"
                className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Edit your Last Name"
                className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Add photo URL"
                className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            {/* Age & Gender Row for space efficiency */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender"
                  className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
                />
              </div>
            </div>

            {/* About */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                About
              </label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Edit your About"
                className={`w-full rounded-full border ${INPUT_BORDER_COLOR} px-5 py-2.5 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
            onClick={saveProfile}
                className={`w-full rounded-full ${PRIMARY_COLOR} py-3 text-base cursor-pointer font-bold text-white transition-all ${HOVER_COLOR} active:scale-[0.98] shadow-md`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Card Container */}
        <div className="w-full max-w-md lg:sticky lg:top-6 flex justify-center">
          <UserCard 
            user={{
              firstName: FirstName,
              lastName: LastName,
              photoUrl,
              age,
              gender,
              about
            }} 
          />
        </div>

      </div>
    </div>
 {showToast && (
        <div className="toast toast-top toast-center mt-11 ">
          <div className="alert alert-success shadow-lg rounded-2xl text-white font-medium bg-emerald-500 border-none">
            <span>Profile updated successfully!</span>
           
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;