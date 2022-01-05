import type { Gif } from "./gif";
import type { Meta } from "./meta";
import type { Pagination } from "./pagination";

export interface SearchResponse {
  data: Gif[],
  pagination: Pagination,
  meta: Meta
}
