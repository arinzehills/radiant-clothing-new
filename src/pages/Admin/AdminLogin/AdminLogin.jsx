import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import "./AdminLogin.css";
import InputField from "../../../components/Inputfield/InputField";

import useToken from "../../../useToken";
import useUser from "../../../useUser";
import GradientText from "../../../components/utilitiescomponent/GradientText";

const AdminLogin = ({ children, setHandleNotData }) => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [responseError, setResponseError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };
  useEffect(() => {
    // setLoading(true)
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // setLoading(true)
      console.log(formValues);
      login();
      console.log(window.baseUrl);
    }
  }, [formErrors]);
  console.log(loading);
  const login = async () => {
    setLoading(true);
    const data = {
      email: formValues.email,
      password: formValues.password,
    };
    const url = window.baseUrl + "login";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // 'Authorization': 'http://localhost:8000/api/user',
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data["user"]);

        if (data["success"] === true) {
          const token = data["user"].token;
          const user = data["user"];
          if (user.user_type == null || user.user_type !== "admin") {
            setResponseError("sorry u are not an admin");
          } else {
            setHandleNotData({ message: data.message });
            setToken(token);
            setUser(user);
            history("/admin");
          }

          setLoading(false);
        } else {
          const error = data["message"];
          console.log(error);
          setResponseError(error);
          setLoading(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  };
  // console.log(loading)
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value.trimLeft().trimRight() });

    console.log(formValues);
    // console.log(e.target)
  };
  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          openModal && (
            <>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
                className="invitesign_backdrop"
                // onClick={() => setOpenModal(false)}
              >
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  exit={{ scale: 0 }}
                  className="addteam_content_wrapper admin_login_main_container"
                  onClick={stopPropagation}
                >
                  <div style={{ marginBottom: "3rem" }}>
                    <GradientText text={"Radiant Clothing Admin"} />
                  </div>
                  <motion.div
                    initial={{
                      x: 100,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                        duration: 0.7,
                      },
                    }}
                    exit={{ opacity: 0, x: 100 }}
                    className="addteam_content "
                  >
                    {children ?? (
                      <div className="admin_login_container">
                        <Link
                          to="/"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src="images/logo.png"
                            style={{
                              height: 60,
                              marginBottom: 0,
                              marginLeft: "-2rem",
                              //   background: "red",
                            }}
                            alt="h"
                          />
                        </Link>
                        <h2
                          style={{
                            marginBottom: 0,
                            marginTop: "-10px",
                            textTransform: "capitalize",
                            textAlign: "center",
                            color: "var(--dark-blue)",
                          }}
                        >
                          Admin Login
                        </h2>

                        <h3 style={{ lineHeight: 0 }}>Email</h3>
                        <InputField
                          label={"Enter email"}
                          // value={inputValues[0]}
                          name={"email"}
                          inputStyle="input--shadow-purple"
                          inputColor="purple-input"
                          onHandleChange={handleChange}
                        />
                        <h3 style={{ lineHeight: 0 }}>Password</h3>
                        <InputField
                          label={"Enter password"}
                          name={"password"}
                          inputStyle="input--shadow-purple"
                          inputColor="purple-input"
                          onHandleChange={handleChange}
                          value={formValues.password}
                        />
                        <p className="errors">{formErrors.password}</p>
                        <p className="errors">{responseError ?? ""}</p>

                        <Button buttonColor={"gradient"} onClick={onSubmit}>
                          Sign In
                        </Button>
                        {/* {children} */}
                        {/* <SaveButton
                      //   onClick={updateCompany}
                      // onClick={handleNot}
                      // secondBtnSize={"10rem"}
                      onClick2={() => setOpenModal(false)}
                      labels={["Cancel", "Invite "]}
                    /> */}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default AdminLogin;
