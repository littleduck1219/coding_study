import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { JWT_SECRET } from './const/auth.const';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  /**
   * 1) registerWithEmail
   * - email, nickname, password를 받아서 회원가입
   * - 생성완료시 access_token, refresh_token을 발급
   * - 로그인 유지
   *
   * 2) loginWithEmail
   * - email, password를 받아서 로그인
   * - 로그인 완료시 access_token, refresh_token을 발급
   *
   * 3) loginUser
   * - (1)과 (2)에서 필요한 token을 반환하는 로직
   *
   * 4) signToken
   * - (3)에서 필요한 토큰을 sign하는 로직
   *
   * 5) authenticateWithEmailAndPassword
   * - (2)에서 email, password를 받아서 인증하는 로직
   *    1. 사용자가 존재하는지 확인
   *    2. 비밀번호가 일치하는지 확인
   *    3. 사용자 정보를 반환
   *    4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   */

  /**
   * payload
   *
   * 1) email
   * 2) sub -> id
   * 3) type : 'access' | 'refresh'
   *
   */
  signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: isRefreshToken ? '3600' : '300',
    });
  }
}
