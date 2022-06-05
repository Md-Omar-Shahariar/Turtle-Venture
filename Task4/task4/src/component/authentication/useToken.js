import { useEffect, useState } from "react";

const useToken = (user) => {
  console.log(user);
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log(user);
    const email = user?.user?.email;
    console.log(email);

    console.log(email);
    if (email) {
      fetch(`https://radiostation01.herokuapp.com/user/${email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const accesstoken = data.token;
          localStorage.setItem("accessToken", accesstoken);
          setToken(accesstoken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
