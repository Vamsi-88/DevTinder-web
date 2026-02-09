import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector((store) => store.connections)

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      })
      dispatch(addConnections(res.data.data))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  if (!connections) return null

  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300 text-lg">
        No Connections Found
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#0b1220] px-6 py-12 text-white">
      <h1 className="text-3xl font-extrabold tracking-wide text-center text-yellow-400 mb-10">
        Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {connections.map(
          ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
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
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Connections
