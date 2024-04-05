import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
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
   * - 1과 2에서 필요한 token을 반환하는 로직
   *
   * 4)
   */
}
