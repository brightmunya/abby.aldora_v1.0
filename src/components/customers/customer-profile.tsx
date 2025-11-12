import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../../components/ui/badge"
import { MapPin, Calendar, Star, ShoppingBag } from "lucide-react"
import type { customer_details } from "../../types/entities"

export default function CustomerProfile({
  customer
}: {
  customer: customer_details
}) {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div>
            <p className="text-muted-foreground">{customer.email_address}</p>
            <p className="text-muted-foreground">{customer.phone_number}</p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={
                customer.status === "Active"
                  ? "default"
                  : customer.status === "Lead"
                  ? "secondary"
                  : "outline"
              }
            >
              {customer.status}
            </Badge>
            <Badge
              variant={customer.type === "VIP" ? "destructive" : "outline"}
            >
              {customer.type}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {customer.billing_address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Billing Address</p>
                <div className="text-sm text-muted-foreground">
                  {customer.billing_address.line1}
                  <br />
                  {customer.billing_address.line2 && (
                    <div>{customer.billing_address.line2}</div>
                  )}
                  {customer.billing_address.city && (
                    <div>{customer.billing_address.city}</div>
                  )}
                  {customer.billing_address.province && (
                    <div>{customer.billing_address.province}</div>
                  )}
                  {customer.billing_address.country && (
                    <div>{customer.billing_address.country}</div>
                  )}
                  {customer.billing_address.postal_code && (
                    <div>{customer.billing_address.postal_code}</div>
                  )}
                </div>
              </div>
            </div>
          )}
          {customer.first_order_date && (
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Customer Since</p>

                <p className="text-sm text-muted-foreground">
                  {new Date(customer.first_order_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold font-space-grotesk text-primary">
              {customer.total_orders}
            </p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-space-grotesk text-primary">
              R{" "}
              {customer.total_spent?.toLocaleString("en-ZA", {
                minimumFractionDigits: 2
              }) ?? 0.0}
            </p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
