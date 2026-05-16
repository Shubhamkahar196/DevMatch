

// const UserCard = ({user}) => { 

// console.log(user) 
//   return (
//     <div className="card bg-base-100 w-96 shadow-sm">
//   <figure>
//     <img
//       src={user.photoUrl}
//       alt="photo" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{user.firstName}</h2>
//     <h2 className="card-title">{user.lastName}</h2>
//     {user && (
//   <>
//     <p>{`${user.age}, ${user.gender}`}</p>
//     <p>{user.about}</p>
//   </>
// )}
    
//     <div className="card-actions justify-end mt-2">
//       <button className="btn btn-primary">Ignore</button>
//       <button className="btn btn-secondry">Intersted</button>
//     </div>
//   </div>
// </div>

//   )
// }

// export default UserCard


const UserCard = ({ user }) => {
  console.log(user);

  // Fix: If photoUrl is missing or an empty string, set it to null 
  // or a fallback placeholder URL so the browser doesn't throw a warning.
  const imageSrc = user?.photoUrl?.trim() !== "" ? user.photoUrl : null;

  return (
    <div className="card bg-base-100 w-full max-w-sm sm:w-96 shadow-sm overflow-hidden rounded-3xl">
      <figure className="h-64 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${user?.firstName || 'User'}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Visual fallback if there's no image provided yet */
          <div className="text-gray-400 font-medium">No Image Provided</div>
        )}
      </figure>

      <div className="card-body p-6">
        
        <h2 className="card-title text-xl font-bold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>

        {user && (
          <div className="space-y-1">
            {/* Show age/gender info only if at least one exists */}
            {(user.age || user.gender) && (
              <p className="text-sm font-semibold text-gray-500">
                {user.age ? `${user.age} yrs` : ""}
                {user.age && user.gender ? ", " : ""}
                {user.gender}
              </p>
            )}
            <p className="text-sm text-gray-600 italic mt-1 wrap-break-word">
              {user.about || "No bio description provided yet."}
            </p>
          </div>
        )}

        <div className="card-actions justify-end mt-4 gap-2">
          <button className="btn btn-ghost border border-gray-300 rounded-full px-5 text-sm font-medium">
            Ignore
          </button>
         
          <button className="btn btn-secondary rounded-full px-5 text-sm font-medium">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;