import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader2/Loader2";
import NoDataFound from "../NoDataFound/NoDataFound";
// import OnlineStatus from "../../../components/OnlineStatus";
// import DraftReqestModal from "../../../components/RequestHero/DraftReqestModal";
// import NoDataFound from "../../Dashboard/Request/NoDataFound";
import "./Table.css";

const Table = ({
  data,
  columnData,
  loading,
  loaderType,
  isAdmin,
  setAssignFreelancerName,
  handleAssignFreelancer,
  messageNotFound,
  showNotFoundPosition,
  onClickRowButton,
  onClickResendButton,
  setDeleteModal,
  showCaret,
  onClickRow,
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const TableHeadItem = ({ item }) => (
    <th>
      {item.heading} {showCaret && <CaretIcon />}
    </th>
  );
  const handleClickRow = () => {};
  const TableRow = ({ item, column, index }) => (
    <tr onClick={() => onClickRow(item)}>
      {column.map((columnItem, index) => {
        return columnItem.value === "online_status" ? (
          //   <OnlineStatus value={item[`${columnItem.value}`]} />
          <div>online Status</div>
        ) : columnItem.value === "image" ? (
          <img src={item[`${columnItem.value}`]} height="100px" width="100px" />
        ) : (
          <td key={index}>{item[`${columnItem.value}`]}</td>
        );
      })}
    </tr>
  );
  return (
    <>
      {/* {showAssignModal && (
        <DraftReqestModal
          top={0}
          message={"Confirm Assign! "}
          onClick={handleAssignFreelancer}
          setOpenModal={setShowAssignModal}
        />
      )} */}
      <table>
        <thead>
          {columnData.map((item, index) => (
            <TableHeadItem item={item} key={index} />
          ))}
        </thead>
        <tbody>
          {loading ? (
            <Loader2 />
          ) : (
            data.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                column={columnData}
                index={index}
                setShowAssignModal={setShowAssignModal}
                isAdmin={isAdmin}
                setAssignFreelancerName={setAssignFreelancerName}
              />
            ))
          )}
        </tbody>
      </table>
      {data?.length === 0 && (
        // <div>NO data</div>
        <NoDataFound />
        // <NoDataFound
        //   message={messageNotFound}
        //   showpositionClass={showNotFoundPosition}
        // />
      )}
    </>
  );
};
const CaretIcon = () => {
  return (
    <>
      <Icon
        color="grey"
        icon="bxs:up-arrow"
        rotate={2}
        style={{ borderRadius: "10px" }}
      />
    </>
  );
};

export default Table;
