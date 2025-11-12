import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import type { customer } from "../../types/entities"
import ChooseShoes from "../../components/orders/choose-shoes"
import OrderNew from "../../components/orders/order-new"
import CustomerNewOrder from "../../components/customers/customer-new-order"

export default function ProductionOrderNew() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const navigate = useNavigate()
  interface RouteParams {
    id: string
  }
  const params = useParams()
  const [step, setStep] = useState(0) // 0: Order Details, 1: Choose Shoes
  const [orderId, setOrderId] = useState(0)
  const [newOrderCustomer, setNewOrderCustomer] = useState<customer>(
    {} as customer
  )

  const handleOrderCreated = (newOrderId: number) => {
    navigate(`/production/order/${newOrderId}`)
    // setOrderId(newOrderId)
    // setStep(1)
  }

  useEffect(() => {
    //get customers
    const fetchCustomer = async () => {
      const response = await fetch(`${apiBaseUrl}/customers/${params.id}`)
      const data = await response.json()
      setNewOrderCustomer(data)
    }

    fetchCustomer()
  }, [params.id])

  return (
    <>
      <div className="mb-4 ">
        <h1>New Order</h1>
      </div>
      <div className="p-4 w-full">
        {/* 
        description:  step 0 creating a new order with a new customer 
        src:          components/orders/order-new 
        */}
        {step === 0 && !newOrderCustomer.customer_pkey && (
          <OrderNew onNext={handleOrderCreated} />
        )}
        {/* 
        description:  step 0 displays the order with shoes   
        src:          components/orders/choose-shoes
        */}
        {step === 0 && newOrderCustomer.customer_pkey && (
          <CustomerNewOrder
            Customer={newOrderCustomer}
            onNext={handleOrderCreated}
          />
        )}
        {/* 
        description:  step 1 displays the order with shoes   
        src:          components/orders/choose-shoes
        */}
        {step === 1 && <ChooseShoes OrderId={orderId} />}
      </div>
    </>
  )
}
