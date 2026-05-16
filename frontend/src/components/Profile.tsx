import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import type { RootState } from "../utils/Store";

const Profile = () => {
    const user = useSelector((store: RootState) => store.user);
  return (
    <div>
      <EditProfile user={user}/>
      </div>
  )
}

export default Profile