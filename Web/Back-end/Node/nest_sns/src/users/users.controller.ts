import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  /**
   * serialization = 직렬화 = 현제 시스템에서 사용되는 (NestJS) 데이터 구조를 다른 시스템에서도 쉽게 사용 할 수 있는 포맷으로 변환
   *                        class의 object에서 JSON으로 변환
   * deserialization = 역직렬화
   */
  getUser() {
    return this.usersService.getAllUsers();
  }

  // @Post()
  // postUser(
  //   @Body('nickname') nickname: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   return this.usersService.createUser({ nickname, email, password });
  // }
}
