import React from 'react'

const Modal = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
  {/* <!-- Background overlay, show/hide based on modal state. --> */}
  <div className="fixed inset-0 transition-opacity">
    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>

  {/* <!-- Modal panel, show/hide based on modal state. --> */}
  <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
    {/* <!-- Header --> */}
    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 sm:px-6">
      <div className="text-center text-sm font-medium leading-5">
        Modal Title
      </div>
    </div>

    {/* <!-- Body --> */}
    <div className="p-4">
      <p className="text-sm leading-5">
        Modal Content
      </p>
    </div>

    {/* <!-- Footer --> */}
    <div className="bg-gray-50 px-4 py-3 sm:px-6">
      <div className="text-right">
        <button className="text-sm font-medium leading-5 bg-white border border-gray-300 rounded-md px-4 py-2 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out">
          Close
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Modal