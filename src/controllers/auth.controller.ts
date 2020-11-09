import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";

import { compare } from 'bcrypt';
import { UsersService } from "../services/users.service";
import { SignInDto, Token } from '../dtos/SignInDTO';
import { JwtService } from "@nestjs/jwt";
import Users from '../models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private user: UsersService,
    private jwt: JwtService
  ) {}

  @Post()
  async signIn(@Body() body: SignInDto): Promise<Token> {
    const user = await this.user.findByEmail(body.email)

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado')
    }

    const valid = await compare(body.password, user.password)

    if (!valid) {
      throw new UnauthorizedException('Senha inválida');
    }

    return await this.getToken(user)
  }

  private async getToken(user: Users): Promise<Token> {
    const token = await this.jwt.signAsync({
      id: user.id,
    })

    return { token }
  }

}
