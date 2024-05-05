import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
} from 'typeorm';

/**
 * where__id__not
 *
 * {
 *  where: {
 *     id: Not(value)
 *     }
 * }
 */

export const FILTER_MAPPER = {
  any: Any,
  array_contained_by: ArrayContainedBy,
  array_contains: ArrayContains,
  array_overlap: ArrayOverlap,
  between: Between,
  equal: Equal,
  ilike: ILike,
  in: In,
  is_null: IsNull,
  not: Not,
  less_than: LessThan,
  less_than_or_equal: LessThanOrEqual,
  like: Like,
  more_than: MoreThan,
  more_than_or_equal: MoreThanOrEqual,
  raw: Raw,
};
