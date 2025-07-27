import { Outlet } from "react-router-dom";
import AuthHeader from "../shared/AuthHeader";

export default function AuthLayout() {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  );
}
