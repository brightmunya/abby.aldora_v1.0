import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom"
import Layout from "./layouts/layout.tsx"
import Dashboard from "./pages/dashboard.tsx"
import Customers from "./pages/customers/index.tsx"
import CustomerDetailPage from "./pages/customers/customer-page.tsx"
import OrdersPage from "./pages/production/orders.tsx"
import ProductionPage from "./pages/production/index.tsx"
import ProductionOrderNew from "./pages/production/new-order-page.tsx"
import OrderDetails from "./pages/production/order-details-page.tsx"
import Shoes from "./pages/products/shoes.tsx"
import ShoeDetails from "./pages/products/shoe-details.tsx"
import CustomersNewPage from "./pages/customers/new-customer-page.tsx"
import ShoeEditPage from "./pages/products/edit-shoe.tsx"

import "./App.css"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Customers />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetailPage />} />
        <Route path="customers/newcustomer" element={<CustomersNewPage />} />
        <Route path="production/Orders" element={<OrdersPage />} />
        <Route path="production" element={<ProductionPage />} />
        <Route
          path="production/neworder/:id"
          element={<ProductionOrderNew />}
        />
        <Route path="production/order/:id" element={<OrderDetails />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="shoes/:id" element={<ShoeDetails />} />
        <Route path="shoes/edit/:id" element={<ShoeEditPage />} />
        <Route path="reports" element={<div>Reports</div>} />
        <Route path="integrations" element={<div>Integrations</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
