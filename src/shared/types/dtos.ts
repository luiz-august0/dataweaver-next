export interface PaginationRequestDTO {
  page: number;
  size: number;
}

export type FilterValue = boolean | number | string;

export interface FilterRequestDTO {
  [key: string]: FilterValue;
}
