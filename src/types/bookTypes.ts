export interface Book {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
  first_publish_year?: number;
  number_of_pages_median?: number;
  physical_format?: string;
  weight?: string;
}

export interface BookSearchApiResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: number | null;
  docs: Book[];
}
