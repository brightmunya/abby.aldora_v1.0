import * as React from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Eye, Download } from "lucide-react"
import { IconButton, Link, Button } from "@mui/material"
import type { shoe_order_view } from "../../types/entities"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import { utils, writeFile } from "xlsx"
export default function ViewShoeOrders({ shoeId }: { shoeId: number }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [orderStatus, setOrderStatus] = React.useState("in-production")
  const [orders, setOrders] = React.useState<shoe_order_view[]>([])

  const [loading, setLoading] = React.useState(true)

  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Implement export functionality here
    console.log("Exporting orders data...")
    const ws = utils.json_to_sheet(orders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "Sheet1")

    writeFile(wb, `Aldora Shoe Orders.xlsx`)
  }

  React.useEffect(() => {
    // Fetch shoe details from API using shoeId
    // and update state
    const fetchShoe = async () => {
      const response = await fetch(`${apiBaseUrl}/catalog/${shoeId}/orders`)
      if (response.ok) {
        const data = await response.json()

        setOrders(data)
        setLoading(false)
      }
    }

    fetchShoe()
  }, [shoeId])

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex">
            <div className="flex-1">
              <h2 className="text-lg font-medium ps-2">Shoe Orders</h2>
            </div>
            <div>
              <Button variant="outlined" size="small" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Order Num</TableCell>
                <TableCell className="w-[20%]">Customer Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell className="text-center w-[40px]">3</TableCell>
                <TableCell className="text-center w-[40px]">4</TableCell>
                <TableCell className="text-center w-[40px]">5</TableCell>
                <TableCell className="text-center w-[40px]">6</TableCell>
                <TableCell className="text-center w-[40px]">7</TableCell>
                <TableCell className="text-center w-[40px]">8</TableCell>
                <TableCell className="text-center w-[40px]">9</TableCell>
                <TableCell className="w-[50px]"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200 scrollable-table-container">
              {loading && (
                <TableRow>
                  <TableCell colSpan={13} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!loading && orders && orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={13} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <TableRow key={order.order_item_pkey}>
                    <TableCell>
                      <Link
                        href={`/production/order/${order.fk_order}`}
                        underline="none"
                      >
                        {order.order_number || "N/A"}
                      </Link>
                    </TableCell>
                    <TableCell className="w-[20%]">
                      <Link
                        href={`/customers/${order.customer_pkey}`}
                        underline="none"
                      >
                        {order.first_name} {order.last_name}
                      </Link>
                    </TableCell>
                    <TableCell>{order.color}</TableCell>
                    <TableCell>{order.material}</TableCell>
                    <TableCell>
                      {order.order_status === "Production" ? (
                        <Badge variant="default">In Production</Badge>
                      ) : order.order_status === "Received" ? (
                        <Badge variant="warning">Received</Badge>
                      ) : order.order_status === "Dispatch" ? (
                        <Badge variant="success">Dispatch</Badge>
                      ) : (
                        <Badge variant="destructive">
                          {order.order_status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_3 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_4 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_5 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_6 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_7 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_8 || ""}
                    </TableCell>
                    <TableCell className="text-center w-[40px]">
                      {order.size_9 || ""}
                    </TableCell>
                    <TableCell className="w-[50px]">
                      <IconButton href={`/production/order/${order.fk_order}`}>
                        <Eye className="h-4 w-4" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
