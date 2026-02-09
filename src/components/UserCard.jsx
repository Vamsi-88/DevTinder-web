import axios from 'axios'
import BASE_URL from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user
  const dispatch = useDispatch()

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + '/Request/' + status + '/' + _id,
        {},
        { withCredentials: true }
      )
      dispatch(removeUserFromFeed(_id))
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="card w-96 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.03] transition-transform duration-300 text-white">
      <figure className="relative">
        <img
          src={photoUrl}
          alt="photo"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl font-bold tracking-wide text-yellow-400">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-300">
            {age} • {gender}
          </p>
        )}

        <p className="text-sm text-gray-300 leading-relaxed mt-2">
          {about}
        </p>

        <div className="card-actions justify-center gap-6 mt-5">
          <button
            className="btn btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
            onClick={() => handleRequest('Ignored', _id)}
          >
            Ignore
          </button>

          <button
            className="btn bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300"
            onClick={() => handleRequest('Interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
