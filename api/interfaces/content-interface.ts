export interface ContentDetailRes  {
  success: boolean;
  message: string;
  data: {
    items: {
      id: number;
      type: string;
      title: string;
      short_description: string;
      description: string;
      slug: string;
      image: string;
      is_published: boolean;
      published_at: string;
      unpublished_at: string;
      created_by: number;
      created_by_name: string;
      created_at: string;
      updated_at: string;
    }[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      last_page: number;
    };
  };
}
