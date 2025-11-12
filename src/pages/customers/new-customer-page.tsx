import { Card, CardContent } from "../../components/ui/card"
import CustomerNew from "../../components/customers/customer-new"
import { ArrowLeft } from "lucide-react"
import { IconButton } from "@mui/material"

export default function CustomersNewPage() {
  return (
    <>
      <div className="flex items-center gap-4 space-y-2 mb-4">
        <IconButton href="/customers">
          <ArrowLeft className="h-4 w-4" />
        </IconButton>
        <div>
          <h1 className="text-3xl tracking-tight font-space-grotesk">
            New Customer
          </h1>
          <p className="text-muted-foreground">Create a new customer</p>
        </div>
      </div>
      <Card>
        <CardContent>
          <CustomerNew />
        </CardContent>
      </Card>
    </>
  )
}
