import React, { useState } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import supabase from "../src/Config/supabaseClient";

const SignupPage = () => {
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    cPassword: "",
  });

  const changePasswordType1 = () => {
    if (showPassword1 == true) {
      setShowPassword1(false);
    } else {
      setShowPassword1(true);
    }
  };

  const changePasswordType2 = () => {
    if (showPassword2 == true) {
      setShowPassword2(false);
    } else {
      setShowPassword2(true);
    }
  };

  const inputChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerHandler = async (userData) => {
    if (userData.password == "" || userData.email == "" || userData.cPassword == "") {
      alert("Please Fill All The Feilds")
      return;
    }
  
    if(userData.password != userData.cPassword){
      alert("Passwords Does not Match")
      return ;
    }
  
    try {
      const submitResponse = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
  
      if (submitResponse.error) {
          alert(submitResponse.error.message)
          return "error";
      }
  
      if (submitResponse.data.session == null) {
          alert("Please Check Your Mail For Confirmation Link")
          router.push("/LoginPage")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-2 pt-6 md:p-6  flex flex-col items-center">
        <div className="p-2 md:p-10 flex flex-col gap-y-4 w-full  md:w-1/2">
            <h1 className="text-3xl text-center">Welcome to Sipto</h1>
            <h1 className="text-2xl text-center">Lets Start Saving Together</h1>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Email</label>
              <input
                type={"text"}
                placeholder={"Enter Your Eamil Id"}
                className="w-full h-10 px-4 border-2"
                name="email"
                value={userData.email}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Password</label>
              <div className="flex flex-row gap-x-2 items-center">
                <input
                  type={showPassword1 == true ? "password" : "text"}
                  placeholder={"Enter Your Password"}
                  className="w-full h-10 px-4 border-2"
                  name="password"
                  value={userData.password}
                  onChange={inputChangeHandler}
                />
                {/* <div>
                  <AiFillEyeInvisible
                    className={
                      showPassword1 == true ? `hidden` : `block text-2xl`
                    }
                    onClick={changePasswordType1}
                  />
                  <AiFillEye
                    className={
                      showPassword1 == true ? `block text-2xl` : `hidden`
                    }
                    onClick={changePasswordType1}
                  />
                </div> */}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Confirm Password</label>
              <div className="flex flex-row gap-x-2 items-center">
                <input
                  type={showPassword2 == true ? "password" : "text"}
                  placeholder={"Enter Your Password Again"}
                  className="w-full h-10 px-4 border-2"
                  name="cPassword"
                  value={userData.cPassword}
                  onChange={inputChangeHandler}
                />
                <div>
                  <AiFillEyeInvisible
                    className={
                      showPassword2 == true ? `hidden` : `block text-2xl`
                    }
                    onClick={changePasswordType2}
                  />
                  <AiFillEye
                    className={
                      showPassword2 == true ? `block text-2xl` : `hidden`
                    }
                    onClick={changePasswordType2}
                  />
                </div>
              </div>
            </div>
            <button className="border-4 w-1/2 self-center rounded-2xl h-10 bg-lime-600 text-white" onClick={() => registerHandler()}>
              Register
            </button>
            <h1 className="self-end text-md">
              Already have an account,{" "}
              <span
                className="hover:underline cursor-pointer hover:text-blue-800"
                onClick={() => router.push("/LoginPage")}
              >
                Login
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
