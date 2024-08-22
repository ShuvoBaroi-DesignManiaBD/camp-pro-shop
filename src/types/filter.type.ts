export interface FilterValues {
    searchTerm: string | null;
    categories: string[];
    priceRange: { minPrice: number; maxPrice: number };
    rating: number | null;
    sort: {
      price?: "asc" | "desc";
      rating?: "asc" | "desc";
    };
}