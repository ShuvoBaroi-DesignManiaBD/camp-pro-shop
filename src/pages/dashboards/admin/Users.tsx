import { useState } from "react";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import { Table, Tag } from "antd";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";
import { TUser } from "@/types";
import { Avatar } from "antd";

const BreadCumbItems = [
  {
    title: "Mange Users",
  },
];

// Function to generate a random color based on the user's name
const getRandomColor = (name: string) => {
  const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#ff4d4f"];
  const index = name ? name.charCodeAt(0) % colors.length : 0; // Generate index based on first letter of name
  return colors[index];
};

const Users = () => {
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10); // State for page size

  const { data, isFetching } = useAllUsersQuery({
    page,
    limit,
  });

  const users = data?.data || []; // Ensure data is defined

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string, record: TUser) => {
        if (photo) {
          // If photo exists, show the image
          return <img src={photo} alt={record.name} width="40px" />;
        } else {
          // If no photo, show an Avatar with the first letter of the user's name
          const avatarColor = getRandomColor(record.name || "User");
          return (
            <Avatar size={40} style={{ backgroundColor: avatarColor }}>
              {record.name?.charAt(0).toUpperCase() || "U"} {/* Fallback to 'U' if name is missing */}
            </Avatar>
          );
        }
      },
    },
    {
      title: "Users ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: Partial<TUser["address"] & { country: string; zip: string }>) =>
        `${address?.street || ""}, ${address?.city || ""}, ${address?.country || ""}, ${address?.zip || ""}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role:('admin'|'customer')) => (
        <Tag color={role === "admin" ? "purple" : "green"}>
          {role}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <>
      <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
      <Table
        dataSource={users}
        columns={columns}
        bordered
        rowKey={(record) => record._id}
        loading={isFetching}
        className="[&&_div.ant-table]:my-10"
        pagination={{
          current: page,
          pageSize: limit,
          showSizeChanger: true,
          pageSizeOptions: [10, 15, 20], // Use numbers instead of strings
          total: data?.totalUsers || 0, // Ensure this is the correct field for total users
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Users;