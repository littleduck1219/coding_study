import { BadRequestException, Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseModel } from './entity/base.entity';
import { KeyObject } from 'crypto';

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(dto, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  private async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {}

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {}

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    /**
     * where, order, take, skip(page)
     *
     * DTO현제 구조
     * {
     *  where__id__more_than:1,
     *  order__createdAt: 'ASC
     * }
     *
     * 원하는 필터를 자동으로 적용할 수 있게 기능을 제작해야 한다.
     *
     * 1) where로 시작한다면 필터 로직을 적용한다.
     * 2) order로 시작한다면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__'로 split을 했을때 값이 몇 개로 나뉘는지 확인한다.
     *      3-1) 3개의 값으로 나뉜다면 FILTER_MAPPER에서 해당하는 operator 함수를 찾아서 적용한다.
     *      ['where', 'id', 'more_than']
     *      3-2) 2개의 값으로 나뉜다면 정확한 값을 필터하는 것이기 때문에 operator 함수를 적용한다.
     *      ['where', 'id']
     * 4) order의 경우 3-2와 동일
     */
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      // key -> where__id__less_than
      // value -> 1
      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parsWhereFilter<T>(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = { ...order, ...this.parseOrderFilter<T>(key, value) };
      }
    }
    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsWhere<T> {
    const options: FindOptionsWhere<T> = {};

    /**
     * 예를 들어 where__id__more_than
     * __를 기준으로 나눴을 때
     */

    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'를 split 했을때 길이가 2 또는 3이어야 합니다. - 문제되는 키값: ${key}`,
      );
    }

    if (split.length === 2) {
      // ['where', 'id']
      const [_, field] = split;
      /**
       * filed => 'id'
       * value => 3
       */

      options[field] = value;
    } else {
      /** 길이가 3일 경우 Typeorm 유틸리티 적용이 필요함.
       * where__id__more_than 의 경우
       * where은 버림 drop
       * 두번째는 filter
       * 세번째는 typeorm 유틸리티
       *
       * FILTER_MAPPER에 미리 정의해둔 값들로
       * filed 값에 FILETER_MAPPER에서 해당되는 utility를 가져온 후
       * 값에 적용 해준다.
       */
      const [_, field, operator] = split;
    }

    return options;
  }

  private parseOrderFilter<T extends BaseModel>(key: string, value: any) {
    FindOptionsOrder<T> = {};
  }
}
