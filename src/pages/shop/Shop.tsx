import BreadCumb from "@/components/ui/BreadCumb";
import Sorting from "./Sorting";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { Button, Card, Image, Pagination, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import ThemeConfig from "@/configs/ThemeConfig";
import CustomContainer from "@/components/layouts/CustomContainer";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: pageSize,
});

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <CustomContainer className="py-8 antialiased md:py-20">
      <div className="mx-auto container px-4 2xl:px-0">
        {/* Heading & Filters */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <BreadCumb />
          <Sorting />
        </div>
        <div className="mb-4 grid justify-center gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
                cover={<Skeleton.Image active={true} className="!w-full" />}
              >
                <Skeleton active className="col-span-4" />
              </Card>
            </>
          ) : (
            data?.data.map((product: Partial<TProduct>) => (
              <ProductCard key={product?._id} product={product} />
            ))
          )}
        </div>

        <ThemeConfig>
          <Pagination
            total={data?.totalProducts || 0} // Assuming `totalItems` is the total count from the API
            current={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            className="col-span-4 mt-14 mx-auto flex justify-center"
          />
        </ThemeConfig>
      </div>
    </CustomContainer>
  );
};

export default Shop;
