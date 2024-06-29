import { title } from "process";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "E-Shop Admin",
  description: "MoonEye E-Shop Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
