import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      })
      dispatch(addFeed(res.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if (!feed) return null

  if (feed.length <= 0)
    return (
      <div className="flex justify-center items-center h-full text-gray-400 text-lg">
        No Feed Found!
      </div>

    )

  return (
    <div className="flex justify-center my-10 px-4">
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed
