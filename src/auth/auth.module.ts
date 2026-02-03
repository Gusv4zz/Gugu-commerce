import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
  imports:[
    JwtModule.register({
      global:true,
      secret: process.env.SECRET_KEY,
      signOptions:{expiresIn:'60s'}
    })
  ],

  exports:[AuthService]
})
export class AuthModule {}
