import { useState } from "react";

export default function useUser() {
  const getUser = () => {
    const userString = localStorage.getItem("user");
    // console.log(tokenString)
    const user = JSON.parse(userString);
    // console.log(userToken?.token)
    return user;
  };
  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user.user);
  };
  return {
    setUser: saveUser,
    user,
  };
}
