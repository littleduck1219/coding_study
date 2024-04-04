import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entitiy';
import {
  Equal,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';
import { count } from 'console';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  // @Post('users')
  // postUsers() {
  //   return this.userRepository.save({
  //     title: 'test title',
  //   });
  // }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // eager : true

      // 관계를 가져오기
      // relations: { profile: true, posts: true },

      // 어떤 속성을 선택할지
      // 기본은 모든 속성
      select: { id: true, createdAt: true, updatedAt: true },

      // 버전이 1인 것만 가져오기
      // where: { version: 1 },

      // or 조건 version이 1이거나 id가 1인 것만 가져오기
      // where: [{ version: 1 }, { id: 1 }],

      where: {
        // id가 1이 아닌 것만 가져오기
        // id: Not(1)
        // id가 3보다 작은 것만 가져오기
        // id: LessThan(3),
        // id가 3보다 작거나 같은 것만 가져오기
        // id: LessThanOrEqual(3),
        // id가 3보다 큰 것만 가져오기
        // id: MoreThan(3),
        // id가 3보다 크거나 같은 것만 가져오기
        // id: MoreThanOrEqual(3),
        // id가 3인 것만 가져오기
        // id: Equal(3),
        // 유사값
        // email: Like('%google%'),
        // 사이값
        // id: Between(1, 3),
        // 배열값
        // id: In([1, 2, 3]),
        // null 값
        // id: IsNull(),
      },

      // 정렬
      // ASD : 오름차순
      // DESC : 내림차순
      order: { id: 'ASC' },

      // 처음 몇 개를 제외할지
      skip: 0,

      // 몇 개를 가져올지
      take: 10,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id: +id } });

    return this.userRepository.save({ ...user });
  }

  @Post('users/profile')
  async createUserAndProfile() {
    // cascade : true
    const user = await this.userRepository.save({
      email: 'tinyduck1219@gmail.com',
      profile: { profileImg: 'testImg' },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'testImg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'test@gmail.com',
    });
    await this.postRepository.save({
      author: user,
      title: 'test title',
    });

    await this.postRepository.save({
      author: user,
      title: 'test title2',
    });

    return user;
  }

  @Post('smaple')
  async smaple() {
    // 모델 생성, 저장 하지않음.
    const user1 = this.userRepository.create({
      email: 'test@naver.com',
    });

    // 생성, 저장
    const user2 = await this.userRepository.save({
      email: 'test1@gmail.com',
    });

    // 값을 조회하되, 입력된 속성값을 변경해서 조회, 저장하지 않음.
    const user3 = await this.userRepository.preload({
      id: 1,
      email: 'test1@naver.com',
    });

    const user4 = await this.userRepository.delete({
      id: 1,
    });

    // 해당하는 id의 count를 1 증가
    const count1 = await this.userRepository.increment(
      {
        id: 1,
      },
      'count',
      1,
    );

    // 해당하는 조건의 갯수
    const count2 = await this.userRepository.count({
      where: { email: Like('%@gmail.com') },
    });

    // 합 (gmail.com이 들어간 이메일의 count의 합)
    const sum1 = await this.userRepository.sum('count', {
      email: Like('%@gmail.com'),
    });

    // 평균 (id가 3보다 작은 것의 count의 평균)
    const average1 = await this.userRepository.average('count', {
      id: LessThan(3),
    });

    // 최소값
    const min1 = await this.userRepository.minimum('count', {
      id: LessThan(3),
    });

    // 최대값
    const max1 = await this.userRepository.maximum('count', {
      id: LessThan(3),
    });

    // 하나의 값만 찾는다.
    const userOne = await this.userRepository.findOne({
      where: { id: 3 },
    });

    // 여러개의 값 찾기
    const usersAndCount = await this.userRepository.findAndCount({
      take: 10,
    });
  }

  @Post('posts/tags')
  async createPostTags() {
    const post1 = await this.postRepository.save({
      title: 'tag title1',
    });

    const post2 = await this.postRepository.save({
      title: 'tag title2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'tag title3',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    const posts = this.postRepository.find({ relations: { tags: true } });

    return posts;
  }

  @Get('tags')
  getTags() {
    const tags = this.tagRepository.find({ relations: { posts: true } });

    return tags;
  }
}
