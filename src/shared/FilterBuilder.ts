import { FilterRequestDTO, FilterValue } from './types/dtos';

export class FilterBuilder {
  readonly dto: FilterRequestDTO = {};

  equals(key: string, value: FilterValue) {
    this.dto[`${key}::`] = value;

    return this;
  }

  greaterOrEqualThan(key: string, value: FilterValue) {
    this.dto[`${key}:>:`] = value;

    return this;
  }

  lessOrEqualThan(key: string, value: FilterValue) {
    this.dto[`${key}:<:`] = value;

    return this;
  }

  like(key: string, value: string) {
    this.dto[`${key}:like:`] = value;

    return this;
  }

  queryParam(key: string, value: FilterValue) {
    this.dto[`${key}`] = value;

    return this;
  }
}
