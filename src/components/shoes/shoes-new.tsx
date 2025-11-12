import { useState, type FormEvent } from "react"
import { FormControl, TextField } from "@mui/material"
import { Button } from "@mui/material"
import { Card, CardContent } from "../ui/card"
import type { shoe_newview } from "../../types/entities"
import { SnackbarProvider, useSnackbar } from "notistack"

export default function ShoesNew({ onCloseForm }: { onCloseForm: () => void }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const { enqueueSnackbar } = useSnackbar()
  const [newShoe, setNewShoe] = useState<shoe_newview>({} as shoe_newview)
  const [shoeImage, setShoeImage] = useState("")
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("sizes", newShoe.sizes.join(","))
    formData.append("name", newShoe.name)
    formData.append("notes", newShoe.notes)
    formData.append("primary_image", newShoe.primary_image)
    formData.append("price", String(newShoe.price))
    formData.append("cost", String(newShoe.cost))
    formData.append("colors", newShoe.colors.join(","))
    formData.append("materials", newShoe.materials.join(","))

    fetch(`${apiBaseUrl}/catalog`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newShoe)
    }).then(async (response) => {
      if (response.ok) {
        enqueueSnackbar("New Order Saved", { variant: "success" })
        onCloseForm()
      }
    })
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0]
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes

    if (file && file.size > maxSize) {
      alert("File size exceeds 5MB limit!")
    } else {
      encodeImageToBase64(event.target.files[0]).then(async (response) => {
        let imagebase64 = await response
        setShoeImage(imagebase64)
        setNewShoe({ ...newShoe, primary_image: imagebase64 })
      })
    }
  }

  function encodeImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file) // Reads the contents of the specified File or Blob. When the read operation is finished, the readyState becomes DONE, and the loadend is triggered. At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <SnackbarProvider>
      <div>
        <h2>Add New Shoe</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="my-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="name"
                    label="Shoe Name"
                    size="small"
                    required
                    value={newShoe.name}
                    onChange={(e) =>
                      setNewShoe({ ...newShoe, name: e.target.value })
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="sizes"
                    label="Sizes (comma separated)"
                    size="small"
                    required
                    value={newShoe.sizes && newShoe.sizes.join(",")}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        sizes: e.target.value.split(",").map((s) => s.trim())
                      })
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="colors"
                    label="Colors (comma separated)"
                    size="small"
                    required
                    value={newShoe.colors && newShoe.colors.join(", ")}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        colors: e.target.value.split(",").map((c) => c.trim())
                      })
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="materials"
                    label="Materials (comma separated)"
                    size="small"
                    required
                    value={newShoe.materials && newShoe.materials.join(", ")}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        materials: e.target.value
                          .split(",")
                          .map((m) => m.trim())
                      })
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="price"
                    label="Price"
                    size="small"
                    value={newShoe.price}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        price: parseFloat(e.target.value)
                      })
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    name="cost"
                    label="Cost"
                    size="small"
                    value={newShoe.cost}
                    onChange={(e) =>
                      setNewShoe({
                        ...newShoe,
                        cost: parseFloat(e.target.value)
                      })
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <Card className="h-full">
                <CardContent>
                  <div className=" overflow-hidden">
                    <img src={shoeImage} className="h-[250px]" />
                  </div>
                  <div>
                    <input type="file" onChange={handleImageChange}></input>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end col-span-3">
              <div className="mx-2">
                <Button variant="outlined" color="primary" type="submit">
                  Save Shoe
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onCloseForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </SnackbarProvider>
  )
}
