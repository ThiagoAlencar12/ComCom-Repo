import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UsersService } from './user.service';

describe('UserService', () => {
  let serviceUsers: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: null,
        }
      ],
    }).compile();
    serviceUsers = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(serviceUsers).toBeDefined();
  });
});

describe('CreateUser',() => {
  it('should be able to create a new user', () => {
    console.log('CreateUser');
  })
});
