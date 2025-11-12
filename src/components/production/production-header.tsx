import { Button } from "@mui/material"
import { Plus, Search } from "lucide-react"

export function ProductionHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight font-space-grotesk">
            Production
          </h1>
          <p className="text-muted-foreground">View Orders In Production</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          href="/production/neworder/0"
          variant="outlined"
          size="small"
          className="w-[150px]"
        >
          <Plus className="h-4 w-4 mr-2" /> New Order
        </Button>
      </div>
    </div>
  )
}
