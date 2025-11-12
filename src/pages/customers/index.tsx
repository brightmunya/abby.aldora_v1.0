import { CustomersTable } from "../../components/customers/customers-table"
import CustomerHeader from "../../components/customers/customer-header"

export default function Customers() {
  return (
    <div className="p-3">
      <CustomerHeader />
      <div className="my-4">
        <CustomersTable />
      </div>
    </div>
  )
}
