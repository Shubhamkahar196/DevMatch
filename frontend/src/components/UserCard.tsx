

const UserCard = ({user}) => { 

console.log(user) 
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName}</h2>
    {user && (
  <>
    <p>{`${user.age}, ${user.gender}`}</p>
    <p>{user.about}</p>
  </>
)}
    
    <div className="card-actions justify-end mt-2">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondry">Intersted</button>
    </div>
  </div>
</div>

  )
}

export default UserCard