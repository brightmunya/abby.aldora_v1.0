import { useEffect, useState } from "react"
import { TextField } from "@mui/material"
import type { new_order_item } from "../../types/entities"

export default function NewOrderItemQuantity({
  OrderItem
}: {
  OrderItem: new_order_item
}) {
  const [orderItem, setOrderItem] = useState(OrderItem)

  useEffect(() => {
    setOrderItem(OrderItem)
  }, [OrderItem])

  return (
    <div>
      <TextField
        size="small"
        type="number"
        value={orderItem.quantity}
        data-abb-size={orderItem.size}
        data-abb-quantity={orderItem.quantity}
        min={0}
        onChange={(e) =>
          setOrderItem({ ...orderItem, quantity: parseInt(e.target.value) })
        }
      ></TextField>
    </div>
  )
}
