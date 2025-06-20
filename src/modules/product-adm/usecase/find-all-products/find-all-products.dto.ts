export interface FindAllOutputDto {
  products: {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number
  }[]
}
