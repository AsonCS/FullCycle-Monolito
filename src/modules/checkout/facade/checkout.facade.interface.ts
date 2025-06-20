export interface FindAllCheckoutFacadeOutputDto {
  client: {
    id: string
    name: string
    email: string
    address: string
  }
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
  status: string
}

export interface PlaceOrderCheckoutFacadeInputDto {
  clientId: string
  products: {
    productId: string
  }[]
}

export interface PlaceOrderCheckoutFacadeOutputDto {
  invoiceId: string
  total: number
  products: {
    productId: string
  }[]
}

export interface CheckoutFacadeInterface {
  findAll(): Promise<
    FindAllCheckoutFacadeOutputDto[]
  >

  placeOrder(
    input: PlaceOrderCheckoutFacadeInputDto
  ): Promise<PlaceOrderCheckoutFacadeOutputDto>
}
