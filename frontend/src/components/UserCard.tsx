

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
    
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary">Send Request</button>
    </div>
  </div>
</div>

  )
}

export default UserCard