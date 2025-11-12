import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users, UserPlus, TrendingUp, MessageCircle } from "lucide-react"

export function CustomerStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-space-grotesk">2,847</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Leads</CardTitle>
          <UserPlus className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-space-grotesk">156</div>
          <p className="text-xs text-muted-foreground">+8 today</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-space-grotesk">68%</div>
          <p className="text-xs text-muted-foreground">+5% improvement</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
          <MessageCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-space-grotesk">23</div>
          <p className="text-xs text-muted-foreground">WhatsApp & Email</p>
        </CardContent>
      </Card>
    </div>
  )
}
