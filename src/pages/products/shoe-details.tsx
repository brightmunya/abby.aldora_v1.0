import ShoeDetails from "../../components/shoes/view-shoe-details"
import { useParams } from "react-router-dom"

export default function Shoe() {
  interface RouteParams {
    id: number
  }
  const params = useParams()
  return (
    <>
      <div className="mb-4">
        <h1 className="text-xl ">Shoe Details </h1>
      </div>
      <div className="m-2">
        <ShoeDetails shoeId={params.id} />
      </div>
    </>
  )
}
