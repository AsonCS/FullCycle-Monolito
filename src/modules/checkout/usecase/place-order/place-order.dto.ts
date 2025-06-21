export interface PlaceOrderInputDto {
  clientId: string
  products: {
    productId: string
  }[]
}

export interface PlaceOrderOutputDto {
  invoiceId: string | null
  orderId: string
  status: string
  products: {
    productId: string
  }[]
  total: number
}
