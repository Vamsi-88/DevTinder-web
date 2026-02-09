import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../utils/constants'

const Login = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        { emailId, password },
        { withCredentials: true }
      )
      dispatch(addUser(res.data))
      navigate('/')
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong')
    }
  }

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      )
      dispatch(addUser(res.data.data))
      navigate('/profile')
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#0b1220]">
      <div className="card w-96 shadow-[0_10px_40px_rgba(0,0,0,0.6)] bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 hover:scale-[1.03] transition-transform duration-300">
        <div className="card-body items-center text-center text-white">
          <h2 className="card-title text-2xl font-extrabold tracking-wide mb-4 text-red-400">
            {isLogin ? 'Login' : 'Signup'}
          </h2>

          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs text-left">
                <span className="label-text text-gray-300">First Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-red-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </label>

              <label className="form-control w-full max-w-xs text-left">
                <span className="label-text text-gray-300">Last Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-red-400"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs text-left">
            <span className="label-text text-gray-300">Email</span>
            <input
              type="text"
              className="input input-bordered w-full bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-red-400"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email"
            />
          </label>

          <label className="form-control w-full max-w-xs text-left relative">
            <span className="label-text text-gray-300">Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full bg-transparent text-white placeholder-gray-400 pr-12 focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <span
              className="absolute right-3 top-9 text-sm cursor-pointer text-yellow-400 hover:text-red-400 transition"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </label>

          <div className="card-actions flex flex-col w-full mt-4">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              className="btn w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold tracking-wide transition"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </div>

          <p
            className="cursor-pointer pt-3 text-sm text-gray-300 hover:text-white transition"
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin ? 'New user? Signup here' : 'Existing user? Login here'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
