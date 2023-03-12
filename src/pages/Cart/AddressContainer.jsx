import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import useUser from "../../useUser";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import useFetch from "../../useFetch";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Checkout from "./Checkout";

const AddressContainer = ({
  billingAddresses,
  toggleCheckout,
  loadingAddr,
  setLoadingCourier,
  selected,
  cod,
  setSelected,
  setShippingFee,
  cartItems,
  loading,
  setLoading,
}) => {
  const { user, setUser } = useUser();
  const [checkout, setCheckout] = useState(false);
  if (selected) {
    selected.email = user.email;
  }

  const editAddress = async (values, setLoading) => {
    setLoading(true);
    try {
      const orderUrl = `${window.baseUrl}payment/editBillingAddress`;
      const { data } = await axios.post(orderUrl, {
        user_id: user._id,
        address_id: selected.id,
        billing_address: values,
      }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      setLoading(false);
      setCheckout(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteAddress = async (address_id) => {
    setLoading(true);
    try {
      const orderUrl = `${window.baseUrl}payment/deleteBillingAddress`;
      const { data } = await axios.post(orderUrl, {
        user_id: user._id,
        address_id: address_id,
      }); // never send price directly. Instead send product ID and handle the rest from backend
      console.log(data);
      setLoading(false);
      toggleCheckout();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.discount_price * item.quantityToBuy;
    });
    return totalPrice;
  };

  const {
    data: courierServices,
    loading: loadingCourier,
    error: errorloadingCourier,
  } = useFetch({
    url: window.baseUrl + "payment/getServiceability",
    fetchParamData: {
      products: cartItems,
      billing_address: selected,
      cod: cod,
      sub_total: getTotalPrice(),
    },
    secondParam: selected?.id,
    thirdParam: cod,
  });
  console.log(loadingCourier);

  useEffect(() => {
    if (selected) {
      if (!loadingCourier) {
        if (courierServices.status === 200) {
          console.log("setShippingFee has been run updately");
          setShippingFee(courierServices.lowest_charge.freight_charge);
          setLoadingCourier(false);
        } else {
          setShippingFee(0);
        }
      } else {
        setLoadingCourier(loadingCourier);
      }
      console.log("setShippingFee has been run");
    }
  }, [loadingCourier, selected?.id]);
  console.log(courierServices);

  return (
    <AnimatePresence>
      {checkout && (
        <Checkout
          toggleCheckout={() => setCheckout(!checkout)}
          loading={loading}
          setLoading={setLoading}
          isEdit={true}
          address={selected}
          editAddress={editAddress}
        />
      )}
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
        {billingAddresses?.billing_address.length === 0 && <NoDataFound />}
        {loadingAddr && (
          <div className="centerClass withColumn">
            <ImSpinner2
              className="spin"
              size={80}
              style={{ marginInline: "auto", color: "var(--success)" }}
            />
            <h4>Loading... addresses</h4>
          </div>
        )}
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
                {addr.city + "," + addr.state + "," + addr.country}
              </p>
              <p className="avenir_class" style={{ lineHeight: "inherit" }}>
                {addr.addressLine1 + "-" + addr.postalCode}
              </p>
              <h3>Mobile:{addr.phoneNumber ?? user.phone}</h3>
              {!loadingCourier && addr.id == selected?.id ? (
                <div style={{ color: "var(--danger)" }}>
                  {courierServices.status !== 200 && addr.id == selected?.id ? (
                    courierServices.message +
                    " Check phone number or postal code"
                  ) : courierServices.status === 200 ? (
                    <div
                      className=""
                      style={{ padding: "1rem", background: "#f3f3f3" }}
                    >
                      Expected Delivery days
                      {` ` +
                        courierServices.lowest_charge.estimated_delivery_days}
                    </div>
                  ) : (
                    courierServices.message +
                    " Check phone number or postal code"
                  )}
                </div>
              ) : (
                addr.id == selected?.id && (
                  <div
                    className="class_justify_contents_row withGap"
                    style={{ color: "var(--danger)" }}
                  >
                    <ImSpinner2
                      className="spin"
                      size={20}
                      style={{ marginInline: "auto" }}
                    />
                    <span>Loading Shipment details</span>
                  </div>
                )
              )}
              <div className="class_justify_contents_row withGap">
                <Button
                  buttonColor={"black"}
                  buttonStyle="btn--outline"
                  onClick={() => deleteAddress(addr.id)}
                >
                  {loading ? (
                    <ImSpinner2
                      className="spin"
                      size={20}
                      style={{ marginInline: "auto" }}
                    />
                  ) : (
                    "Remove"
                  )}
                </Button>
                <Button
                  style={{
                    background: " rgb(74 222 128)",
                    color: "white",
                    borderRadius: "2px",
                    padding: "0.5rem",
                  }}
                  onClick={() => setCheckout(true)}
                >
                  Edit
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
