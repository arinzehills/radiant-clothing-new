import handleNot from "../components/HandleNotification/HandleNot";

const handleDelete = async (url, setSuccess) => {
  console.log(url);
  const response = await fetch(url, { method: "POST" });
  const json = await response.json();
  let r = (Math.random() + 1).toString(36).substring(7);
  setSuccess(url);
  if (response.ok) {
    handleNot({
      title: "Deleted",
      message: "deleted successfully",
      backgroundColor: "var(--success)",
    });
  } else {
    console.log(json);
  }
};
export default handleDelete;
