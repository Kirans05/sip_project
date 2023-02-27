import React, { useState } from "react";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import supabase from "../src/Config/supabaseClient";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changePasswordType = () => {
    if (showPassword == true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const inputChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const loginHandler = async () => {
    if (userData.password == "" || userData.email == "") {
      alert("Please Fill All The Feilds")
      return "error"
    }
  
    try {
      const submitResponse = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
  
      if (submitResponse.error) {
          alert(submitResponse.error.message)
          // return "error"
      }
  
      if (submitResponse.data.session) {
        // return "success"
        router.push("/Dashboard");
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
        <div className="p-2 pt-6 md:p-6 flex flex-col items-center ">
          <div className="p-2 md:p-10 flex flex-col gap-y-4 w-full  md:w-1/2">
            <h1 className="text-3xl text-center">Welcome to Sipto</h1>
            <h1 className="text-2xl text-center">Lets Start Saving Together</h1>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Email</label>
              <input
                type={"text"}
                placeholder={"Enter Your Eamil Id"}
                className="w-full h-10 px-4 border-2"
                value={userData.email}
                onChange={inputChangeHandler}
                name="email"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl">Password</label>
              <div className="flex flex-row gap-x-2 items-center">
                <input
                  type={showPassword == true ? "password" : "text"}
                  placeholder={"Enter Your Password"}
                  className="w-full h-10 px-4 border-2"
                  value={userData.password}
                  onChange={inputChangeHandler}
                  name="password"
                />
                {/* <div>
                  <AiFillEyeInvisible
                    className={
                      showPassword == true ? `hidden` : `block text-2xl`
                    }
                    onClick={changePasswordType}
                  />
                  <AiFillEye
                    className={
                      showPassword == true ? `block text-2xl` : `hidden`
                    }
                    onClick={changePasswordType}
                  />
                </div> */}
              </div>
            </div>
            <button
              className="border-4 w-1/2 self-center rounded-2xl h-10 bg-lime-600 text-white"
              onClick={() => loginHandler()}
            >
              Login
            </button>
            <h1 className="self-end text-md">
              Don't have an account,{" "}
              <span
                className="hover:underline cursor-pointer hover:text-blue-800"
                onClick={() => router.push("/SignupPage")}
              >
                Signup
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
