import { useState, type FormEvent } from "react"
//import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Card, CardContent } from "../ui/card"
import type { customer_order_newview } from "../../types/entities"
import { SnackbarProvider, useSnackbar } from "notistack"

export default function OrderNew({
  onNext
}: {
  onNext: (order_id: number) => void
}) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  //const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [newOrder, setNewOrder] = useState<customer_order_newview>(
    {} as customer_order_newview
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitting new order: ", newOrder)
    fetch(`${apiBaseUrl}/orders/newcustomerorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrder)
    }).then(async (response) => {
      if (response.ok) {
        let data = await response.json()
        console.log("saving... ", data)
        enqueueSnackbar("New Order Saved", { variant: "success" })
        onNext(data.order_id)
      }
    })
  }

  return (
    <SnackbarProvider>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="p-4 w-full">
              <div>Customer</div>
              <div className="grid gap-3 my-3 grid-cols-1 md:grid-cols-2">
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="First Name"
                      required
                      className="w-full"
                      size="small"
                      value={newOrder.first_name}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          first_name: e.target.value
                        })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Last Name"
                      required
                      className="w-full"
                      size="small"
                      value={newOrder.last_name}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          last_name: e.target.value
                        })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      className="w-full"
                      required
                      size="small"
                      type="email"
                      value={newOrder.email_address}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          email_address: e.target.value
                        })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Phone"
                      className="w-full"
                      size="small"
                      type="tel"
                      value={newOrder.phone_number}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          phone_number: e.target.value
                        })
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      label="Company"
                      className="w-full"
                      size="small"
                      value={newOrder.company}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, company: e.target.value })
                      }
                    />
                  </FormControl>
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="fk_source_id">Source</InputLabel>
                    <Select
                      labelId="fk_source_id"
                      id="fk_source"
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
                  <FormControl fullWidth size="small">
                    <TextField
                      label="Order Date"
                      required
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
                  <FormControl fullWidth size="small">
                    <TextField
                      label="Due Date"
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
                  <FormControl size="small" fullWidth>
                    <InputLabel id="fk_salesperson_id">Salesperson</InputLabel>
                    <Select
                      id="fk_salesperson"
                      value={newOrder.fk_salesperson}
                      label="Salesperson"
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          fk_salesperson: e.target.value
                        })
                      }
                    ></Select>
                  </FormControl>
                </div>

                <FormControlLabel
                  control={
                    <Switch
                      checked={newOrder.is_paid}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, is_paid: e.target.checked })
                      }
                    />
                  }
                  label="Paid"
                />
              </div>
              <div className="text-end">
                <Button variant="outlined" type="submit">
                  Create Order
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </SnackbarProvider>
  )
}
