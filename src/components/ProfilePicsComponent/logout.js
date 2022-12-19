import { useNavigate } from "react-router-dom";

const logout = ({
  token: token,
  setToken: setToken,
  setHandleNotData: setHandleNotData,
  history: history,
}) => {
  const url = window.baseUrl + "logout?token=" + token;
  history("/login");
  setToken(null);
  // fetch(url, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     // Authorization: `Bearer ${token}`,
  //   },
  //   method: "POST",
  //   // body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     if (data["success"] === true) {
  //       setHandleNotData({ message: data.message, color: "#41f1b6" });
  //       history("/login");
  //       setToken(null);
  //     } else {
  //       setHandleNotData({ message: data.message, color: "red" });
  //       //   setHandleNotData(data.message);
  //     }
  //     // console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.warn("Error:", error);
  //   });
};
export default logout;
