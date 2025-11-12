import { Outlet } from "react-router-dom"
import Header from "../components/layout/header.tsx"
import Footer from "../components/layout/footer.tsx"
import Navbar from "../components/ui/navbar.tsx"
import { Card, CardContent } from "../components/ui/card.tsx"

const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen w-full ">
        <div className="w-1/6 border-r-1 border-gray-300 ">
          <Card className="m-2">
            <CardContent>
              <Header />
            </CardContent>
          </Card>
          <Navbar />
        </div>
        <div className="flex-1">
          <div className="p-2 min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
