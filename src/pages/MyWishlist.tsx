import CustomBreadCumb from "@/components/ui/BreadCumb";

const BreadCumbItems = [
    {
      title: "My Wishlist",
    },
  ];
const MyWishlist = () => {
    return (
        <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
    );
};

export default MyWishlist;