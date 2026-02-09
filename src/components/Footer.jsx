import React from 'react'

const Footer = () => {
  return (
    <footer className="footer flex flex-col sm:flex-row justify-between items-center gap-6 bg-gradient-to-r from-[#0b1220] via-[#111827] to-[#0b1220] text-white p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md border-t border-white/10">
      <aside className="flex items-center gap-4">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-red-400 hover:fill-yellow-400 transition-all duration-300"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>

        <p className="text-sm text-gray-300 leading-tight">
          <span className="font-semibold text-white tracking-wide">
            DevTinder
          </span>
          <br />
          Forging developer connections ⚓
        </p>
      </aside>

      <nav className="text-center sm:text-right">
        <h6 className="footer-title text-yellow-400 tracking-widest">
          Social
        </h6>

        <div className="grid grid-flow-col gap-5">
          <a className="cursor-pointer hover:scale-110 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="fill-gray-300 hover:fill-red-400 transition"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
            </svg>
          </a>

          <a className="cursor-pointer hover:scale-110 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="fill-gray-300 hover:fill-red-400 transition"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245..."></path>
            </svg>
          </a>

          <a className="cursor-pointer hover:scale-110 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="fill-gray-300 hover:fill-red-400 transition"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4..."></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
