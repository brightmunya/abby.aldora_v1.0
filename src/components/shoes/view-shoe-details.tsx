import * as React from "react"
import { Card, CardContent } from "../ui/card"
import { Pencil } from "lucide-react"
import ViewShoeOrders from "./view-shoe-orders"
import { IconButton } from "@mui/material"
import type { shoe } from "../../types/entities"

export default function ShoeDetails({ shoeId }: { shoeId: number }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [shoeObject, setShoeObject] = React.useState<shoe>({} as shoe)

  React.useEffect(() => {
    // Fetch shoe details from API using shoeId
    // and update state
    const fetchShoe = async () => {
      const response = await fetch(`${apiBaseUrl}/catalog/${shoeId}`)
      if (response.ok) {
        const data = await response.json()

        setShoeObject(data)
      }
    }

    fetchShoe()
  }, [shoeId])

  return (
    <div className="m-2">
      <div className="grid grid-cols-2 mb-3">
        <div>
          <Card>
            <CardContent>
              {shoeObject && (
                <div>
                  <div className="float-right">
                    <IconButton href="/shoes/edit/1">
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 text-gray-700">
                    <div className="font-semibold">Code:</div>
                    <div className="col-span-2 text-gray-500">
                      {shoeObject?.code}
                    </div>
                    <div className="font-semibold">Name:</div>
                    <div className="col-span-2">{shoeObject?.name}</div>
                    <div className="font-semibold">Sizes:</div>
                    <div className="col-span-2">
                      {shoeObject?.sizes &&
                        shoeObject?.sizes.length > 0 &&
                        shoeObject?.sizes.join(", ")}
                    </div>
                    <div className="font-semibold">Colors:</div>
                    <div className="col-span-2">
                      {shoeObject?.colors &&
                        shoeObject?.colors.length > 0 &&
                        shoeObject?.colors.join(", ")}
                    </div>
                    <div className="font-semibold">Materials:</div>
                    <div className="col-span-2">
                      {shoeObject?.materials &&
                        shoeObject?.materials.length > 0 &&
                        shoeObject?.materials.join(", ")}
                    </div>
                    <div className="font-semibold">Price:</div>
                    <div className="col-span-2">
                      R{shoeObject?.price && shoeObject?.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div></div>
      </div>
      <div>
        <ViewShoeOrders shoeId={shoeId} />
      </div>
    </div>
  )
}
