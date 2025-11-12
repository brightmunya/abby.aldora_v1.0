import { useState, type FormEvent } from "react"
import { SnackbarProvider, useSnackbar } from "notistack"
import type { customer, order_newview } from "../../types/entities"
import CustomerMiniCard from "./customer-mini-card"
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button
} from "@mui/material"
import { Card, CardContent } from "../ui/card"

export default function CustomerNewOrder({
  Customer,
  onNext
}: {
  Customer: customer
  onNext: (order_id: number) => void
}) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const { enqueueSnackbar } = useSnackbar()
  const [newOrder, setNewOrder] = useState<order_newview>({
    fk_customer: Customer.customer_pkey,
    order_date: "",
    due_date: "",
    fk_salesperson: 1,
    fk_source: 1,
    order_number: "",
    is_paid: false
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${apiBaseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    }).then(async (response) => {
      if (response.ok) {
        let data = await response.json()
        console.log("saving order.. ", data)
        enqueueSnackbar("New Order Saved", { variant: "success" })
        onNext(data.order_id)
      }
    })
  }

  return (
    <>
      <SnackbarProvider>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2">
                <div className="mb-4">
                  {/*
                    description:   display mini customer details
                    src:           ./customer-mini-card
                */}
                  <CustomerMiniCard Customer={Customer} />
                </div>
              </div>
              <div>Order Details</div>
              <div className="my-3 grid gap-3 grid-cols-3 md:grid-cols-2">
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Order Number"
                      className="w-full"
                      size="small"
                      value={newOrder.order_number}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          order_number: e.target.value
                        })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="fk_source_id">Source</InputLabel>
                    <Select
                      labelId="fk_source_id"
                      id="fk_source"
                      size="small"
                      value={newOrder.fk_source}
                      label="Source"
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, fk_source: e.target.value })
                      }
                    >
                      <MenuItem value={1}>Direct</MenuItem>
                      <MenuItem value={2}>Shopify</MenuItem>
                      <MenuItem value={3}>Facebook</MenuItem>
                      <MenuItem value={4}>Internal</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Order Date"
                      required
                      fullWidth
                      size="small"
                      type="date"
                      slotProps={{ inputLabel: { shrink: true } }}
                      value={newOrder.order_date}
                      onChange={(e) => {
                        setNewOrder({
                          ...newOrder,
                          order_date: e.target.value
                        })
                      }}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Due Date"
                      size="small"
                      type="date"
                      slotProps={{ inputLabel: { shrink: true } }}
                      value={newOrder.due_date}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, due_date: e.target.value })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="fk_salesperson_id">Salesperson</InputLabel>
                    <Select
                      id="fk_salesperson"
                      value={newOrder.fk_salesperson}
                      label="Salesperson"
                      size="small"
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          fk_salesperson: e.target.value
                        })
                      }
                    ></Select>
                  </FormControl>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={newOrder.is_paid}
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            is_paid: e.target.checked
                          })
                        }
                      />
                    }
                    label="Paid"
                  />
                </div>
              </div>
              <div className="text-end">
                <Button variant="outlined" type="submit">
                  Create Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </SnackbarProvider>
    </>
  )
}
