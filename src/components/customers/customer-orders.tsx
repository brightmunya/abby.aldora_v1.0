import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Link } from "@mui/material"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table"
import { Button, IconButton } from "@mui/material"
import { Eye, Package } from "lucide-react"
import type { customer_order_listview } from "../../types/entities"

export default function CustomerOrders({ customerId }: { customerId: number }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [orders, setOrders] = useState<customer_order_listview[]>([])

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const response = await fetch(
        `${apiBaseUrl}/orders/customer/${customerId}`
      )
      const data = await response.json()
      setOrders(data)
    }

    fetchCustomerOrders()
  }, [customerId])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-space-grotesk ps-2">Order History</CardTitle>
        <Button
          variant="outlined"
          size="small"
          href={`/production/neworder/${customerId}`}
        >
          <Package className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <TableRow key={order.order_pkey}>
                  <TableCell>
                    <Link
                      href={`/production/order/${order.order_pkey}`}
                      underline="none"
                    >
                      <div className="font-medium">{order.order_number}</div>
                    </Link>
                  </TableCell>
                  <TableCell>{order.total_quantity}</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-end">
                    R{" "}
                    {order.total_price?.toLocaleString("en-ZA", {
                      minimumFractionDigits: 2
                    }) ?? 0.0}
                  </TableCell>
                  <TableCell>
                    {order.orderstatus === "Production" ? (
                      <Badge variant="default">In Production</Badge>
                    ) : order.orderstatus === "Received" ? (
                      <Badge variant="warning">Received</Badge>
                    ) : order.orderstatus === "Dispatch" ? (
                      <Badge variant="success">Dispatch</Badge>
                    ) : (
                      <Badge variant="destructive">{order.orderstatus}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton href={`/production/order/${order.order_pkey}`}>
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
