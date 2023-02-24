import React, { useState } from "react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import useUser from "../../useUser";
import AnimatedModal from "../AnimatedModal/AnimatedModal";
import { Button } from "../Button/Button";
import InputField from "../Inputfield/InputField";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user, setUser } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [editValue, setEditValue] = useState({});

  return (
    <div
      style={{
        boxShadow: "var(--box-shadow)",
        borderRadius: "10px",
        // padding: window.innerWidth < 660 ? "30px" : "35px",
        width: window.innerWidth < 660 ? "125%" : "90%",
        paddingBottom: "110px",
        background: "white",
      }}
      className={"class_justify_contents_column"}
    >
      <AnimatedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalHeight="300px"
      >
        <EditProfile setOpenModal={setOpenModal} editValue={editValue} />
      </AnimatedModal>
      <div
        style={{
          height: "70px",
          width: "70px",
          fontSize: "30px",
          marginBottom: "4rem",
        }}
        className={"centerClass pic-wrapper iscircular"}
      >
        {/* <img src="/svg/avatar.svg" height={"100px"} width={"100px"} /> */}
        {user.full_name ? user.full_name.charAt(0) : user.email.charAt(0)}
      </div>
      {/* for the contents */}
      <div
        style={{ gap: "1rem", alignItems: "flex-start" }}
        className="class_justify_contents_column"
      >
        <div
          className="class_justify_contents_row"
          style={{
            gap: "1rem",
            flexDirection: window.innerWidth < 760 && "column",
          }}
        >
          <div>
            <p className="avenir_class">Full name</p>
            <div
              className="class_justify_contents_row withGap"
              onClick={() => {
                setEditValue({ full_name: user.full_name });
                setOpenModal(true);
              }}
            >
              <InputField
                label={user.full_name ? user.full_name : "Enter name"}
                readonly={true}
                style={{
                  width: window.innerWidth < 660 && "210px",
                }}
              />
              <FiEdit icon="material-symbols:edit" color="var(--success)" />
            </div>
          </div>
          <div>
            <p className="avenir_class">Email</p>
            <div
              className="class_justify_contents_row withGap"
              onClick={() => {
                setEditValue({ email: user.email });
                setOpenModal(true);
              }}
            >
              <InputField
                label={user.email ?? "Enter email"}
                readonly={true}
                style={{
                  width: window.innerWidth < 660 && "210px",
                }}
              />
              <FiEdit icon="material-symbols:edit" color="var(--success)" />
            </div>
          </div>
        </div>
        <p className="avenir_class">Phone</p>
        <div
          className="class_justify_contents_row withGap"
          style={{ width: "100%" }}
          onClick={() => {
            setEditValue({ phone: user.phone });
            setOpenModal(true);
          }}
        >
          <InputField
            label={user.phone ? user.phone : "Enter phone"}
            style={{ width: window.innerWidth < 660 ? "210px" : "95%" }}
            readonly={true}
          />
          <FiEdit icon="material-symbols:edit" color="var(--success)" />
        </div>
        <p className="avenir_class">Address</p>
        <div
          className="class_justify_contents_row withGap"
          style={{ width: "100%" }}
          onClick={() => {
            setEditValue({ address: user.address });
            setOpenModal(true);
          }}
        >
          <InputField
            label={user.address ? user.address : "Enter address"}
            style={{ width: window.innerWidth < 660 ? "210px" : "95%" }}
            readonly={true}
          />
          <FiEdit icon="material-symbols:edit" color="var(--success)" />
        </div>
      </div>
      {/* end of contents */}
    </div>
  );
};

export default Profile;
