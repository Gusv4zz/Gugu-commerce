import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaService){}

  //post
  async create(createProductDto: CreateProductDto) {
    try{
      const product = await this.prisma.product.create({data:{...createProductDto, stock: createProductDto.stock ?? 1}})
      return{
        "message":"Product added successfully"
      }
    }catch(err){
      console.log(err) 
      return{
        "messageError": "This product ready exist"
      }
    }
  }
  // patch - incrementa o estoque (soma ao valor atual)
  async addToStock(id: number, quantity: number) {

    if(quantity <= 0){
      return{
        "message":"quantity is needed than 0"
      }
      
    }
    return await this.prisma.product.update({
      where: { id },
      data: { stock: { increment: quantity } },
    });
  }

  //get
  async findAll() {
    return await this.prisma.product.findMany();
  }


  //get:id
  async findAllByClass(classOfProduct: string) {
    return await this.prisma.product.findMany({where:{class:classOfProduct}})
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({where:{id}, data:updateProductDto})
  }

  async remove(id: number) {
    return await this.prisma.product.delete({where:{id}})
  } 
}
