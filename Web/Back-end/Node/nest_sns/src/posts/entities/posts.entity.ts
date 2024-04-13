import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PostsModel extends BaseModel {
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsNotEmpty({ message: 'title은 필수 입력 사항입니다.' })
  @IsString({
    message: 'title은 문자열이어야 합니다.',
  })
  title: string;

  @Column()
  @IsNotEmpty({ message: 'content은 필수 입력 사항입니다.' })
  @IsString({
    message: 'content는 문자열이어야 합니다.',
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
