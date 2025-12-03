export interface MovieResInterface {
  success: boolean;
  message: string;
  data: {
    movies: {
      id: number;
      title: string;
      poster: string;
      trailer: string;
      description: string;
      genres: { id: number; name: string }[];
      duration: number;
      format: string;
      language: string;
      release_date: string;
      end_date: null | string;
      status: string;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
  };
}

export interface MovieDetailResInterface {
  success: boolean;
  data: {
    id: number;
    title: string;
    poster: string;
    trailer: string;
    description: string;
    duration: number;
    format: string;
    language: string;
    release_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    genres: {
      id: number;
      name: string;
    }[];
  };
}

