import React, { useState } from "react";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { Table, Tag } from "antd";

const BreadCumbItems = [
  {
    title: "Order",
  },
];

const MyOrder = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(5); // State for page size

  const { data, isFetching } = useMyOrdersQuery({
    userId: currentUser?._id,
    page,
    limit,
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        `${address.street}, ${address.city}, ${address.country}, ${address.zip}`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Gateway",
      dataIndex: "gateWay",
      key: "gateWay",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  // Handler for pagination change
  const handleTableChange = (pagination) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <>
      <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
      <Table
        dataSource={data?.data?.orders}
        columns={columns}
        bordered
        rowKey={(record) => record._id}
        loading={isFetching ? true : false}
        className="[&&_div.ant-table]:my-10"
        pagination={{
          current: page,
          pageSize: limit,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          total: data?.data?.totalOrders, // Assuming the API response includes total number of orders
        }}
        onChange={handleTableChange} // Handle pagination changes
      />
    </>
  );
};

export default MyOrder;
