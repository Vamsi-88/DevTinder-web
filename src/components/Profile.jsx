import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#0b1220]">
        <EditProfile user={user} />
      </div>
    )
  )
}

export default Profile
