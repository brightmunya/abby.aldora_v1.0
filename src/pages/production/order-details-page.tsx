import React from "react"
import { useParams } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../../components/ui/card"
import OrderHeader from "../../components/orders/order-header"
import type {
  customer,
  order_detailview,
  order_item,
  production_status
} from "../../types/entities"
import { Button, IconButton, Menu } from "@mui/material"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table"
import CustomerMiniCard from "../../components/customers/customer-mini-card"
import OrderSteps from "../../components/orders/order-steps"
import { DeleteIcon, Plus, TrashIcon } from "lucide-react"
import OrderShoeCard from "../../components/orders/order-shoe-card"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Link } from "@mui/material"

export default function OrderDetails() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  interface RouteParams {
    id: string
  }
  const params = useParams()
  const [order, setOrder] = React.useState<order_detailview>(
    {} as order_detailview
  )
  const [orderItems, setOrderItems] = React.useState<order_item[]>([])
  const [customer, setCustomer] = React.useState<customer>({} as customer)
  const [orderKey, setOrderKey] = React.useState<number>(0)
  const [productionStatuses, setProductionStatuses] = React.useState<
    production_status[]
  >([])
  const [addItems, setAddItems] = React.useState(false)

  const handleNewOrderItemAdded = () => {
    setAddItems(false)
    fetchOrderItems()
  }

  const fetchOrderItems = async () => {
    const response = await fetch(`${apiBaseUrl}/orders/${params.id}/items`)
    const data = await response.json()
    setOrderItems(data)
  }

  // Fetch order details and items from API
  const fetchOrderDetails = async () => {
    const response = await fetch(`${apiBaseUrl}/orders/${params.id}`)
    const data = await response.json()
    setOrder(data)
  }

  const fetchProductionStatuses = async () => {
    const response = await fetch(`${apiBaseUrl}/config/productionstatus`)
    const data = await response.json()
    setProductionStatuses(data)
  }

  const handleUpdateStatus = async (productionStage: number) => {
    const response = await fetch(`${apiBaseUrl}/orders/updateorderitemstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_item_pkey: orderKey,
        production_stage_pkey: productionStage
      })
    })

    if (response.ok) {
      fetchOrderDetails()
      fetchOrderItems()
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const btn = event.currentTarget as HTMLButtonElement
    const orderItemPkey = btn.getAttribute("data-abb-orderitem")
    setOrderKey(orderItemPkey ? parseInt(orderItemPkey) : 0)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = async (orderItemPkey: number) => {
    const response = await fetch(
      `${apiBaseUrl}/orders/deleteorderitem/${orderItemPkey}`,
      {
        method: "DELETE"
      }
    )

    if (response.ok) {
      fetchOrderItems()
    }
  }

  React.useEffect(() => {
    const fetchOrderCustomer = async () => {
      const response = await fetch(
        `${apiBaseUrl}/orders/${params.id}/getcustomer`
      )
      const data = await response.json()
      setCustomer(data)
    }

    fetchProductionStatuses()
    fetchOrderDetails()
    fetchOrderItems()
    fetchOrderCustomer()
  }, [params.id])

  return (
    <div className="p-3">
      <div className="pb-4 mb-2">
        <OrderHeader />
      </div>
      <div className="grid grid-cols-3 mb-3 gap-3">
        <div>
          <CustomerMiniCard
            Customer={{
              customer_pkey: customer.customer_pkey ?? 0,
              first_name: customer.first_name ?? "",
              last_name: customer.last_name ?? "",
              email_address: customer.email_address ?? "",
              phone_number: customer.phone_number ?? ""
            }}
          />
        </div>

        <div className="col-span-2">
          <OrderSteps activeStep={order.fk_orderstatus || 0} />
          <div></div>
        </div>
      </div>
      <div>
        {!addItems && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-space-grotesk ps-2">
                Order Items
              </CardTitle>
              {order.fk_orderstatus === 1 && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setAddItems(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shoe
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Shoe</TableHead>
                    <TableHead className="font-semibold">Size</TableHead>
                    <TableHead className="font-semibold">Color</TableHead>
                    <TableHead className="font-semibold">Material</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold w-[50px] text-center">
                      Status
                    </TableHead>
                    <TableHead className="w-[25px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems &&
                    orderItems.length > 0 &&
                    orderItems.map((item) => (
                      <React.Fragment key={item.order_item_pkey}>
                        <TableRow>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            <Link
                              href={`/shoes/${item.fk_shoe}`}
                              underline="none"
                            >
                              <div>{item.shoe_name}</div>
                              <div>{item.shoe_code}</div>
                            </Link>
                          </TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.color}</TableCell>
                          <TableCell>{item.material}</TableCell>
                          <TableCell className="text-end">
                            R{" "}
                            {item.price?.toLocaleString("en-ZA", {
                              minimumFractionDigits: 2
                            }) ?? 0.0}
                          </TableCell>
                          <TableCell>
                            <Button
                              id="demo-positioned-button"
                              loading={false}
                              size="small"
                              aria-controls={
                                open ? "demo-positioned-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              data-abb-orderitem={item.order_item_pkey}
                              onClick={handleClick}
                            >
                              {item.fk_production_stage > 0
                                ? item.production_stage
                                : "Pending"}
                            </Button>
                            <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left"
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                              }}
                            >
                              {productionStatuses &&
                                productionStatuses.map((status) => (
                                  <MenuItem
                                    key={status.production_stage_pkey}
                                    value={status.name}
                                    onClick={() => {
                                      handleUpdateStatus(
                                        status.production_stage_pkey
                                      )
                                      handleClose()
                                    }}
                                  >
                                    {status.name}
                                  </MenuItem>
                                ))}
                            </Menu>
                          </TableCell>
                          <TableCell>
                            {item.fk_production_stage < 6 && (
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDeleteClick(item.order_item_pkey)
                                }
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {addItems && (
          <OrderShoeCard
            OrderId={order.order_pkey}
            onComplete={handleNewOrderItemAdded}
          />
        )}
      </div>
    </div>
  )
}
