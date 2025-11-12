import { ProductionHeader } from "../../components/production/production-header"
import ProductionOrders from "../../components/production/production-orders"

export default function ProductionPage() {
  return (
    <div className="p-2">
      <div className="space-y-6">
        <ProductionHeader />
        <ProductionOrders />
      </div>
    </div>
  )
}
