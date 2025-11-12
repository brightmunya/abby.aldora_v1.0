import { Button } from "@mui/material"
import { Plus, Search } from "lucide-react"
import Input from "../ui/input"

export default function ShoesHeader({
  onOpenNewForm
}: {
  onOpenNewForm: () => void
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl tracking-tight font-space-grotesk">Shoe</h1>
        <p className="text-muted-foreground">
          Manage production workflow and inventory levels
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          className="w-[150px]"
          size="small"
          onClick={onOpenNewForm}
        >
          <Plus className="h-4 w-4 mr-2" /> New Shoe
        </Button>
      </div>
    </div>
  )
}
