import React, { useRef, useState } from "react";
import axios from "axios"

const PassportFile = () => {
  const [passPortDetails, setPassPortDetails] = useState({
    "idDocType": "PASSPORT",
    "country": "IND",
    "issuedDate": "2022-05-07",
    "number": "W0074724",
    "dob": "1998-02-08",
    "placeOfBirth": "HOSPET"
  });
  const photoRef = useRef()


  const inputChnageHandler = (e) => {
    setPassPortDetails({...passPortDetails, [e.target.name] : e.target.value})
  }


  const submitHandler = async () => {
    const form = new FormData()
    const metadata = {...passPortDetails}
    form.append('metadata', JSON.stringify(metadata));
    // form.append('content', photoRef.current.files[0]);


    let fetchResponse = await axios("/api/adddocument",{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        data:{
            form:form.get('metadata'),
            applicantId:"63ff33c609465106442c1625"
        }
    })


    console.log(fetchResponse)

  }

  return (
    <div>
      <h1>PassportFile</h1>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <label>Country</label>
          <input
            type={"text"}
            placeholder={"Enter the Country"}
            className="border-2 pl-2"
            value={passPortDetails.country}
            name={"country"}
            onChange={inputChnageHandler}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Issued Date</label>
          <input type={"date"} className="border-2 pl-2 w-1/2" 
          value={passPortDetails.issuedDate}
          name={"issuedDate"}
          onChange={inputChnageHandler}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Passport Number</label>
          <input
            type={"text"}
            placeholder={"Enter the Passport Number"}
            className="border-2 pl-2"
            value={passPortDetails.number}
            name={"number"}
            onChange={inputChnageHandler}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Date of Birth</label>
          <input
            type={"date"}
            placeholder={"Enter the Date of Birth"}
            className="border-2 pl-2 w-1/2"
            value={passPortDetails.dob}
            name={"dob"}
            onChange={inputChnageHandler}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Place of Birth</label>
          <input
            type={"text"}
            placeholder={"Enter Place Of Birth"}
            className="border-2 pl-2"
            value={passPortDetails.placeOfBirth}
            name={"placeOfBirth"}
            onChange={inputChnageHandler}
          />
        </div>
        {/* <h1>Or</h1> */}
        <div className="flex flex-col gap-y-3">
          <h1>Upload Passport Image</h1>
          <div className="flex flex-col gap-y-2">
            <input
              type={"file"}
              placeholder={"Upload Passport file"}
              className="border-2"
            //   onChange={fileChangeHandler}
            //   name={"passport"}
            //   value={photo}
            //   accept="image/*"
            ref={photoRef}
            />
          </div>
        </div>
        <button onClick={submitHandler} className="border-2 bg-green-500 text-white rounded-xl">Submit</button>
      </div>
    </div>
  );
};

export default PassportFile;
