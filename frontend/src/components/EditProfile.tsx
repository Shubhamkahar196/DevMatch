
import { useState } from "react";

const PRIMARY_COLOR = "bg-[#6C5CE7]"; // A vibrant purple
const PRIMARY_TEXT_COLOR = "text-[#6C5CE7]";
const SECONDARY_TEXT_COLOR = "text-[#A29BFE]"; // Lighter purple for subtler text
const INPUT_BORDER_COLOR = "border-[#D1D5DB]"; // Standard grey border
const HOVER_COLOR = "hover:bg-[#5A4BCF]"; // Darker purple hover state


const EditProfile = () => {
  const[firstName,setFirstName] = useState("")
  const [lastName,setLastName]= useState("");
  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [error,setError]= useState("")
  return (
     <div className="flex flex-col sm:flex-row min-h-screen w-full font-sans bg-violet-300 pt-16 sm:pt-0 overflow-x-hidden">
          
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:px-16 lg:px-24 xl:px-32 bg-white sm:bg-[#F9FAFB]">
            <div className="w-full max-w-sm sm:max-w-md bg-white  p-8 sm:p-10 rounded-3xl sm:shadow-lg">
             
              <div className="mb-10 text-center">
                <h2 className={`text-2xl font-semibold  ${SECONDARY_TEXT_COLOR}`}>
                  Edit
                </h2>
                <h1
                  className={`text-4xl font-extrabold ${PRIMARY_TEXT_COLOR} tracking-tight`}
                >
                  Profile
                </h1>
              </div>
    
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                    FirstName
                  </label>
                  <input
                    type="text"
                   
                    placeholder="Edit your FirstName"
                    className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
                  />
                </div>
    
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                   
                    placeholder="Enter a password"
                    className={`w-full rounded-full ${INPUT_BORDER_COLOR} px-5 py-3 text-sm text-[#111111] placeholder-[#A1A1A1] outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#A29BFE]/30`}
                  />
                </div>
    
                <div className="pt-4">
                  <button
                   
                    className={`w-full rounded-full ${PRIMARY_COLOR} py-3.5 text-lg font-bold text-white transition-all ${HOVER_COLOR} active:scale-[0.98] shadow-md`}
                  >
                    Save
                  </button>
                </div>
    
                
                 
                
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditProfile