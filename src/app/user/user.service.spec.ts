import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UsersService } from './user.service';

describe('UserService', () => {
  let serviceUsers: UsersService;

  const mockUsersRepository = () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
          useFactory: mockUsersRepository,
        }
      ],
    }).compile();
    serviceUsers = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(serviceUsers).toBeDefined();
  });

  describe('Users',() => {
    it('should be able list users', async () => {

      const users = await serviceUsers.findAll();

      mockUsersRepository().findAll.mockResolvedValue({
        name: 'Thiago Alencar',
        email: 'teste@teste.com',
        password: '123123',
      });

      expect(users).resolves.toBe({
        name: 'Thiago Alencar',
        email: 'teste@teste.com',
        password: '123123'
      });
      expect(mockUsersRepository().findAll).toHaveBeenCalledTimes(1);
    });
  });
});


