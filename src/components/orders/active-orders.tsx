import { useState, useEffect } from "react"
import type { production_item } from "../../types/entities"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import Button from "@mui/material/Button"
import { IconButton, Link, TextField } from "@mui/material"
import Input from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table"
import { utils, writeFile } from "xlsx"
import { Download, Eye } from "lucide-react"

export function ActiveOrders() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [orders, setOrders] = useState<production_item[]>([])
  const [searchOrder, setSearchOrder] = useState<string>("")
  const [searchProduct, setSearchProduct] = useState<string>("")
  const [searchQuantity, setSearchQuantity] = useState<number | "">("")
  const [searchSource, setSearchSource] = useState<string>("")
  const [searchStatus, setSearchStatus] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOrder(event.target.value)
  }

  const handleProductSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchProduct(event.target.value)
  }

  const handleQuantitySearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuantity(parseInt(event.target.value))
  }

  const handleSourceSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchSource(event.target.value)
  }

  const handleStatusSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchStatus(event.target.value)
  }

  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Implement export functionality here
    console.log("Exporting orders data...")
    const ws = utils.json_to_sheet(orders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "Sheet1")

    writeFile(wb, "Aldora Orders.xlsx")
  }

  useEffect(() => {
    // Fetch active orders from API or other source
    setLoading(true)
    const fetchActiveOrders = async () => {
      const response = await fetch(
        `${apiBaseUrl}/orders/production?limit=0&ordernumber=${searchOrder}&product=${searchProduct}&quantity=${searchQuantity}&source=${searchSource}&status=${searchStatus}`
      )
      const data = await response.json()
      setOrders(data)
      setLoading(false)
    }
    fetchActiveOrders()
  }, [searchOrder, searchProduct, searchQuantity, searchSource, searchStatus])
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-space-grotesk ps-2">
          Active Production Orders
        </CardTitle>
        <Button variant="outlined" size="small" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="text-base">Order Details</div>
                <div className="mb-1">
                  <Input
                    value={searchOrder}
                    placeholder="Search Order Number"
                    className=" bg-muted/50"
                    onChange={handleSearchChange}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="text-base">Product</div>
                <div className="mb-1">
                  <Input
                    placeholder="Search Products"
                    className=" bg-muted/50"
                    value={searchProduct}
                    onChange={handleProductSearchChange}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="text-base">Quantity</div>
                <div className="mb-1">
                  <Input
                    type="number"
                    placeholder="Search Quantity"
                    className=" bg-muted/50"
                    min={1}
                    value={searchQuantity}
                    onChange={handleQuantitySearchChange}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="text-base">Source</div>
                <div className="mb-1">
                  <Input
                    type="text"
                    placeholder="Search Source"
                    className=" bg-muted/50"
                    value={searchSource}
                    onChange={handleSourceSearchChange}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="text-base">Status</div>
                <div className="mb-1">
                  <Input
                    type="text"
                    placeholder="Search Status"
                    className=" bg-muted/50"
                    value={searchStatus}
                    onChange={handleStatusSearchChange}
                  />
                </div>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!loading && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              orders.length > 0 &&
              orders.map((active_order: production_item) => (
                <TableRow key={active_order.order_item_pkey}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        <Link
                          underline="none"
                          href={`/production/order/${active_order.order_pkey}`}
                        >
                          {active_order.order_number}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Link
                          underline="none"
                          href={`/customers/${active_order.customer_pkey}`}
                        >
                          {active_order.first_name} {active_order.last_name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link
                        href={`/shoes/${active_order.fk_shoe}`}
                        underline="none"
                      >
                        <div className="font-medium">
                          {active_order.shoe_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {active_order.size}, {active_order.color}
                        </div>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{active_order.quantity}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{active_order.order_source}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {active_order.order_status === "Production" ? (
                      <Badge variant="default">In Production</Badge>
                    ) : active_order.order_status === "Received" ? (
                      <Badge variant="warning">Received</Badge>
                    ) : active_order.order_status === "Dispatch" ? (
                      <Badge variant="success">Dispatch</Badge>
                    ) : (
                      <Badge variant="destructive">
                        {active_order.order_status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="w-[50px]">
                    <IconButton
                      href={`/production/order/${active_order.order_pkey}`}
                    >
                      <Eye className="h-4 w-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
