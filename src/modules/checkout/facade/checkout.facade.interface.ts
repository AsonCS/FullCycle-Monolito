export interface FindAllCheckoutFacadeOutputDto {
  id: string
  client: {
    id: string
    name: string
    email: string
    address: {
      street: string
      number: string
      complement: string
      city: string
      state: string
      zipCode: string
    }
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
  orderId: string
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
