import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();


  const getFeed = async()=>{
    try{
      const res = await axios.get(BASE_URL+'/user/feed',
        {withCredentials : true}
      );
      dispatch(addFeed(res.data));
      console.log(res.data);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getFeed();
  },[]);

  return (
   <div className='flex justify-center my-5'> 
 {feed?.length > 0 ? <UserCard user={feed[0]} /> : <p>Loading...</p>}
   </div>
  )
}

export default Feed;
