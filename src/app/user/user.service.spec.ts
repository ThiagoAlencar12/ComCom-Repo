import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UsersService } from './user.service';

import FakeUtilsUsers from './fakes/FakeUtilsUsers';

describe('UserService', () => {
  let serviceUsers: UsersService;

  const mockUsersRepository = ({
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  // const mockServiceRepository = () => ({
  //   findAll: jest.fn(),
  //   findById: jest.fn(),
  //   findByEmail: jest.fn(),
  //   create: jest.fn(),
  //   update: jest.fn(),
  //   delete: jest.fn(),
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
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
     const user = FakeUtilsUsers.testeUser();
     mockUsersRepository.findAll.mockReturnValue([ user, user, user ]);
     const users = await serviceUsers.findAll();

     expect(users).toHaveLength(3);
     expect(mockUsersRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});


