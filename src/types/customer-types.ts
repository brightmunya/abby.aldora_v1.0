import type { address } from "./entities"

export interface new_customer {
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  customer_code: string
  type: number
  source: number
  status: number
  company: string
}

export interface customer_details {
  customer_pkey: number
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  customer_code: string
  type: number
  source: number
  status: number
  notes: string
  billing_address: address
  shipping_address: address
  total_orders: number
  total_spent: string
  last_order_date: string
  company: string
  job_title: string
  mobile_phone: string
}
