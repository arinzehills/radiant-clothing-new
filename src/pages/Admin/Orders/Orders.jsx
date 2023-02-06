import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";
import Table from "../../../components/Table/Table";
import useFetch from "../../../useFetch";
import useToken from "../../../useToken";
import useUser from "../../../useUser";
import { Button } from "../../../components/Button/Button";
import moment from "moment";

const Orders = () => {
  const [click, setClick] = useOutletContext();
  const handleClick = () => setClick(!click);
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const {
    data: ordersData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "payment/orders?token=" + token,
    // secondParam: activeRow,
  });
  let columnData = [
    // { heading: "Order ID", value: "razorpay.orderId" },
    { heading: "Total", value: "total" },
    { heading: "Sub Total", value: "sub_total" },
    { heading: "Payment Status", value: "status" },
    { heading: "Date", value: "date" },
    { heading: "Actions", value: "action" },
  ];
  const orders = ordersData?.orders;
  console.log(ordersData);

  console.log(orders);
  !loading &&
    orders.forEach((order, index) => {
      // orderegoriesImage.push(image);
      order.total = order.amount / 100;
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
            children={"View Details"}
            onClick={() =>
              navigate("/admin/order-details", {
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
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Orders"
        // setHandleNotData={setHandleNotData}
      />
      <Table
        loading={loading}
        data={orders}
        onClickRow={(order) =>
          navigate("/admin/order-details", {
            state: { order_id: order.order_id },
          })
        }
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default Orders;
