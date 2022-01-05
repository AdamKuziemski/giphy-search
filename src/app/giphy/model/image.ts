export interface Image {
  height: string,
  width: string,
}

export interface Mp4Image extends Image {
  mp4_size: string,
  mp4: string,
}

export interface WebpImage extends Image {
  webp_size: string,
  webp: string,
}

export interface GifImage extends Image {
  size: string,
  url: string,
}

export type AnyImage = Mp4Image & WebpImage & GifImage;

export type CompleteImage = Mp4Image & WebpImage & GifImage & {
  frames: string,
  hash: string
}
