import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import {
  IsEmail,
  IsString,
  Length,
  ValidationArguments,
} from 'class-validator';
import * as Validation from 'src/common/validation-message';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class UsersModel extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  @IsString({ message: Validation.stringValidationMessage })
  @Length(1, 20, {
    message: Validation.lengthValidationMessage,
  })
  nickname: string;

  // @Expose()
  // get nicknameAndEmail() {
  //   return this.nickname + '/' + this.email;
  // }

  @Column({
    unique: true,
  })
  @IsEmail({}, { message: Validation.emailValidationMessage })
  @IsString({ message: Validation.stringValidationMessage })
  email: string;

  @Column()
  @IsString({ message: Validation.stringValidationMessage })
  @Length(3, 8, { message: Validation.lengthValidationMessage })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;
  /**
   * Response
   * frontend -> backend
   * plain object (JSON) -> class instance (dto)
   *
   * Request
   * backend -> frontend
   * class instance (dto) -> plain object (JSON)
   *
   * toClassOnly: plain object -> class instance
   * toPlainOnly: class instance -> plain object
   */

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
