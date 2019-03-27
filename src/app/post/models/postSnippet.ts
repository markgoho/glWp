export interface PostSnippet {
  slug: string;
  title: string;
  excerpt: string;
  media: {
    alt: string;
    image: SnippetImageMetaData;
  };
}

interface SnippetImageMetaData {
  source_url: string;
}
