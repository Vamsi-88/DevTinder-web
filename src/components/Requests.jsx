import React, { useEffect } from 'react'
import axios from 'axios'
import BASE_URL from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests,removeRequest } from '../utils/requestSlice'


const Requests = () => {
    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async(status,_id)=>{
        try{
            await axios.post(BASE_URL+'/Request/review/'+status+'/'+_id, {}, {withCredentials:true});
            dispatch(removeRequest(_id));

        }catch(err){
            console.error(err.message)
        }
    }

    const getRequests = async() =>{
        try{
            const res = await axios.get(BASE_URL+'/user/request/received',{withCredentials:true})
            dispatch(addRequests(res.data.data));

        }catch(err){
            console.error(err.message);
        }
    }




    useEffect(()=>{
        getRequests();
    },[])

    if(!requests) return ;

    if(requests.length ===0 ) return <h1>No Connection requests Found</h1>;

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div key={_id} className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <img
                alt="photo"
                src={photoUrl}
                className="rounded-xl w-32 h-32 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && (
                <p className="text-sm text-gray-500">{age + ", " + gender}</p>
              )}
              <p className="mt-2">{about}</p>

              <div className="card-actions mt-4 flex gap-4">
                <button className="btn btn-primary" onClick={()=>reviewRequest("Accepted",request._id)}>Accept</button>
                <button className="btn btn-secondary" onClick={()=>reviewRequest("Rejected",request._id)}>Reject</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default Requests
