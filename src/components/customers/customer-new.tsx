import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useState } from "react"
import TextField from "@mui/material/TextField"
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import type { new_customer } from "../../types/customer-types"
import { SnackbarProvider, useSnackbar } from "notistack"

export default function CustomerNew() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [newCustomer, setNewCustomer] = useState<new_customer>({
    company: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email_address: "",
    type: 1,
    source: 1,
    status: 1,
    customer_code: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log("saving", newCustomer)
    fetch(`${apiBaseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    }).then(async (response) => {
      if (response.ok) {
        // Handle successful response
        enqueueSnackbar("Customer Saved", { variant: "success" })
        navigate("/customers")
      } else {
        let error = await response.text()
        console.log("Error - ", error)
      }
    })
  }

  return (
    <>
      <SnackbarProvider>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 my-3">
            <FormControl fullWidth size="small">
              <TextField
                label="Customer Code"
                size="small"
                fullWidth
                type="text"
                value={newCustomer.customer_code}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    customer_code: e.target.value
                  })
                }
              />
            </FormControl>
            <div></div>
            <FormControl fullWidth size="small">
              <TextField
                type="text"
                label="First Name"
                size="small"
                fullWidth
                required
                value={newCustomer.first_name}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    first_name: e.target.value
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth size="small">
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                required
                type="text"
                value={newCustomer.last_name}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    last_name: e.target.value
                  })
                }
              />
            </FormControl>

            <FormControl fullWidth size="small">
              <TextField
                label="Company"
                size="small"
                fullWidth
                type="text"
                value={newCustomer.company}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    company: e.target.value
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth size="small">
              <TextField
                label="Phone Number"
                size="small"
                fullWidth
                type="tel"
                value={newCustomer.phone_number}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    phone_number: e.target.value
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth size="small">
              <TextField
                label="Email"
                size="small"
                fullWidth
                required
                type="email"
                value={newCustomer.email_address}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    email_address: e.target.value
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="customer-type-label">Customer Type</InputLabel>
              <Select
                labelId="customer-type-label"
                label="Customer Type"
                value={newCustomer.type}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    type: e.target.value
                  })
                }
              >
                <MenuItem value="1">Regular</MenuItem>
                <MenuItem value="2">VIP</MenuItem>
                <MenuItem value="3">Prospect</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex">
            <div className="flex-1"></div>
            <div>
              <Button variant="outlined" className="px-4 py-2" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </SnackbarProvider>
    </>
  )
}
