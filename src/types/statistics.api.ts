export interface StatisticsData {
    productCount: number;
    userCount: number;
    orderCount: number;
    totalRevenue: number;
    dailyRevenue: {
      _id: {
        day: number;
        month: number;
        year: number;
      };
      dailyRevenue: number;
    }[];
  }