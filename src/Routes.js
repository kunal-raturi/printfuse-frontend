import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListingPage from "./pages/ProductListingPage";
import SubCategorySection from "./pages/SubCategorySection";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import StoreSetting from "./pages/Store/StoreSetting.jsx";

export const publicRoutes = [
  { path: "/category", component: <CategoryPage /> },
  {
    path: "/product-listing/:id",
    component: <ProductListingPage />,
  },
  {
    path: "/category/:categoryLabel/:subcategoryLabel",
    component: <ProductListingPage />,
  },
  {
    path: "/product-detail/:id",
    component: <ProductDetailPage />,
  },

  { path: "/category/:categoryLabel", component: <SubCategorySection /> },
  { path: "/signin", component: <Login /> },
  { path: "/signup", component: <Registration /> },
  { path: "/store-setting", component: <StoreSetting /> },
];
