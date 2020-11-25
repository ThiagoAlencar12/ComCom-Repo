import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { constants } from "./auth.constants";
import { Users } from '../app/user/entities/user.entity';
import { UsersService } from "../app/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private service: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.secret
    })
  }

  async validate(payload: any): Promise<Users> {
    const { id } = payload;

    const user = await this.service.findById(id);
    
    if (!user) {
      throw new UnauthorizedException('Usuário inexistente.')
    }

    return user
  }
}
