import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class PaginatePostDto extends BasePaginationDto {}
