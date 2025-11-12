import { Button } from "@mui/material"
import Input from "../ui/input"
import { Plus, Search } from "lucide-react"
import { IconButton } from "@mui/material"
import { ArrowLeft } from "lucide-react"

export default function () {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => {
              history.back()
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </IconButton>
          <div>
            <h1 className="text-3xl tracking-tight font-space-grotesk">
              Order Info
            </h1>
            <p className="text-muted-foreground">
              Manage and review order details
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button href="/production/neworder/0" variant="outlined" size="small">
          <Plus className="h-4 w-4 mr-2" /> New Order
        </Button>
      </div>
    </div>
  )
}
