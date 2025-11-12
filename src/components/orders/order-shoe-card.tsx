import { useEffect, useState, type FormEvent, useRef } from "react"
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button
} from "@mui/material"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table"
import { type new_order_item } from "../../types/entities"
import { Card, CardContent, CardHeader } from "../ui/card"
import type { shoe } from "../../types/entities"
import { Save, X } from "lucide-react"
import NewOrderItemQuantity from "../orders/new-order-item"
import { SnackbarProvider, useSnackbar } from "notistack"

export default function OrderShoeCard({
  OrderId,
  onComplete
}: {
  OrderId: number
  onComplete: () => void
}) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const { enqueueSnackbar } = useSnackbar()
  const [catalog, setCatalog] = useState<shoe[]>([])
  const [shoeDetails, setShoeDetails] = useState<shoe>({} as shoe)
  const [newOrderItem, setNewOrderItem] = useState<new_order_item>(
    {} as new_order_item
  )
  const quantityRef = useRef(null)

  const handleSelectedShoe = (e: any) => {
    setNewOrderItem({
      ...newOrderItem,
      fk_shoe: e.target.value
    })
    var shoedetails = {} as shoe
    shoedetails = catalog.find((s) => s.shoe_pkey === e.target.value) as shoe
    setShoeDetails(shoedetails)
  }

  useEffect(() => {
    //get all the active shoes in the catalog
    const fetchCatalog = async () => {
      const response = await fetch(`${apiBaseUrl}/catalog`)
      if (response.ok) {
        const data = await response.json()
        setCatalog(data)
      }
    }
    console.log("Passed Order > ", OrderId)
    setNewOrderItem({
      ...newOrderItem,
      fk_order: OrderId
    })
    fetchCatalog()
  }, [OrderId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("order Id > ", OrderId)
    if (quantityRef.current) {
      const quantities = quantityRef.current.querySelectorAll("[data-abb-size]")
      let orderItems: new_order_item[] = []
      quantities.forEach((item: any) => {
        let quantity = item.getAttribute("data-abb-quantity")
        if (quantity > 0) {
          let selected_size = item.getAttribute("data-abb-size")
          let newItem = {
            fk_order: OrderId,
            fk_shoe: newOrderItem.fk_shoe,
            size: selected_size,
            color: newOrderItem.color,
            material: newOrderItem.material,
            price: shoeDetails.price,
            quantity: quantity,
            fullfillment: newOrderItem.fullfillment
          }
          orderItems.push(newItem)
        }
      })

      if (orderItems.length > 0) {
        fetch(`${apiBaseUrl}/orders/${OrderId}/addorderitems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderItems)
        })
          .then(async (response) => {
            if (response.ok) {
              enqueueSnackbar("New order items added", { variant: "success" })
              let data = await response.json()
              console.log("response > ", data)
            } else {
              let err = await response.text()
              console.log("err response > ", err)
            }
          })
          .finally(() => {
            //close card when completed
            onComplete()
          })
      }
    }
  }

  return (
    <SnackbarProvider>
      <Card className="border px-0 pt-2">
        <CardHeader className="pb-0 mb-0">
          <div className="flex justify-content-between">
            <div className="flex-grow">
              <Typography
                variant="h6"
                component="div"
                className="font-space-grotesk mb-0 pb-0"
              >
                Order Line Item
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="px-4">
              <div className="mb-4">
                <FormControl fullWidth size="small">
                  <InputLabel id="select-shoe-label">Shoe</InputLabel>
                  <Select
                    labelId="select-shoe-label"
                    id="select-shoe"
                    label="Shoe"
                    value={newOrderItem.fk_shoe}
                    onChange={handleSelectedShoe}
                  >
                    {catalog.map((item: shoe) => (
                      <MenuItem key={item.shoe_pkey} value={item.shoe_pkey}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="grid  md:grid-cols-3 gap-4 mb-2">
                <div>
                  <FormControl fullWidth size="small">
                    <InputLabel id="shoe-colors-label">Color</InputLabel>
                    <Select
                      labelId="shoe-colors-label"
                      id="shoe-colors"
                      input={<OutlinedInput label="Color" />}
                      MenuProps={MenuProps}
                      value={newOrderItem.color}
                      onChange={(e) => {
                        setNewOrderItem({
                          ...newOrderItem,
                          color: e.target.value
                        })
                      }}
                    >
                      {shoeDetails?.colors &&
                        shoeDetails?.colors.map((color: string) => (
                          <MenuItem key={color} value={color}>
                            {color}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth size="small">
                    <InputLabel id="shoe-materials-label">Material</InputLabel>
                    <Select
                      labelId="shoe-materials-label"
                      id="shoe-materials"
                      className="w-full"
                      input={<OutlinedInput label="Material" />}
                      value={newOrderItem.material}
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        setNewOrderItem({
                          ...newOrderItem,
                          material: e.target.value
                        })
                      }}
                    >
                      {shoeDetails?.materials &&
                        shoeDetails?.materials.map((material: string) => (
                          <MenuItem key={material} value={material}>
                            {material}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth size="small">
                    <InputLabel id="shoe-fulfillment-label">
                      Fulfillment
                    </InputLabel>
                    <Select
                      labelId="shoe-fulfillment-label"
                      id="shoe-fulfillment"
                      className="w-full"
                      input={<OutlinedInput label="Fulfillment" />}
                      value={newOrderItem.fullfillment}
                      MenuProps={MenuProps}
                      onChange={(e) => {
                        setNewOrderItem({
                          ...newOrderItem,
                          fullfillment: e.target.value
                        })
                      }}
                    >
                      {shoeDetails?.fulfillment &&
                        shoeDetails?.fulfillment.map((option: string) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            {shoeDetails && (
              <>
                <div className="mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold w-[150px]">
                          Size
                        </TableHead>
                        {shoeDetails?.sizes &&
                          shoeDetails?.sizes.map((size: number) => (
                            <TableHead
                              key={size}
                              className="text-center font-bold"
                            >
                              {size}
                            </TableHead>
                          ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow ref={quantityRef}>
                        <TableCell className="font-bold">Quantity</TableCell>
                        {shoeDetails?.sizes &&
                          shoeDetails?.sizes.map((size: number) => (
                            <TableCell className="font-bold">
                              <NewOrderItemQuantity
                                OrderItem={{
                                  size: size,
                                  fk_shoe: shoeDetails.shoe_pkey,
                                  color: newOrderItem.color,
                                  material: newOrderItem.material,
                                  price: shoeDetails.price,
                                  fullfillment: newOrderItem.fullfillment,
                                  fk_order: newOrderItem.fk_order,
                                  quantity: 0
                                }}
                              />
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
            <div className="flex mb-1">
              <div className="grow"></div>
              <div className="mr-2">
                <Button variant="contained" size="small" type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={onComplete}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </SnackbarProvider>
  )
}
