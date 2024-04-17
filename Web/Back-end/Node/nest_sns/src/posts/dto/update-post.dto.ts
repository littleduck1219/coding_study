import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';
import * as Validation from 'src/common/validation-message';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString({ message: Validation.stringValidationMessage })
  @IsOptional()
  title?: string;

  @IsString({ message: Validation.stringValidationMessage })
  @IsOptional()
  content?: string;
}
