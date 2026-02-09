import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {_id,firstName,lastName,age,gender,photoUrl,about}= user;
  const dispatch = useDispatch();



  const handleRequest = async(status,_id)=>{
    try{
      await axios.post(BASE_URL+'/Request/'+status+'/'+_id,{},{withCredentials:true})
      dispatch(removeUserFromFeed(_id));

    }catch(err){
      console.log(err.message);
    }
  }


return (
<div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + ' '+ lastName}</h2>
    {user.age && user.gender && <p>{age +' '+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-3">
      <button className="btn btn-primary" onClick={()=>handleRequest("Ignored",_id)}>Ignored</button>
      <button className="btn btn-secondary" onClick={()=>handleRequest("Interested",_id)}>Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard;

