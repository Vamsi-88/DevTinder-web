import React, { useEffect } from 'react'
import axios from 'axios'
import BASE_URL from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch()

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + '/Request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      )
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + '/user/request/received',
        { withCredentials: true }
      )
      dispatch(addRequests(res.data.data))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  if (!requests) return null

  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300 text-lg">
        No Connection Requests Found
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#0b1220] px-6 py-12 text-white">
      <h1 className="text-3xl font-extrabold tracking-wide text-center text-yellow-400 mb-10">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = request.fromUserId

          return (
            <div
              key={_id}
              className="card bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.03] transition-transform duration-300"
            >
              <figure className="pt-6">
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-32 h-32 rounded-full object-cover ring-2 ring-yellow-400 ring-offset-2 ring-offset-[#0b1220]"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title text-lg font-bold text-yellow-400">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  {about}
                </p>

                <div className="card-actions mt-5 flex gap-5">
                  <button
                    className="btn bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300"
                    onClick={() =>
                      reviewRequest('Accepted', request._id)
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() =>
                      reviewRequest('Rejected', request._id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests
