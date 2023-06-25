export const randomizeImage = (image: string) => {
  return image?.includes("http") || image?.includes("https")
    ? `${image}?random=${new Date().getTime()}`
    : image;
};
