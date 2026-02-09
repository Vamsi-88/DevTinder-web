import React, { useState } from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserCard from './UserCard'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [about, setAbout] = useState(user.about)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()

  const saveProfile = async () => {
    setError('')
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      )
      dispatch(addUser(res?.data?.data))
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-12 my-12 px-4 text-white">
      <div className="card w-96 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-extrabold tracking-wide text-yellow-400">
            Edit Profile
          </h2>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">First Name</span>
            <input
              type="text"
              className="input input-bordered bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">Last Name</span>
            <input
              type="text"
              className="input input-bordered bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">Photo URL</span>
            <input
              type="text"
              className="input input-bordered bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">Age</span>
            <input
              type="text"
              className="input input-bordered bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">Gender</span>
            <select
              className="select w-full bg-[#020617] text-white border border-white/20 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-yellow-400
                         hover:border-yellow-400 transition"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled value="" className="bg-[#020617] text-gray-400">
                Select gender
              </option>
              <option value="male" className="bg-[#020617] text-white">
                Male
              </option>
              <option value="female" className="bg-[#020617] text-white">
                Female
              </option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">About</span>
            <textarea
              rows={4}
              className="textarea textarea-bordered bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>

          <p className="text-red-400 text-sm">{error}</p>

          <button
            className="btn w-full bg-yellow-400 text-black hover:bg-yellow-500 transition font-semibold"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-green-500 text-white shadow-lg">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile
