import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';
import { Messages } from './entities/message.entity';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let usersSerivce: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        UsersService,
        {
          provide: getRepositoryToken(Messages),
          useValue: null,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: null,
        }
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    usersSerivce = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(messageService).toBeDefined();
    expect(usersSerivce).toBeDefined();
  });
});
