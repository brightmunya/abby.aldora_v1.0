import { useState, useEffect } from "react"
import { Card, CardContent } from "../../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "../../components/ui/table"
import { Link } from "@mui/material"
import ShoesHeader from "../../components/shoes/shoes-header"
import ShoesNew from "../../components/shoes/shoes-new"
import type { shoe, shoe_newview } from "../../types/entities"

export default function Shoes() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const [showForm, setShowForm] = useState(false)
  const [newShoe, setNewShoe] = useState<shoe_newview>({} as shoe_newview)
  const [catalog, setCatalog] = useState<shoe[]>([])
  const [loading, setLoading] = useState(true)

  const handleOpenNew = () => {
    setShowForm(true)
  }

  const handleCloseNewForm = () => {
    setShowForm(false)
    fetchCatalog()
  }

  const fetchCatalog = async () => {
    const response = await fetch(`${apiBaseUrl}/catalog`)
    if (response.ok) {
      const data = await response.json()

      setCatalog(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatalog()
  }, [])

  return (
    <>
      <div className="mb-4">
        {/* 
          description :   heading for the shoe section
          src         :   ../../components/shoes/shoes-header
         */}
        <ShoesHeader onOpenNewForm={handleOpenNew} />
      </div>
      <div className="mb-4">
        {showForm && (
          <Card>
            <CardContent>
              {/* 
                description :   new shoe form
                src         :   ../../components/shoes/shoes-new
              */}
              <ShoesNew onCloseForm={handleCloseNewForm} />
            </CardContent>
          </Card>
        )}
      </div>
      <Card className="m-2">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Sizes</TableCell>
                <TableCell>Colors</TableCell>
                <TableCell>Materials</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Cost</TableCell>
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
              {!loading && catalog.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No shoes found
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                catalog.length > 0 &&
                catalog.map((shoe) => (
                  <TableRow key={shoe.shoe_pkey}>
                    <TableCell>
                      <Link href={`/shoes/${shoe.shoe_pkey}`} underline="none">
                        <div>{shoe.name}</div>
                        <div>{shoe.code}</div>
                      </Link>
                    </TableCell>
                    <TableCell>{shoe.sizes && shoe.sizes.join(", ")}</TableCell>
                    <TableCell>
                      {shoe.colors && shoe.colors.join(", ")}
                    </TableCell>
                    <TableCell>
                      {shoe.materials && shoe.materials.join(", ")}
                    </TableCell>
                    <TableCell>{shoe.price && `R ${shoe.price}`}</TableCell>
                    <TableCell>{shoe.cost && `R ${shoe.cost}`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
