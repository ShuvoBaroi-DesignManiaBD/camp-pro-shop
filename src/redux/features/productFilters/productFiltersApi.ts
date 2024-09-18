import { baseAPI } from "@/redux/api/baseApi";
import { setProducts } from "../product/productSlice";
import { setProductsCount } from "./productFiltersSlice";
import { TProduct } from "@/types";
import { FormValues } from "@/components/ui/sidebars/FilterSidebar";

const productApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    filterProducts: builder.query<
      any,
      { queries: FormValues | null; page?: number; limit?: number }
    >({
      query: ({ queries = null, page = 1, limit = 6 }) => {
        if (queries !== null) {
          const { searchTerm, categories, priceRange, rating, sort } = queries;
          // Build query parameters
          const queryParams = new URLSearchParams();

          if (searchTerm) {
            queryParams.append("searchTerm", searchTerm);
          }

          if (categories && categories.length > 0) {
            queryParams.append("categories", categories.join(","));
          }

          if (
            priceRange &&
            typeof priceRange.minPrice !== "undefined" &&
            typeof priceRange.maxPrice !== "undefined"
          ) {
            queryParams.append("minPrice", priceRange.minPrice.toString());
            queryParams.append("maxPrice", priceRange.maxPrice.toString());
          }

          if (typeof rating !== "undefined" && rating !== null) {
            queryParams.append("ratings", rating.toString());
          }

          // Manually construct the sort parameter to prevent URL encoding
          if (sort) {
            const sortParams: string[] = [];

            if (sort.price) {
              sortParams.push(`price:${sort.price}`);
            }

            if (sort.rating) {
              sortParams.push(`ratings:${sort.rating}`);
            }

            if (sortParams.length > 0) {
              queryParams.append("sort", sortParams.join(","));
            }
          }
          
          queryParams.append("page", `${page}`);
          queryParams.append("limit", `${limit}`);
          const queryString = queryParams.toString().replace(/%3A/g, ":"); // Replace encoded colon with plain colon

          return {
            url: `products?${queryString}`,
            method: "GET",
          };
        } else {
          return {
            url: `products?page=${page}&limit=${limit}`,
            method: "GET",
          };
        }
      },
      onQueryStarted: async (
        {},
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data.data as TProduct[])); // Dispatch the action to save products
          dispatch(setProductsCount(data?.totalProducts as number)); // Dispatch the action to save the product count
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
    }),
  }),
});

export const { useFilterProductsQuery } = productApi;