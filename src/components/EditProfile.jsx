import React, { useState } from 'react'
import BASE_URL from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({user}) => {
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [error,setError] = useState('');
    const [showToast,setShowToast] = useState(false);
    const dispatch = useDispatch();
  
    const saveProfile = async()=>{
        setError("");
        try{
            const res =await axios.patch(BASE_URL+'/profile/edit',
                {firstName,lastName,photoUrl,age,gender,about},
                {withCredentials : true}
            )
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setInterval(()=>{
                setShowToast(false)
            },3000);



        }catch(err){
            setError(err.response.data);
        }
    }

  return (
    <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
        <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>


            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">FirstName</span>
            </div>
            <input type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">LastName</span>
            </div>
            <input type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={lastName} 
            onChange={(e)=>setLastName(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">PhotoUrl</span>
            </div>
            <input type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={photoUrl} 
            onChange={(e)=>setPhotoUrl(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">Age</span>
            </div>
            <input type="text" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={age} 
            onChange={(e)=>setAge(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">Gender</span>
            </div>
            <input type="dropdown" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={gender} 
            onChange={(e)=>setGender(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">About</span>
            </div>
            <input type="textarea" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs " 
            value={about} 
            onChange={(e)=>setAbout(e.target.value)}/>
            </label>

            <div className="card-actions">
                <p className='text-red-500'>{error}</p>
            <button className="btn btn-primary" onClick={saveProfile} >Save profile</button>
            </div>
        </div>
        </div>

        </div>
        <UserCard user ={{firstName,lastName,age,gender,photoUrl,about}} />
        {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>profile updated Successfully.</span>
        </div>
        </div>}
    </div>

  )
}

export default EditProfile;
