import { Icon } from "@iconify/react";
import React from "react";
import { useOutletContext } from "react-router-dom";
import "./AdminDashboard.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Overall from "./Overall";
import useUser from "../../../useUser";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";
import getSymbolFromCurrency from "currency-symbol-map";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const chartOptions = {
  responsive: true,
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      backgroundColor: "#ff724a",
    },
  },
};
const revenueByMonths = {
  labels: [
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ],
  data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
};
const chartData = {
  labels: revenueByMonths.labels,
  datasets: [
    {
      label: "Revenue",
      data: revenueByMonths.data,
      borderColor: "#fff",
      tension: 0.5,
    },
  ],
};

const AdminDashboard = ({ setHandleNotData }) => {
  const [click, setClick] = useOutletContext();
  const { user, setUser } = useUser();

  const handleClick = () => setClick(!click);
  const IconWrapper = ({ type, IconPadding, iconFontSize }) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              type === "sales"
                ? "#f25c3240"
                : type === "order"
                ? "#00c32a3e"
                : type === "revenue"
                ? "#ae18ff3d"
                : "#35448c36",
            // color: type === "request" ? "grey" : "white",
            color:
              type === "sales"
                ? "#F25B32"
                : type === "order"
                ? "#00C32B"
                : type === "revenue"
                ? "var(--light-purple)"
                : "var(--dashboard-dark-blue)",
            borderRadius: "50%",
            padding: IconPadding ?? "5px",
            fontSize: iconFontSize ?? "12px",
          }}
        >
          {type === "sales" && (
            <Icon borderRadius="1em" icon="icon-park-solid:sales-report" />
          )}
          {type === "order" && (
            <Icon icon="icon-park-solid:transaction-order" />
          )}
          {type === "visits" && <Icon icon="fa6-solid:people-robbery" />}
          {type === "revenue" && <Icon icon="fa-solid:money-check-alt" />}
        </div>
      </>
    );
  };

  const GridCard = ({ title, value, color, type, className }) => {
    const percentage = 66;
    return (
      <div
        className={`grid-card ${className}`}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="dashboard-card-row"
            style={{
              color:
                type === "sales"
                  ? "#F25B32"
                  : type === "order"
                  ? "#00C32B"
                  : type === "revenue"
                  ? "var(--light-purple)"
                  : "var(--dashboard-dark-blue)",
              fontWeight: "500",
            }}
          >
            <IconWrapper type={type ?? "sales"} />
            <p style={{ fontSize: "24px" }}>{value ?? "value"}</p>
          </div>
          <h4>Total {title} Today</h4>
          <h3
            style={{
              fontSize: window.innerWidth < 960 ? "14px" : "18px",
            }}
          >
            {title ?? "title"}
          </h3>
        </div>
        <div style={{ width: 80, height: 80 }}>
          <CircularProgressbarWithChildren
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor:
                type === "sales"
                  ? "#F25B32"
                  : type === "order"
                  ? "#00C32B"
                  : type === "revenue"
                  ? "var(--light-purple)"
                  : "var(--dashboard-dark-blue)",
              rotation: 0.25,
              pathTransitionDuration: 0.5,
            })}
          ></CircularProgressbarWithChildren>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavComponent
        personsName={user?.role_type ?? "Admin"}
        showNotification={true}
        handleClick={handleClick}
        pageTitle="Admin Dashboard"
        setHandleNotData={setHandleNotData}
      />
      <div className="admin_section">
        <div className="admin_grid">
          <GridCard
            title={"Sales"}
            value={getSymbolFromCurrency("INR") + "32"}
            type="sales"
          />
          <GridCard title={"Orders"} value="329" type="order" />
          <GridCard title={"Users"} value="21" type="revenue" />
          <GridCard title={"Visits"} value="32" type="visits" />
        </div>
        <div className="admin_revenue">
          <h2>REVENUE</h2>
          <h1>{getSymbolFromCurrency("INR")} 3293</h1>
          <Line options={chartOptions} data={chartData} />
        </div>
        <div className="admin_overall">
          <Overall />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
