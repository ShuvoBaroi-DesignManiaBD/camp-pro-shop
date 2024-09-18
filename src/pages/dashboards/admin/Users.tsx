import { useState } from "react";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import { Table, Tag } from "antd";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

const BreadCumbItems = [
  {
    title: "Mange Users",
  },
];

const Users = () => {
  // const currentUser = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10); // State for page size

  const { data, isFetching } = useGetAllProductsQuery({
    page,
    limit,
  })

  const products = data.data;

  const columns = [
    {
      title: "Product ID",
      dataIndex: "_id",
      key: "_id",
      render: (id:string) => id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Shipping Address",
    //   dataIndex: "address",
    //   key: "address",
    //   render: (address:Partial<TUser['address'] & {country:string, zip:string}>) =>
    //     `${address.street}, ${address.city}, ${address.country}, ${address.zip}`,
    // },
    {
      title: `Price`,
      dataIndex: "price",
      key: "price",
    },
    products?.currency &&
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Stock",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "isStock",
      key: "isStock",
      render: (isStock:boolean) => (
        <Tag color={isStock ? "green" : "red"}>
          {isStock ? 'In stock' : 'Out of stock'}
        </Tag>
      ),
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date:string) => new Date(date).toLocaleString(),
    // },
  ];

  // Handler for pagination change
  const handleTableChange = (pagination:any) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <>
      <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
      <Table
        dataSource={products}
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
          total: data?.totalProducts, // Assuming the API response includes total number of orders
        }}
        onChange={handleTableChange} // Handle pagination changes
      />
    </>
  );
};

export default Users;
