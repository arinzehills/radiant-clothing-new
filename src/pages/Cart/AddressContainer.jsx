import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../components/Button/Button";
import useUser from "../../useUser";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";

const AddressContainer = ({ billingAddresses, toggleCheckout,loadingAddr,selected,setSelected }) => {
  const { user, setUser } = useUser();
  const [loading,setLoading]=useState(false)
  // const addr = ["", ""];
  console.log(loadingAddr)
 
  const deleteAddress = async (address_id) => {
    setLoading(true);
    try {
      const orderUrl = `${window.baseUrl}payment/deleteBillingAddress`;
      const { data } = await axios.post(orderUrl, {user_id:user._id, address_id: address_id }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      setLoading(false);
      toggleCheckout()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(billingAddresses?.billing_address[0].id);
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          // scale: 0,
          x: -100,
                opacity: 0,
        }}
        animate={{
          scale: 1,
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
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
            onClick={() => setSelected(addr)}
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
                  checked={addr.id == selected?.id ? true : false}
                  value={addr.id}
                />
                <h4>{addr.fullname ?? user.full_name ?? ""}</h4>
              </div>
              <p className="avenir_class" style={{ lineHeight: "inherit" }}>
                {addr.city +","+addr.state+","+addr.country}
              </p>
              <p className="avenir_class" style={{ lineHeight: "inherit" }}>
                {addr.addressLine1 +"-"+addr.postalCode}
              </p>
              <h3>Mobile:{addr.phoneNumber ?? user.phone}</h3>
              <div className="class_justify_contents_row withGap">
                <Button buttonColor={"black"} buttonStyle="btn--outline" onClick={()=>deleteAddress(addr.id)}>
                  {loading ? (
                    <ImSpinner2
                      className="spin"
                      size={20}
                      style={{ marginInline: "auto" }}
                    />
                  ) : 'Remove'}
                </Button>

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