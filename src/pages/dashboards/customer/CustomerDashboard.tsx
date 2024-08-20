import CustomBreadCumb from "@/components/ui/BreadCumb";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useNavigation } from "react-router-dom";
const BreadCumbItems = [
    {
      href: "",
      title: (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ),
    },
    {
      title: "Dashboard",
    },
  ];
const CustomerDashboard = () => {
    const navigate = useNavigate();
    const navigate2 = useNavigation();
    console.log(navigate, navigate2);
    
    return (
        <div>
            <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
        </div>
    );
};

export default CustomerDashboard;