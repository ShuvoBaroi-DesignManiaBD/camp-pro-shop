import CustomBreadCumb from "@/components/ui/BreadCumb";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useNavigation } from "react-router-dom";
const BreadCumbItems = [
  {
    title: "Dashboard",
  },
];
const AdminDashboard = () => {
  const navigate = useNavigate();
  const navigate2 = useNavigation();
  console.log(navigate, navigate2);

  return <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>;
};

export default AdminDashboard;
