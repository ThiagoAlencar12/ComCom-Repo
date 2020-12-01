import { Users } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

export default class FakeUtilsUsers {
  static testeUser(): Users {
    const user = new Users();
    user.id = uuid();
    user.name = 'Thiago Alencar';
    user.online = true;
    user.email = 'thiagoteste@teste.com';
    user.created_at = new Date();
    user.updated_at = new Date();
    user.password = 'teste123';

    return user;
  }
}