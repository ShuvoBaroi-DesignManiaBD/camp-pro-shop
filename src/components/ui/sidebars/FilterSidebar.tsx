import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  InputNumber,
  Radio,
  Rate,
  Row,
  Col,
  Button,
  Select,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCurrentFilters,
  setFilters,
  setPage,
  setProductsCount,
} from "@/redux/features/productFilters/productFiltersSlice";
// import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
// import {
//   selectCurrentProducts,
//   // setProducts,
// } from "@/redux/features/product/productSlice";
import { useFilterProductsQuery } from "@/redux/features/productFilters/productFiltersApi";
// import { FilterValues } from "@/types/filter.type";
import ThemeConfig from "@/configs/ThemeConfig";

const { Group: CheckboxGroup } = Checkbox;
const { Option } = Select;

const categories = ["Fashion", "Electronics", "Furniture", "Books", "Toys"];

export interface FormValues {
  searchTerm?: string | null;
  categories?: string[];
  priceRange?: { minPrice: number; maxPrice: number };
  rating?: number | null;
  sort?: {
    price?: "asc" | "desc";
    rating?: "asc" | "desc";
  };
}

const SidebarFilter: React.FC = () => {
  // const [formData, setFormData] = useState<FormValues | null>(null);
  const productFilters = useAppSelector(selectCurrentFilters);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset} = useForm<FormValues>({
    defaultValues: {
      searchTerm: null,
      categories: [],
      priceRange: { minPrice: 0, maxPrice: 50000 },
      rating: null,
      sort: { price: "asc" },
    },
  });

  // Fetch filtered products based on the current filters
  const { data } = useFilterProductsQuery(
    (productFilters as any) || null
  );
  // const products = useAppSelector(selectCurrentProducts);

  const onSubmit = async (filterData: FormValues) => {
    dispatch(setFilters(filterData));
    // refetch();
    dispatch(setPage(1));
    // dispatch(setProducts(products || []));
    dispatch(setProductsCount(data?.totalProducts || 0));
  };

  const clearFilters = () => {
    reset();
    dispatch(
      setFilters({
        searchTerm: null,
        categories: [],
        priceRange: { minPrice: 0, maxPrice: 99999 },
        rating: null,
        sort: {},
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-sm bg-white p-8">
      <ThemeConfig>
        <>
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Search</h3>
            <Controller
              name="searchTerm"
              control={control}
              render={({ field }) => (
                <Input.Search
                  placeholder="Search by name or description"
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleSubmit(onSubmit)();
                  }}
                  enterButton={<SearchOutlined />}
                  onSearch={() => handleSubmit(onSubmit)()}
                />
              )}
            />
          </div>
          <div className="space-y-2 mt-5">
            <h3 className="text-base font-semibold">Categories</h3>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={categories.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="space-y-2 mt-5">
            <h3 className="text-base font-semibold">Price Range</h3>
            <Row gutter={16}>
              <Col>
                <Controller
                  name="priceRange.minPrice"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      min={0}
                      max={99999}
                      value={field.value}
                      onChange={field.onChange}
                      formatter={(value) => `$ ${value}`}
                    />
                  )}
                />
              </Col>
              <Col>-</Col>
              <Col>
                <Controller
                  name="priceRange.maxPrice"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      min={1}
                      max={99999}
                      value={field.value}
                      onChange={field.onChange}
                      formatter={(value) => `$ ${value}`}
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
          <div className="space-y-2 mt-5">
            <h3 className="text-base font-semibold">Rating</h3>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Radio.Group value={field.value} onChange={field.onChange}>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Radio value={rating} key={rating}>
                      <Rate disabled defaultValue={rating} /> & Up
                    </Radio>
                  ))}
                </Radio.Group>
              )}
            />
          </div>
          <div className="space-y-2 mt-5">
            <h3 className="text-base font-semibold">Sort By</h3>
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Sort"
                  value={
                    field.value.price
                      ? `Price: ${
                          field.value.price === "asc"
                            ? "Low to High"
                            : "High to Low"
                        }`
                      : field.value.rating
                      ? `Rating: ${
                          field.value.rating === "asc"
                            ? "Low to High"
                            : "High to Low"
                        }`
                      : undefined
                  }
                  onChange={(value) => {
                    const [type, order] = value.split("-");
                    field.onChange({ [type]: order });
                  }}
                  style={{ width: "100%" }}
                >
                  <Option value="price-asc">Price: Low to High</Option>
                  <Option value="price-desc">Price: High to Low</Option>
                  <Option value="rating-asc">Rating: Low to High</Option>
                  <Option value="rating-desc">Rating: High to Low</Option>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2 mt-5">
            <Row justify="space-between">
              <Col>
                <Button type="default" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Apply Filters
                </Button>
              </Col>
            </Row>
          </div>
        </>
      </ThemeConfig>
    </form>
  );
};

export default SidebarFilter;
