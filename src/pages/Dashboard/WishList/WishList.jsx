import React from "react";
import useUser from "../../../useUser";
import NavComponent from "../components/NavComponent/NavComponent";

const WishList = () => {
  const { user, setUser } = useUser();

  return (
    <div>
      <NavComponent
        personsName={user.email ?? "Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Wish List"
        // setHandleNotData={setHandleNotData}
      />
    </div>
  );
};

export default WishList;
