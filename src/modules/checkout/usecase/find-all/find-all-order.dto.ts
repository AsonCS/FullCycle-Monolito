export interface FindAllOrderUseCaseOutputDto {
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
