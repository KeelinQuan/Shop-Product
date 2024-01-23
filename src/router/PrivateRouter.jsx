import { Navigate } from "react-router-dom";

export default function PrivateRouter(props) {
  var user = localStorage.getItem("user");
//   var roleOfUser = user?.role?.name;
  console.log(">>role", roleOfUser);

  switch (props.role) {
    case "AuthenticatedCheck":
      if (roleOfUser == "Authenticated" || roleOfUser == "Manager") {
        return props.children;
      }
      break;
    case "ManagerCheck":
      if (roleOfUser == "Manager") {
        return props.children;
      }
      break;
  }

  return <Navigate to="/login"></Navigate>;
}
