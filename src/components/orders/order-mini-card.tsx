import { Card, CardContent, CardHeader } from "../ui/card"
import type { order_miniview } from "../../types/entities"
import { Typography } from "@mui/material"

export default function OrderMiniCard({ Order }: { Order: order_miniview }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <Typography variant="h6" className="font-space-grotesk mb-0 py-0">
          Order
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <div>Order Number:</div>
          </div>
          <div className="col-span-2">
            <div>{Order.order_number}</div>
          </div>
          <div className="col-span-1">
            <div>External Reference:</div>
          </div>
          <div className="col-span-2">
            <div>{Order.external_reference}</div>
          </div>
          <div className="col-span-1">
            <div>Order Date:</div>
          </div>
          <div className="col-span-2">
            <div>{new Date(Order.order_date).toLocaleDateString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
