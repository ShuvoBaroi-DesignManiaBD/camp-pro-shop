import CustomBreadCumb from "@/components/ui/BreadCumb";

const BreadCumbItems = [
    {
      title: "Profile",
    },
  ];
const Profile = () => {
    return (
        <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
    );
};

export default Profile;