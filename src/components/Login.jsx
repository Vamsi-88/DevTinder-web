import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const[emailId,setEmailId] = useState("eren@gmail.com");
    const[password,setpassword] = useState("Eren@1234");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = async( ) => {
        try{
        const res = await axios.post("http://localhost:7777/login",{
            emailId,
            password
        },
        {withCredentials : true}
        )
        navigate("/");

        dispatch(addUser(res.data))
        }catch(err){
            console.log("error: "+err)
        }
    }






  return (
    <div className='flex justify-center'>
        <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center text-center">
            <h2 className="card-title">Login</h2>


            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">Email Id</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs " value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            </label>


            <label className="form-control w-full max-w-xs text-left">
            <div className="label py-2">
                <span className="label-text">Password</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs " value={password} onChange={(e)=>setpassword(e.target.value)} />
            </label>

            <div className="card-actions">
            <button className="btn btn-primary" onClick={handleChange}>Login</button>
            </div>
        </div>
        </div>

    </div>

  )
}

export default Login
