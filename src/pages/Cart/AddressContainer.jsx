import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../components/Button/Button";
import useUser from "../../useUser";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AddressContainer = ({ billingAddresses, toggleCheckout }) => {
  const { user, setUser } = useUser();
  // const addr = ["", ""];
  const [selected, setSelected] = useState(
    billingAddresses.billing_address[0].id
  );

  console.log(billingAddresses?.billing_address[0].id);
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        }}
        exit={{
          opacity: 0,
          x: -100,
        }}
      >
        <h2>Select Addresss</h2>
        <h3>Default Addresss</h3>
        {billingAddresses?.billing_address.map((addr, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e7e8f1",
              // minHeight: "75%",
              padding: "2rem",
              boxShadow:
                "0 0 6px 0 rgb(78 42 222 / 2%), 0 6px 18px 0 rgb(78 42 222 / 2%)",
            }}
            onClick={() => setSelected(addr.id)}
          >
            <div
              className="class_justify_contents_column withGap"
              style={{ alignItems: "flex-start" }}
            >
              <div className="class_justify_contents_row withGap">
                <input
                  type="radio"
                  style={{ color: "red" }}
                  color="red"
                  checked={addr.id == selected ? true : false}
                  value={addr.id}
                />
                <h4>{addr.fullname ?? user.full_name ?? ""}</h4>
              </div>
              <p className="avenir_class" style={{ lineHeight: "inherit" }}>
                {addr.addressLine1}
              </p>
              <h3>Mobile:{addr.phoneNumber ?? user.phone}</h3>
              <div className="class_justify_contents_row withGap">
                <Button buttonColor={"black"} buttonStyle="btn--outline">
                  Remove
                </Button>
                <Button buttonColor={"gold"}>Edit</Button>
              </div>
            </div>
          </div>
        ))}
        <div>
          <div
            onClick={toggleCheckout}
            className="class_justify_contents_row withGap"
            style={{
              color: "var(--light-orange)",
              padding: "2rem",
              justifyContent: "flex-start",
              cursor: "pointer",
            }}
          >
            <Icon icon="material-symbols:add-circle" />
            <h3>Add New Addresss</h3>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddressContainer;
