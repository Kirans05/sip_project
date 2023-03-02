import React from 'react'

const PassportFile = () => {
  return (
    <div>
        <h1>PassportFile</h1>
        <div className='flex flex-col gap-y-3'>
            <div className='flex flex-col gap-y-2'>
                <label>Document Name</label>
                <input type={"text"} placeholder={"Enter the Document Type"} className="border-2 pl-2" />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Country</label>
                <input type={"text"} placeholder={"Enter the Country"} className="border-2 pl-2" />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Issued Date</label>
                <input type={"date"}  className="border-2 pl-2 w-1/2" />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Passport Number</label>
                <input type={"text"} placeholder={"Enter the Passport Number"} className="border-2 pl-2" />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Date of Birth</label>
                <input type={"date"} placeholder={"Enter the Date of Birth"} className="border-2 pl-2 w-1/2" />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Place of Birth</label>
                <input type={"text"} placeholder={"Enter Place Of Birth"}  className="border-2 pl-2" />
            </div>
        </div>
    </div>
  )
}

export default PassportFile