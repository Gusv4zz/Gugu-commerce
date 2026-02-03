import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prisma:PrismaService, private jwtService:JwtService){}

  async create(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.create({ data: createAuthDto });
    const payload = {
      sub: user.id,
      username: user.name
    }
    return {
      acces_token: await this.jwtService.signAsync(payload)
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(email: string) {
    if (!email || typeof email !== 'string') {
      return { message: 'Email is required' };
    }
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if(!user){
      return {
        "message": "This user not exist"
      }
    }
    const payload= {
      sub:user.id,
      username:user.name
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
