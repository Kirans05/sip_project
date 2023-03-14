import React from 'react'

const IndividualProducts = ({item}) => {
  return (
    <div className='border-2 border-slate-400 flex flex-col w-1/4 items-center py-2 px-0 gap-y-3 rounded-xl hover:cursor-pointer'>
        <img src={`${item.productImages[0].url}`} alt={"Image"} className="w-1/3"/>
        {/* <h1>Size - {item.productSize}</h1> */}
        <h1>{item.productWeight} gms</h1>
        <h1 className='text-sm'>{item.name}</h1>
        {/* <h1>Description - {item.description}</h1> */}
        <h1>{item.basePrice} Rs</h1>
        <h1>{"{Making & Delivery Charges}"}</h1>
        {/* <h1>Metal Type - {item.metalType}</h1> */}
    </div>
  )
}

export default IndividualProducts