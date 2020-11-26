import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';

import { Talk } from './entities/talk.entity';
import { TalkService } from './talk.service';

describe('TalkService', () => {
  let talkService: TalkService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TalkService,
        UsersService,
        {
          provide: getRepositoryToken(Talk),
          useValue: null,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: null,
        }
      ],
    }).compile();
    talkService = module.get<TalkService>(TalkService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(talkService).toBeDefined();
    expect(userService).toBeDefined();
  });
});
