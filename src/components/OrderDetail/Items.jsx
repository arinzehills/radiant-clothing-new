import React, { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import Products from "../../pages/Admin/Products/Products";
import { Button } from "../Button/Button";
import AnimatedModal from "../AnimatedModal/AnimatedModal";
import AddReview from "../Reviews/AddReview";

const Items = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <AnimatedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalHeight="300px"
      >
        <AddReview setOpenModal={setOpenModal} />
      </AnimatedModal>
      <div
        className="centerClass"
        style={{
          justifyContent: "space-between",
          maxWidth: "600px",
          background: "rgb(255, 245, 250)",
          boxShadow: "var(--box-shadow)",
          borderRadius: "20px",
          padding: "12px",
        }}
      >
        <div className="class_justify_contents_row withGap">
          <img src={item.images[0]} alt="" height={"100px"} />
          <div>
            <h3>{item.product_name}</h3>
            <p style={{ textTransform: "capitalize" }}>
              <span style={{ marginBlock: 5, fontWeight: 600 }}>Category</span>{" "}
              - {item.category}
            </p>
            <Button
              buttonColor={"orange"}
              children={"Rate item"}
              style={{ color: "white", height: "40px", width: "100px" }}
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div>
          <p>selling price:{item.selling_price}</p>
          <p>gst:{item.gst}</p>
          <p>quantity:{item.quantityToBuy}</p>
        </div>
      </div>
    </>
  );
};

export default Items;
