import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button, CardContent, Link, IconButton } from "@mui/material"
import { Download, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableRow, TableHeader } from "../ui/table"
import type { shoe_order_view } from "../../types/entities"
import { utils, writeFile } from "xlsx"
import { data } from "react-router-dom"

export default function ProductionOrders() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [orders, setOrders] = useState<shoe_order_view[]>([])
  const [loading, setLoading] = useState(true)
  const [orderStatus, setOrderStatus] = useState(2)
  const activeStatusClass = "bg-white rounded px-2 py-1 shadow"
  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Implement export functionality here
    console.log("Exporting orders data...")
    const ws = utils.json_to_sheet(orders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "Sheet1")
    let today = new Date()
    let day = today.getDay()
    let month = today.getMonth() + 1
    let year = today.getFullYear()

    writeFile(wb, `Production_${year}_${month}_${day}.xlsx`)
  }

  useEffect(() => {
    const fetchProdcutionOrders = async () => {
      const response = await fetch(
        `${apiBaseUrl}/reports/orderitemsbysizes?status=${orderStatus}`
      )
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
        setLoading(false)
      }
    }

    fetchProdcutionOrders()
  }, [orderStatus])
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="p-2 ">Production Orders</CardTitle>
          <div>
            <div className="flex justify-center text-gray-500 gap-4 bg-gray-100 p-2 rounded">
              <div className="text-gray-500">
                <label
                  className={
                    orderStatus === 2
                      ? `${activeStatusClass} w-[150px]`
                      : "cursor-pointer w-[150px]"
                  }
                  onClick={() => setOrderStatus(2)}
                >
                  <input
                    type="radio"
                    name="status"
                    value={2}
                    className="me-1 hidden"
                    checked={orderStatus === 2}
                  ></input>
                  In Production
                </label>
              </div>
              <div>
                <label
                  className={
                    orderStatus === 3
                      ? `${activeStatusClass} w-[200px]`
                      : "cursor-pointer w-[200px]"
                  }
                  onClick={() => setOrderStatus(3)}
                >
                  <input
                    type="radio"
                    name="status"
                    value={3}
                    className="me-1 hidden"
                    checked={orderStatus === 3}
                  ></input>
                  Dispatch
                </label>
              </div>
            </div>
          </div>
          <Button size="small" variant="outlined" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Order Num</TableCell>
                <TableCell className="w-[18%]">Customer Name</TableCell>
                <TableCell className="w-[18%]">Shoe</TableCell>
                <TableCell></TableCell>
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
                    <TableCell className="w-[18%]">
                      <Link
                        href={`/customers/${order.customer_pkey}`}
                        underline="none"
                      >
                        {order.first_name} {order.last_name}
                      </Link>
                    </TableCell>
                    <TableCell className="w-[18%]">
                      <Link href={`/shoes/${order.fk_shoe}`} underline="none">
                        <div>{order.name}</div>
                        <div>{order.shoe_code}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>{order.material}</div>
                      <div>{order.color}</div>
                    </TableCell>
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
    </>
  )
}
