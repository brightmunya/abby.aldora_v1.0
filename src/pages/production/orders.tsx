import { OrdersHeader } from "../../components/production/Orders-header"
import { ActiveOrders } from "../../components/orders/active-orders"

export default function OrdersPage() {
  return (
    <div className="p-2">
      <div className="space-y-6">
        <OrdersHeader />
        <ActiveOrders />
      </div>
    </div>
  )
}
