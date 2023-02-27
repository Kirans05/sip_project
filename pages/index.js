import React, { useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("sb-ziaxsvytbaahgjrompdd-auth-token") == null) {
      router.push("/LoginPage");
    } else {
      router.push("/Dashboard");
    }
  }, []);
  return (
    <div>
      <h1 className="text-9xl">index</h1>
    </div>
  );
};

export default index;