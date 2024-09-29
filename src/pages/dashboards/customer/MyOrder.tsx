import { useState } from "react";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { Table, Tag } from "antd";
import { TUser } from "@/types";

const BreadCumbItems = [
  {
    title: "My Orders",
  },
];

const MyOrder = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10); // State for page size

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
      render: (id:string) => id,
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
      render: (address:Partial<TUser['address'] & {country:string, zip:string}>) =>
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
      render: (status:string) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date:string) => new Date(date).toLocaleString(),
    },
  ];

  // Handler for pagination change
  const handleTableChange = (pagination:any) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <div className="space-y-0 min-w-[75vw]">
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
          pageSizeOptions: ["10", "15", "20"],
          total: data?.data?.totalOrders, // Assuming the API response includes total number of orders
        }}
        onChange={handleTableChange} // Handle pagination changes
        scroll={{ x: "100%" }}
        size="middle"
        tableLayout="auto"
      />
    </div>
  );
};

export default MyOrder;
