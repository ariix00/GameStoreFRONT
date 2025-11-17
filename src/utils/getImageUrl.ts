import type { Images } from "../types";

export const getImageUrl = (x: Images[], y: string): string => {
  let url = "";
  x.forEach((image) => {
    if (image.type === y) {
      url = image.url;
    }
  });
  return url;
};
