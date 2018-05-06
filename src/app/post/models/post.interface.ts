export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: any[];
  _links: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
    about: [
      {
        href: string;
      }
    ];
    author: [
      {
        embeddable: true;
        href: string;
      }
    ];
    replies: [
      {
        embeddable: true;
        href: string;
      }
    ];
    'version-history': [
      {
        href: string;
      }
    ];
    'wp:featuredmedia': [
      {
        embeddable: true;
        href: string;
      }
    ];
    'wp:attachment': [
      {
        href: string;
      }
    ];
    'wp:term': [
      {
        taxonomy: string;
        embeddable: true;
        href: string;
      },
      {
        taxonomy: string;
        embeddable: true;
        href: string;
      }
    ];
    curies: [
      {
        name: string;
        href: string;
        templated: true;
      }
    ];
  };
  _embedded: {
    author: [
      {
        id: number;
        name: string;
        url: string;
        description: string;
        link: string;
        slug: string;
        _links: {
          self: [
            {
              href: string;
            }
          ];
          collection: [
            {
              href: string;
            }
          ];
        };
      }
    ];
    'wp:featuredmedia': [
      {
        id: number;
        date: string;
        slug: string;
        type: string;
        link: string;
        title: {
          rendered: string;
        };
        author: 3;
        caption: {
          rendered: string;
        };
        alt_text: string;
        media_type: string;
        mime_type: string;
        media_details: {
          width: number;
          height: number;
          file: string;
          sizes: {
            thumbnail: ImageMetaData;
            medium: ImageMetaData;
            medium_large: ImageMetaData;
            large: ImageMetaData;
            'post-thumbnail': ImageMetaData;
            full: ImageMetaData;
          };
          image_meta: {
            aperture: string;
            credit: string;
            camera: string;
            caption: string;
            created_timestamp: string;
            copyright: string;
            focal_length: string;
            iso: string;
            shutter_speed: string;
            title: string;
            orientation: string;
            keywords: any[];
          };
        };
        source_url: string;
        _links: {
          self: [
            {
              href: string;
            }
          ];
          collection: [
            {
              href: string;
            }
          ];
          about: [
            {
              href: string;
            }
          ];
          author: [
            {
              embeddable: true;
              href: string;
            }
          ];
          replies: [
            {
              embeddable: true;
              href: string;
            }
          ];
        };
      }
    ];
    'wp:term': [WpTerm[]];
  };
}

export interface WpTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  _links: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
    about: [
      {
        href: string;
      }
    ];
    'wp:post_type': [
      {
        href: string;
      }
    ];
    curies: [
      {
        name: string;
        href: string;
        templated: boolean;
      }
    ];
  };
}

export interface ImageMetaData {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}
