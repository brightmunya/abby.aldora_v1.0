import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { AlertTriangle, Package, Plus } from "lucide-react"

const alerts = [
  {
    item: "Premium Leather",
    currentStock: 45,
    minStock: 100,
    unit: "sq ft",
    severity: "high"
  },
  {
    item: "Canvas Material",
    currentStock: 78,
    minStock: 150,
    unit: "yards",
    severity: "medium"
  },
  {
    item: "Rubber Soles",
    currentStock: 23,
    minStock: 50,
    unit: "pairs",
    severity: "high"
  },
  {
    item: "Thread (Black)",
    currentStock: 12,
    minStock: 25,
    unit: "spools",
    severity: "medium"
  },
  {
    item: "Shoe Glue",
    currentStock: 3,
    minStock: 10,
    unit: "bottles",
    severity: "critical"
  }
]

export function InventoryAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-space-grotesk">Inventory Alerts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Items requiring attention
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Package className="h-4 w-4 mr-2" />
          Manage Stock
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg border"
          >
            <AlertTriangle
              className={`h-4 w-4 mt-0.5 ${
                alert.severity === "critical"
                  ? "text-red-500"
                  : alert.severity === "high"
                  ? "text-orange-500"
                  : "text-yellow-500"
              }`}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{alert.item}</p>
                <Badge
                  variant={
                    alert.severity === "critical"
                      ? "destructive"
                      : alert.severity === "high"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Current: {alert.currentStock} {alert.unit} | Min:{" "}
                {alert.minStock} {alert.unit}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs bg-transparent"
              >
                <Plus className="h-3 w-3 mr-1" />
                Reorder
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
