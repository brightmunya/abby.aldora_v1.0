import { Link } from "react-router-dom"
import { useState } from "react"
import { MenuItem, MenuList } from "@mui/material"

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <MenuList>
      {/* <MenuItem
        className={`${activeIndex === 0 ? "bg-gray-200" : ""} hidden`}
        component={Link}
        to="/"
        onClick={() => setActiveIndex(0)}
        selected={activeIndex === 0}
      >
        Home
      </MenuItem> */}
      <MenuItem
        className={`${activeIndex === 1 ? "bg-gray-200" : ""}`}
        component={Link}
        to="/customers"
        onClick={() => setActiveIndex(1)}
        selected={activeIndex === 1}
      >
        Customers
      </MenuItem>
      <MenuItem
        className={`${activeIndex === 4 ? "bg-gray-200" : ""}`}
        component={Link}
        to="/production/orders"
        onClick={() => setActiveIndex(4)}
        selected={activeIndex === 4}
      >
        Orders
      </MenuItem>
      <MenuItem
        className={`${activeIndex === 2 ? "bg-gray-200" : ""}`}
        component={Link}
        to="/production"
        onClick={() => setActiveIndex(2)}
        selected={activeIndex === 2}
      >
        Production
      </MenuItem>
      <MenuItem
        className={`${activeIndex === 3 ? "bg-gray-200" : ""}`}
        component={Link}
        to="/shoes"
        onClick={() => setActiveIndex(3)}
        selected={activeIndex === 3}
      >
        Shoes
      </MenuItem>

      {/*<MenuItem component={Link} to="/integrations">
        Integrations
      </MenuItem>
      <MenuItem component={Link} to="/contact">
        Contact
      </MenuItem> */}
    </MenuList>
  )
}
