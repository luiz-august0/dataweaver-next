import { FilterRequestDTO, PaginationRequestDTO } from './dtos';

export type DefaultRequestParams = {
  paginationDTO?: PaginationRequestDTO;
  filterRequestDTO?: FilterRequestDTO;
  sort?: string;
};
