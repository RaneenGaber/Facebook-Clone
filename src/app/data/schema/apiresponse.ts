export interface APIResponse <T>{
  success: boolean,
  data:T;
  messages:string[],
  pageNumber?:number,
  totalPages?:number,
  itemsPerPage?:number
}
