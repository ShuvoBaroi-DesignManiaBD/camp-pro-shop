import { useEffect } from "react";
import { Pagination, Card, Skeleton, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentProducts,
} from "@/redux/features/product/productSlice";
import ProductCard from "@/components/ui/cards/ProductCard";
import FilterSidebar from "@/components/ui/sidebars/FilterSidebar";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import CustomContainer from "@/components/layouts/CustomContainer";
import ThemeConfig from "@/configs/ThemeConfig";
import { HomeOutlined } from "@ant-design/icons";
import { useFilterProductsQuery } from "@/redux/features/productFilters/productFiltersApi";
import {
  selectCurrentFilters,
  selectPage,
  selectPageSize,
  selectProductsCount,
  setPage,
  setPageSize,
} from "@/redux/features/productFilters/productFiltersSlice";
import { FilterValues } from "@/types/filter.type";

const BreadCumbItems = [
  {
    title: "Products",
  },
];

const Products = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectCurrentFilters);
  const currentPage = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const { data, isLoading, isFetching, refetch } =
    useFilterProductsQuery({
      queries: (filters as FilterValues) || null,
      page: currentPage,
      limit: pageSize,
    });

  const products = useAppSelector(selectCurrentProducts);
  const productsCount = useAppSelector(selectProductsCount);
  console.log(data, products);

  const handlePageChange = (page: number, newPageSize?: number) => {
    console.log(page, newPageSize);
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(setPage(1));
      dispatch(setPageSize(newPageSize));
      // refetch();
    } else if (page && currentPage !== page) {
      dispatch(setPage(page));
      // dispatch(setProducts(products || []));
      // refetch();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [currentPage, filters]);

  return (
    <CustomContainer className="py-8 antialiased md:py-20">
      <div className="mx-auto container px-4 2xl:px-0">
        {/* Heading & Filters */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <CustomBreadCumb links={BreadCumbItems} />
          {/* <Sorting /> */}
        </div>
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-6 items-start">
          <FilterSidebar />
          <div className="mb-4 grid justify-center gap-4 grid-cols-[repeat(autofit,_minmax(280px,_1fr))] sm:grid-cols-[repeat(3,_minmax(280px,_1fr))] sm:col-span-3 md:mb-8">
            {isLoading || isFetching ? (
              [...Array(pageSize)].map((_, index) => (
                <Card
                  key={index}
                  style={{ width: "100%" }}
                  cover={<Skeleton.Image active={true} className="!w-full" />}
                >
                  <Skeleton active className="col-span-4" />
                </Card>
              ))
            ) : products.length === 0 ? (
              <div className="h-[60vh] flex items-center justify-center col-span-full">
                <Empty
                  imageStyle={{ width: "240px", height: "200px" }}
                  className=""
                />
              </div>
            ) : (
              products?.map((product) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  className=""
                />
              ))
            )}
          </div>
        </div>

        <ThemeConfig>
          <Pagination
            total={productsCount || 0}
            current={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            className="col-span-4 mt-14 mx-auto flex justify-center"
            pageSizeOptions={["6", "9", "12", "18"]}
          />
        </ThemeConfig>
      </div>
    </CustomContainer>
  );
};

export default Products;
