// import { Test, TestingModule } from '@nestjs/testing';
// import { EmailController } from './email.controller';
// import { EmailService } from '../email.service';
// import { UsersService } from '../../user/user.service'
// import { getRepositoryToken } from '@nestjs/typeorm';

// import { Users } from '../../user/entities/user.entity';
// import { Email } from '../entities/email.entity';

// describe('EmailController', () => {
//   // let controller: EmailController;
//   let serviceEmail: EmailService;
//   let userService: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       // controllers: [EmailController],
//       providers: [
//         EmailService,
//         UsersService,
//         {
//           provide: getRepositoryToken(Email),
//           useExisting: true,
//         },
//         {
//           provide: getRepositoryToken(Users),
//           useExisting: true,
//         },
//       ],
//     }).compile();
//     // controller = module.get<EmailController>(EmailController);
//     serviceEmail = module.get<EmailService>(EmailService);
//     userService = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     // expect(controller).toBeDefined();
//     expect(serviceEmail).toBeDefined();
//     expect(userService).toBeDefined();
//   });
// });
