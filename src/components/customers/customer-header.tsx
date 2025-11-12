import { Button } from "@mui/material"
import Input from "../ui/input"
import { Plus } from "lucide-react"

export default function CustomerHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl tracking-tight font-space-grotesk">
          Customers
        </h1>
        <p className="text-muted-foreground">Welcome to the customers page</p>
      </div>
      <div className="flex items-center gap-2">
        <Button href="/customers/newcustomer" variant="outlined" size="small">
          <Plus className="h-4 w-4 mr-2" /> New Customer
        </Button>
      </div>
    </div>
  )
}
