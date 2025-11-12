import { Card, CardContent, CardHeader } from "../ui/card"
import type { customer } from "../../types/entities"
import { Typography, Link } from "@mui/material"
export default function CustomerMiniCard({ Customer }: { Customer: customer }) {
  return (
    <Card>
      <CardHeader>
        <Typography variant="h6" className="font-space-grotesk mb-0 pb-0">
          Customer Details
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Name:</div>
          <Link underline="none" href={`/customers/${Customer.customer_pkey}`}>
            <div className="col-span-2">
              {Customer.first_name} {Customer.last_name}
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Email:</div>
          <div className="col-span-2">{Customer.email_address}</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">Phone:</div>
          <div className="col-span-2">{Customer.phone_number}</div>
        </div>
      </CardContent>
    </Card>
  )
}
