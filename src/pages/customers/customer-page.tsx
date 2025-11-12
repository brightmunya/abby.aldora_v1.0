import React from "react"
import { ArrowLeft, Edit } from "lucide-react"
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import CustomerProfile from "../../components/customers/customer-profile"
import CustomerOrders from "../../components/customers/customer-orders"
import { IconButton } from "@mui/material"
import type { customer_details } from "../../types/entities"

export default function CustomerDetailPage() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  interface RouteParams {
    id: string
  }
  const params = useParams()
  const [customer, setCustomer] = React.useState<customer_details>(
    {} as customer_details
  )

  React.useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`${apiBaseUrl}/customers/${params.id}`)
      const data = await response.json()
      setCustomer(data)
    }

    fetchCustomer()
  }, [params.id])
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton href="/customers">
            <ArrowLeft className="h-4 w-4" />
          </IconButton>
          <div className="mb-3">
            <h1 className="text-3xl  tracking-tight font-space-grotesk">
              {customer.first_name} {customer.last_name}
            </h1>
            <p className="text-muted-foreground">
              Customer No.: {customer.customer_code}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outlined">
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <CustomerProfile customer={customer} />
        </div>
        <div className="md:col-span-2 space-y-6">
          <CustomerOrders customerId={customer.customer_pkey} />
        </div>
      </div>
    </div>
  )
}
