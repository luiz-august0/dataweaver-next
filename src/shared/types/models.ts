export interface HttpStandardError {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

export interface PageableSort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: PageableSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PagedList<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: PageableSort;
  numberOfElements: number;
  empty: boolean;
}

export type AsyncResponse<T> = T | undefined;

export interface MultipartBean {
  file: string;
  filename: string;
}
