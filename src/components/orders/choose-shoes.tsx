import OrderShoeCard from "./order-shoe-card"
import CustomerMiniCard from "../customers/customer-mini-card"
import OrderMiniCard from "./order-mini-card"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button, Typography } from "@mui/material"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader
} from "../ui/table"
import {
  type order_detailview,
  type customer_details,
  type order_item
} from "../../types/entities"
import { Plus } from "lucide-react"

export default function ChooseShoes({ OrderId }: { OrderId: number }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [addOrderItem, setOpenAddOrderItem] = React.useState(false)
  const [order, setOrder] = React.useState<order_detailview>(
    {} as order_detailview
  )
  const [customer, setCustomer] = React.useState<customer_details>(
    {} as customer_details
  )
  const [orderLineItems, setOrderLineItems] = React.useState<order_item[]>(
    {} as order_item[]
  )
  const fetchOrderItems = async () => {
    const response = await fetch(`${apiBaseUrl}/orders/${OrderId}/items`)

    if (response.ok) {
      const data = await response.json()

      setOrderLineItems(data)
    } else {
      const err = await response.text()
      console.log("line items > ", err)
    }
  }

  const handleNewOrderItemAdded = () => {
    setOpenAddOrderItem(false)
    fetchOrderItems()
  }

  React.useEffect(() => {
    {
      /* description:  Get the order */
    }
    const fetchOrder = async () => {
      const response = await fetch(`${apiBaseUrl}/orders/${OrderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      }
    }

    const fetchCustomer = async () => {
      const response = await fetch(
        `${apiBaseUrl}/orders/${OrderId}/getcustomer`
      )
      if (response.ok) {
        const data = await response.json()
        console.log("customer > ", data)
        setCustomer(data)
      }
    }

    fetchOrder()
    fetchCustomer()
    fetchOrderItems()
  }, [OrderId])

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mb-3 gap-3">
        <div>
          {/*description:   display mini customer details
          src:              customers/customer-mini-card*/}
          <CustomerMiniCard
            Customer={{
              customer_pkey: customer.customer_pkey,
              first_name: customer.first_name,
              last_name: customer.first_name,
              email_address: customer.email_address,
              phone_number: customer.phone_number ?? ""
            }}
          />
        </div>
        <div>
          {/*description:   display mini order details
          src:            ./order-mini-card */}
          <OrderMiniCard
            Order={{
              order_number: order.order_number,
              order_pkey: order.order_pkey,
              order_date: order.order_date,
              external_reference: order.external_reference ?? ""
            }}
          />
        </div>
      </div>
      {/*description:   display shoes added to the order
          src:            ./order-shoe-card */}
      {addOrderItem === false && (
        <div className="mb-4">
          <Card>
            <CardHeader className="mb-0">
              <Typography variant="h6">Order Shoes</Typography>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Shoe</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Size</TableHead>
                    <TableHead className="font-semibold">Color</TableHead>
                    <TableHead className="font-semibold">Material</TableHead>
                    <TableHead className="font-semibold">Stage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderLineItems &&
                    orderLineItems.length > 0 &&
                    orderLineItems.map((item) => (
                      <React.Fragment key={item.order_item_pkey}>
                        <TableRow>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.shoes.name}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.color}</TableCell>
                          <TableCell>{item.material}</TableCell>
                          <TableCell>{item.stage}</TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  <TableRow>
                    <TableCell colSpan={7} className="font-bold text-center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenAddOrderItem(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Shoe
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="w-full">
        {/*description:   add new shoes to the order
          src:            ./order-shoe-card */}
        {addOrderItem && (
          <OrderShoeCard
            OrderId={OrderId}
            onComplete={handleNewOrderItemAdded}
          />
        )}
      </div>
    </div>
  )
}
