import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn() // 자동으로 id 생성
  id: number;

  @Column()
  email: string;

  //   @Column({
  //     // 데이터 타입 설정
  //     // 자동 유추됨
  //     type: 'varchar',
  //     // 데이터 베이스 컬럼 이름
  //     // 자동 유추됨
  //     name: '_title',
  //     // 데이터 길이
  //     length: 300,
  //     // null값 지정 유무
  //     nullable: true,
  //     // 수정 불가능
  //     update: false,
  //     // find() 함수를 실행할 때 기본으로 값을 불러올지
  //     // 기본값은 true
  //     // false일 경우
  //     // .find({
  //     //   select: {
  //     //       title: true,
  //     // }
  //     // })
  //     select: true,
  //     // 아무것도 입력하지 않았을때 기본값
  //     default: 'default title',
  //     // 고유값 설정
  //     unique: false,
  //   })
  //   title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 생성 시간 기록
  @CreateDateColumn()
  createdAt: Date;

  // 업데이트 시간 기록
  @UpdateDateColumn()
  updatedAt: Date;

  // 버전 관리
  // 초기 1로 설정 업데이트 될때마다 1씩 증가
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find 실행 할때 마다 항상 같이 가져올 relation
    eager: false,
    // relation을 직접 넣어준다
    cascade: false,
    // null값 허용
    nullable: true,
    // 관계가 삭제됐을때
    // no action -> 아무것도 안함
    // cascade -> relation 같이 삭제
    // set null -> relation id를 null로 설정
    // set default -> 기본세팅으로 설정
    // restrict -> 삭제를 막음
    onDelete: 'NO ACTION',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column()
  count: 0;
}
