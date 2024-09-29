import CustomContainer from "@/components/layouts/CustomContainer";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import ButtonWithSpinner from "@/components/ui/buttons/ButtonWithSpinner";
import ProductCard from "@/components/ui/cards/ProductCard";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useFilterProductsQuery } from "@/redux/features/productFilters/productFiltersApi";
import { selectCurrentDevice } from "@/redux/features/ui/deviceType/deviceTypeSlice";
import { useAppSelector } from "@/redux/hooks";
import { TProduct, TUser } from "@/types";
import { Table, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
const BreadCumbItems = [
  {
    title: "Dashboard",
  },
];
const CustomerDashboard = () => {
  const currentUser: TUser | null = useAppSelector(selectCurrentUser);
  const isDesktop = useAppSelector(selectCurrentDevice)
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const navigate2 = useNavigation();
  console.log(navigate, navigate2);
  const { data, isFetching } = useMyOrdersQuery({
    userId: currentUser?._id,
    page: 1,
    limit: 10,
  });
  const { data: bestProducts, isFetching: status } = useFilterProductsQuery({
    queries: { rating: 5 },
    page: 1,
    limit: 2,
  });

  const columns = [
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
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>
          {status.toUpperCase()}
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

  // Handler for pagination change
  const handleTableChange = (pagination: any) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <div className="flex flex-col gap-10">
      <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <Title className="!font-bold !text-text/70" level={3}>
            Welcome {currentUser?.name}👋
          </Title>
          <Typography.Text className="!text-text/70">this is description</Typography.Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8 self-start">
          <div className="col-span-3">
            <Title level={4} className="p-0 !text-xl !font-semibold !text-text/70">
              Recent Orders
            </Title>
            <Table
              dataSource={data?.data?.orders}
              columns={columns}
              bordered
              rowKey={(record) => record._id}
              loading={isFetching ? true : false}
              className="[&&_div.ant-table]:my-2"
              pagination={false}
              // pagination={{
              //   current: page,
              //   pageSize: limit,
              //   showSizeChanger: true,
              //   pageSizeOptions: ["10", "15", "20"],
              //   total: data?.data?.totalOrders, // Assuming the API response includes total number of orders
              // }}
              onChange={handleTableChange} // Handle pagination changes
              scroll={{ x: "100%" }}
              size="small"
              tableLayout="auto"
            />
          </div>
          <div className="col-span-2 gap-4 space-y-10 self-start pt-10 md:pt-0">
            <Title level={4} className="p-0">
              Products you may like
            </Title>
            <CustomContainer className="text-gray-600 body-font !py-0">
          <div className="flex flex-col container mx-auto">
            {/* Product Cards */}
            <div className="grid grid-cols-2 gap-5 justify-center items-center mb-10 -mt-4 md:space-y-0 md:px-0">
              {bestProducts?.data?.map((product: TProduct) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  isLoading={isFetching}
                  className="w-full flex-grow [&&_div.discount]:hidden]"
                  discountSection={false}
                  advantagesSection={false}
                  imgStyles="w-full h-[150px]"
                  reviews={isDesktop && true}
                />
              ))}
            </div>

            {/* View More Button */}
            <ButtonWithSpinner
              text="View more"
              className="mx-auto hover:text-white"
              url="/products"
            />
          </div>
        </CustomContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
