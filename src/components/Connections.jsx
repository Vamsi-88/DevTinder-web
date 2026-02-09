import React from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { useSelector } from 'react-redux'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);
    const getConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL+'/user/connections',
            {withCredentials : true}
        )
        dispatch(addConnections(res.data.data));



        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getConnections();
    },[]);


    if(!connections) return ;

    if(connections.length ===0 ) return <h1>No Connections Found</h1>;

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <h1 className="text-3xl font-bold mb-6">Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {connections.map(({ _id,firstName, lastName, photoUrl, age, gender, about }) => (
            <div key={_id} className="card bg-base-100 shadow-xl">
                <figure className="px-4 pt-4">
                <img alt="photo" src={photoUrl} className="rounded-xl w-32 h-32 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p className="text-sm text-gray-500">{age + ", " + gender}</p>}
                <p className="mt-2">{about}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
  )
}

export default Connections
