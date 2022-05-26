import { ImageCollection } from './api/image';

type SelectImageCriteria =
  | {
      width: number;
      height: number;
    }
  | {
      width?: number;
      height: number;
    }
  | {
      width: number;
      height?: number;
    };

export function selectImage(
  images: ImageCollection,
  { width, height }: SelectImageCriteria,
) {
  if (width === undefined && height === undefined) {
    throw new Error('Specify a minium width or height');
  }

  const sortedImages = Array.from(images).sort((a, b) => a.width - b.width);
  return sortedImages.find((image) => {
    const widthMatches = width ? image.width > width : true;
    const heightMatches = height ? image.height > height : true;
    return widthMatches && heightMatches;
  });
}
