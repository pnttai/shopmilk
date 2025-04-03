import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()
    
  // Debug location object safely
  console.log("location", location)  
    
  // Safely get the success message from location state
  const successMessage = location?.state?.text || "Payment completed successfully"

  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
      <p className='text-green-800 font-bold text-lg text-center'>
        {successMessage}
      </p>
      <Link 
        to="/" 
        className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1 rounded"
      >
        Go To Home
      </Link>
    </div>
  )
}

export default Success