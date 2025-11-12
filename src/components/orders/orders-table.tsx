import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table"
import { ExternalLink } from "lucide-react"
import React from "react"
import { Link } from "@mui/material"

export default function OrdersTable() {
  const orders = [
    {
      order_pkey: "1",
      customer: "John Doe",
      total: "R100.00",
      status: "Production",
      order_date: "2023-10-01",
      due_date: "2023-10-05",
      source: "Website",
      order_number: "ORD-001",
      payment_status: "Paid",
      items: [
        {
          order_item_pkey: "1",
          name: "Loafer",
          quantity: 2,
          price: "R50.00",
          size: "3",
          color: "Red",
          material: "Leather",
          stage: "Cutting",
          material_status: true,
          cutting: false,
          stitching: false,
          assembling: false,
          finishing: false
        },
        {
          order_item_pkey: "2",
          name: "Sneakers",
          quantity: 1,
          price: "R100.00",
          size: "4",
          color: "Blue",
          material: "Canvas",
          stage: "Stitching",
          material_status: true,
          cutting: true,
          stitching: false,
          assembling: false,
          finishing: false
        }
      ]
    },
    {
      order_pkey: "2",
      customer: "Jane Smith",
      total: "R200.00",
      status: "Production",
      order_date: "2023-10-02",
      due_date: "2023-10-06",
      source: "Website",
      order_number: "ORD-002",
      payment_status: "Paid",
      items: [
        {
          order_item_pkey: "3",
          name: "Boots",
          quantity: 1,
          price: "R200.00",
          size: "5",
          color: "Black",
          material: "Leather",
          stage: "Cutting",
          material_status: true,
          cutting: false,
          stitching: false,
          assembling: false,
          finishing: false
        }
      ]
    },
    {
      order_pkey: "3",
      customer: "Alice Johnson",
      total: "R150.00",
      status: "Completed",
      order_date: "2023-10-03",
      due_date: "2023-10-07",
      source: "Website",
      order_number: "ORD-003",
      payment_status: "Paid",
      items: [
        {
          order_item_pkey: "4",
          name: "Sandals",
          quantity: 1,
          price: "R150.00",
          size: "6",
          color: "Brown",
          material: "Leather",
          stage: "Cutting",
          material_status: true,
          cutting: false,
          stitching: false,
          assembling: false,
          finishing: false
        }
      ]
    }
  ]
  return (
    <>
      <div>
        <ul>
          {orders.map((order) => (
            <li className="mb-3" key={order.order_pkey}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-space-grotesk">
                    {order.customer} - {order.order_number}
                  </CardTitle>
                  <Link href="/production/order-details">
                    <div>
                      <ExternalLink className="h-4 w-4 mr-2" />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="w-2/5">
                    <div className="grid grid-cols-2">
                      <div className="">Total:</div>
                      <div className=""> {order.total}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="">Status:</div>
                      <div className="">
                        <Badge className="text-sm">{order.status}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="">Due Date:</div>
                      <div className="">{order.due_date}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="">Order Date:</div>
                      <div className="">{order.order_date}</div>
                    </div>
                  </div>

                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">
                            Quantity
                          </TableHead>
                          <TableHead className="font-semibold">Shoe</TableHead>
                          <TableHead className="font-semibold">Price</TableHead>
                          <TableHead className="font-semibold">Size</TableHead>
                          <TableHead className="font-semibold">Color</TableHead>
                          <TableHead className="font-semibold">
                            Material
                          </TableHead>
                          <TableHead className="font-semibold">Stage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item) => (
                          <React.Fragment key={item.order_item_pkey}>
                            <TableRow>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                <Link
                                  href={`/shoes/${item.fk_shoe}`}
                                  underline="none"
                                >
                                  {item.name}
                                </Link>
                              </TableCell>
                              <TableCell>{item.price}</TableCell>
                              <TableCell>{item.size}</TableCell>
                              <TableCell>{item.color}</TableCell>
                              <TableCell>{item.material}</TableCell>
                              <TableCell>{item.stage}</TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
