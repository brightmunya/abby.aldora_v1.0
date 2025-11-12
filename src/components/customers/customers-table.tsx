import { useEffect, useState } from "react"
import IconButton from "@mui/material/IconButton"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Download, Eye } from "lucide-react"
import { Link, Button } from "@mui/material"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table"
import { utils, writeFile } from "xlsx"
import type { customer_details } from "../../types/entities"

export function CustomersTable() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [customers, setCustomers] = useState<customer_details[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch order details and items from API
    const fetchCustomers = async () => {
      const response = await fetch(`${apiBaseUrl}/customers/active`)
      const data = await response.json()
      setCustomers(data)
      setLoading(false)
    }

    fetchCustomers()
  }, [])

  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Implement export functionality here
    console.log("Exporting customer data...")
    const ws = utils.json_to_sheet(customers)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "Sheet1")
    utils.sheet_add_aoa(
      ws,
      [
        [
          "Customer No.",
          "Customer Code",
          "Company",
          "First Name",
          "Last Name",
          "Email Address",
          "Phone number",
          "Status",
          "Customer Type",
          "Total Orders",
          "Total Spent",
          "Last Order",
          "First Order",
          "Source"
        ]
      ],
      { origin: "A3" }
    )
    writeFile(wb, "Aldora-Customers.xlsx")
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-space-grotesk ps-2">
          Customer Directory
        </CardTitle>
        <Button variant="outlined" size="small" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15%]">Customer</TableHead>
              <TableHead className="w-[25%]">Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="scrollable-table-container">
            {loading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              customers.map((customer) => (
                <TableRow key={customer.customer_pkey}>
                  <TableCell className="w-[15%]">
                    <div className="flex items-center gap-3">
                      <div>
                        <Link
                          href={`/customers/${customer.customer_pkey}`}
                          underline="none"
                        >
                          {customer.first_name} {customer.last_name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {customer.customer_code}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[25%]">
                    <div className="space-y-1">
                      <div className="text-sm">{customer.email_address}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.phone_number}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "Active"
                          ? "default"
                          : customer.status === "Lead"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer.total_orders}
                  </TableCell>
                  <TableCell className="font-medium text-end">
                    R{" "}
                    {customer.total_spent?.toLocaleString("en-ZA", {
                      minimumFractionDigits: 2
                    }) ?? 0.0}
                  </TableCell>
                  <TableCell>
                    {customer.last_order_date ? (
                      <div className="text-sm">
                        {new Date(
                          customer.last_order_date
                        ).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {customer.source === 1 ? "Direct" : "Online"}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[50px]">
                    <IconButton href={`/customers/${customer.customer_pkey}`}>
                      <Eye className="h-4 w-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
