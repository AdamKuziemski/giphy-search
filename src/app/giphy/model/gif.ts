import type { AnyImage, CompleteImage, GifImage, Image, Mp4Image } from "./image";

export interface Gif {
  type: 'gif',
  id: string,
  url: string,
  slug: string,
  bitly_gif_url: string,
  bitly_url: string,
  embed_url: string,
  username: string,
  source: string,
  title: string,
  rating: string,
  content_url: string,
  source_tld: string,
  source_post_url: string,
  is_sticker: number,
  import_datetime: string,
  trending_datetime: string,
  images: {
    original: CompleteImage,
    downsized: GifImage,
    downsized_large: GifImage,
    downsized_medium: GifImage,
    downsized_small: Mp4Image,
    downsized_still: GifImage,
    fixed_height: AnyImage,
    preview_gif: GifImage,
  }
}
