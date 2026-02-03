export class CreateProductDto {
  name:string
  price:number
  class:string
  stock?:number
  // sku  String @unique
}
