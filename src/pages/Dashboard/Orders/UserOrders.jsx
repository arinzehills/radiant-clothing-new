import React, { useState, useEffect } from "react";
import Table from "../../../components/Table/Table";
import useFetch from "../../../useFetch";
import useUser from "../../../useUser";
import NavComponent from "../components/NavComponent/NavComponent";
import useToken from "../../../useToken";
import { Button } from "../../../components/Button/Button";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";
import getSymbolFromCurrency from "currency-symbol-map";

const UserOrders = () => {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const [click, setClick] = useOutletContext();
  const handleClick = () => setClick(!click);
  const {
    data: orders,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "payment/getUserOrders?token=" + token,
    // secondParam: activeRow,
  });
  let columnData = [
    // { heading: "Order ID", value: "razorpay.orderId" },
    { heading: "Total", value: "total" },
    { heading: "Sub Total", value: "sub_totals" },
    window.innerWidth < 590
      ? { heading: "Actions", value: "action" }
      : { heading: "Payment Status", value: "status" },
    { heading: "Date", value: "date" },
    window.innerWidth > 590
      ? { heading: "Actions", value: "action" }
      : { heading: "Payment Status", value: "status" },
  ];
  console.log(orders);
  !loading &&
    orders.forEach((order, index) => {
      // orderegoriesImage.push(image);
      order.sub_totals = getSymbolFromCurrency("INR") + eval(order.sub_total);

      order.total =
        getSymbolFromCurrency("INR") + (eval(order.amount) / 100).toFixed(1);
      order.date = moment(order.createdAt).format("MM/DD/YYYY hh:mm A");
      order.status = order.isPaid === true ? "Success" : "failed";
      order.action = (
        <div className="class_justify_contents_row">
          {/* <Button
            buttonColor={"black"}
            children={"Track Order"}
            style={{ background: "var(--success)", width: "100px" }}
          />
           */}
          <Button
            buttonColor={"orange"}
            style={{ width: "130px" }}
            children={"View Details"}
            onClick={() =>
              navigate("/dashboard/order-details", {
                state: { order_id: order.order_id },
              })
            }
            // style={{ background: "var(--success)", width: "100px" }}
          />
        </div>
      );
    });
  return (
    <div>
      <NavComponent
        personsName={user.email ?? "Admin"}
        handleClick={handleClick}
        pageTitle="Orders"
        // setHandleNotData={setHandleNotData}
      />
      <Table
        loading={loading}
        data={orders}
        onClickRow={(order) =>
          navigate("/dashboard/order-details", {
            state: { order_id: order.order_id },
          })
        }
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default UserOrders;
