import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ArrowRight, Eye } from "lucide-react"
const pipelineStages = [
  {
    name: "Inventory Check",
    orders: 8,
    capacity: 15,
    color: "bg-blue-500",
    progress: 53
  },
  {
    name: "Raw Materials Check",
    orders: 12,
    capacity: 20,
    color: "bg-purple-500",
    progress: 60
  },
  {
    name: "Cutting",
    orders: 23,
    capacity: 30,
    color: "bg-yellow-500",
    progress: 77
  },
  {
    name: "Closing",
    orders: 18,
    capacity: 25,
    color: "bg-orange-500",
    progress: 72
  },
  {
    name: "Making",
    orders: 31,
    capacity: 40,
    color: "bg-green-500",
    progress: 78
  },
  {
    name: "Dispatch",
    orders: 12,
    capacity: 20,
    color: "bg-indigo-500",
    progress: 60
  }
]

export function ProductionPipeline() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-space-grotesk">
            Production Pipeline
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time view of orders in each production stage
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium">{stage.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {stage.orders}/{stage.capacity}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {stage.progress}%
                  </span>
                  {index < pipelineStages.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <Progress value={stage.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
