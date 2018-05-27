export interface Post {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  categoriesArray: string[];
  categoryMap: {
    [slug: string]: boolean;
  };
  media: {
    slug: string;
    title: string;
    caption: string;
    alt: string;
    image: ImageMetaData;
  };
}

export interface ImageMetaData {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}
