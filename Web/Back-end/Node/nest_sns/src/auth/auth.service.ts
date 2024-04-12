import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { HASH_ROUNDS, JWT_SECRET } from './const/auth.const';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  /**
   * 토큰을 사용하게 되는 방식
   * 1) 사용자가 로그인 도는 회원가입을 진행하면
   *    -> access_token, refresh_token을 발급
   * 2) 로그인 할때는 Basic 토큰과 함께 요청을 보낸다.
   *    -> Basic 토큰은 이메일, 비밀번호를 Base64로 인코딩한 형태이다.
   *    예) {authorization: Basic {token}}
   * 3) 아무나 접근 할 수 없는 정보 (private route)를 접근 할 때는
   *    -> access_token을 헤더에 담아서 요청과 함께 보낸다.
   *   예) {authorization: Bearer {token}}
   * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현제 요청을 보낸 사용자가 누구인지 알 수 있다.
   *    예) 현재 로그인한 사용자가 작성한 포스트만 가져오려면 토큰의 sub 값에 입력되어있는 사용자의 포스트만 따로 필터링 한다.
   *    특정 사용자의 토큰이 없다면 다른 사용자의 데이터에 접근이 불가능 하다.
   * 5) 모든 토큰은 만료 기간이 있다. 만료기간이 지나면 새로 토큰을 발급받아야 한다.
   *    그렇지 않으면 jwtService.verify()에서 에러가 발생한다. 인증 통과가 안된다.
   *    access 토큰을 새로 발급 받을 수 있는 /auth/token/access,
   *    refresh 토큰을 새로 발급 받을 수 있는 /auth/token/refresh가 필요하다.
   * 6) 토큰이 만료되면 각각의 토큰을 새로 발급 받을 수 있는 엔드포인트에 요청을 해서
   *    새로운 토큰을 발급받고 새로운 토큰을 사용해서 private route에 접근한다.
   */

  /**
   * Header로 부터 토큰을 받을 때
   * {authorization: Basic {token}}
   * {authorization: Bearer {token}}
   */

  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다!');
    }

    const token = splitToken[1];

    return token;
  }

  /**
   * Basic Token decode
   * 1) dflake;falkkd;akle -> email:password
   * 2) email:password -< [email, password]
   * 3) {email: email, password: password}
   */

  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 토큰 입니다.');
    }

    const email = split[0];
    const password = split[1];

    return { email, password };
  }

  // 토큰 검증
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });

    /**
     * sub: id
     * email: email,
     * type: 'access' | 'refresh'
     */
    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다!',
      );
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }

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
      // seconds
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  // 로그인 실행, 토큰 발급
  loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  // 유효성 검사
  async authenticateWithEmailAndPassword(
    user: Pick<UsersModel, 'email' | 'password'>,
  ) {
    /**
     * 1. 사용자가 존재하는지 확인
     * 2. 비밀번호가 일치하는지 확인
     * 3. 사용자 정보를 반환
     */

    const existingUser = await this.usersService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }

    /**
     * parameter
     *
     * 1) 입력된 비밀번호
     * 2) 기존 해시 (hash) -> 사용자 정보에 저장되어있는 Hash
     */

    const passOk = await bcrypt.compare(user.password, existingUser.password);

    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return existingUser;
  }

  // 로그인
  async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginUser(existingUser);
  }

  // 회원가입
  async registerWithEmail(
    user: Pick<UsersModel, 'email' | 'nickname' | 'password'>,
  ) {
    // 해쉬 값 생성
    const hash = await bcrypt.hash(user.password, HASH_ROUNDS);

    // 회원 생성
    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    // 로그인 실행, 토큰 발급
    return this.loginUser(newUser);
  }
}
