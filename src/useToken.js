import { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    // console.log(tokenString)
    const userToken = JSON.parse(tokenString);
    // console.log(userToken?.token)
    return userToken;
  };
  const getUser = () => {
    const userString = localStorage.getItem("user");
    // console.log(tokenString)
    const user = JSON.parse(userString);
    // console.log(userToken?.token)
    return user;
  };
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };
  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user.user);
  };
  // useEffect(()=>{
  //   saveToken()
  // },[token])
  return {
    setToken: saveToken,
    // setUser: saveUser,
    token,
    // user
  };
}
