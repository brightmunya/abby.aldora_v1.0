export interface address {
  line1: string
  line2: string
  city: string
  province: string
  postal_code: string
  country: string
}

export interface shoe {
  shoe_pkey: number
  name: string
  code: string
  sizes: number[]
  colors: string[]
  materials: string[]
  price: number
}

export interface order_detailview {
  order_pkey: number
  order_number: string
  order_date: string
  fk_customer: number
  customers: customer_miniview
  quantity: number | null
  fk_source: number
  lu_data_source: { name: string }
  fk_orderstatus: number
  lu_order_status: { name: string }
  dispatched_date: string | null
  external_reference: string | null
  total_price: number | null
  due_date: string | null
  priority: string
  notes: string | null
}

export interface shoe_miniview {
  name: string
  code: string
}

export interface order_item {
  order_item_pkey: number
  fk_shoe: string
  size: number
  color: string
  material: string
  price: number
  quantity: number
  fk_order: number
  production_stage: string
  fk_production_stage: number
  shoe_code: string
  shoe_name: string
}

export interface new_order_item {
  fk_order: number
  fk_shoe: number
  size: number
  color: string
  material: string
  price: number
  quantity: number
  fulfillment: string
}

export interface shoe_details {
  shoe_pkey: number
  name: string
  code: string
  sizes: string[]
  colors: string[]
  materials: string[]
  price: string
  fulfillment: string[]
  stock: [
    {
      size: string
      quantity: number
    }
  ]
  production: [
    {
      size: string
      quantity: number
    }
  ]
  selected: boolean
}

export interface customer {
  customer_pkey: number
  first_name: string
  last_name: string
  email_address: string
  phone_number?: string
}

export interface customer_details {
  customer_pkey: number
  customer_code: string
  name: string
  first_name: string
  last_name: string
  email_address: string
  phone_number?: string
  status: string
  type: string
  total_orders: number
  total_spent: number
  last_order_date?: Date
  first_order_date?: Date
  loyalty_points?: number
  prefered_style?: string
  source: number
  avatar?: string
  billing_address?: address
  shipping_address?: address
}

export interface source {
  source_pkey: number
  name: string
}

export interface order {
  fk_customer: number | null
  order_date: Date
  due_date: Date
  fk_salesperson: number | null
  fk_source: number | null
  fk_invoice: number | null
  order_number: string
  is_paid: boolean
  notes: string | null
  items: order_item[]
  order_pkey: number
  external_reference: string | null
  dispatched_date: Date | null
  fk_orderstatus: number
  total_price: number
}

export interface customer_order_listview {
  order_date: Date
  due_date: Date
  fk_salesperson: number | null
  fk_source: number | null
  fk_invoice: number | null
  source: string
  order_number: string
  is_paid: boolean
  notes: string | null
  total_quantity: number
  order_pkey: number
  external_reference: string | null
  dispatched_date: Date | null
  fk_orderstatus: number
  orderstatus: string
  total_price: number
}

export interface customer_order_newview {
  first_name: string
  last_name: string
  customer_code: string | null
  email_address: string
  phone_number: string | null
  company: string
  type: number
  fk_source: number
  fk_salesperson: number
  order_date: string
  due_date: string
  order_number: string
  is_paid: boolean
}

export interface order_miniview {
  order_number: string
  order_pkey: number
  external_reference?: string
  order_date: date
}

export interface customer_miniview {
  customer_pkey: number
  first_name: string
  last_name: string
  email_address: string
  phone_number?: string
}

export interface order_newview {
  fk_customer: number
  fk_source: number
  fk_salesperson: number
  order_date: string
  due_date: string
  order_number: string
  is_paid: boolean
}

export interface shoe_newview {
  name: string
  code: string
  sizes: number[]
  colors: string[]
  materials: string[]
  notes: string
  brand: string
  price: number
  cost: number
  primary_image: string
}

export interface shoe {
  name: string
  code: string
  sizes: number[]
  colors: string[]
  materials: string[]
  notes: string
  brand: string
  shoe_pkey: number
  price: number
  cost: number
  primary_image: string
}

export interface production_item {
  order_item_pkey: number
  fk_shoe: number
  size: number
  color: string
  fk_order: number
  material: string
  quantity: number
  price: number
  total: number
  order_pkey: number
  is_paid: boolean
  order_number: string
  order_priority: string
  first_name: string
  last_name: string
  customer_pkey: number
  company: string
  email_address: string
  code: string
  shoe_name: string
  order_status: string
  due_date: Date
  order_source: string
}

export interface production_status {
  production_stage_pkey: number
  name: string
}

export interface shoe_order_view {
  order_item_pkey: number
  fk_order: number
  name: string
  color: string
  material: string
  fk_shoe: number
  shoe_code: string
  order_number: string | null
  first_name: string
  last_name: string
  customer_pkey: number
  customer_code: string | null
  fk_orderstatus: number
  order_status: string
  production_status: string | null
  size_3: number | null
  size_4: number | null
  size_5: number | null
  size_6: number | null
  size_7: number | null
  size_8: number | null
  size_9: number | null
  size_10: number | null
  size_11: number | null
}
