export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

const p1 = "https://unsplash.com";
const p2 = "https://unsplash.com";
const p3 = "https://unsplash.com";
const p4 = "https://unsplash.com";

export const generateColumn = (prefix: string): GalleryItem[] => [
  { id: `${prefix}-1`, url: p1, title: "Elena", category: "Portrait" },
  { id: `${prefix}-2`, url: p2, title: "Marcus", category: "Studio" },
  { id: `${prefix}-3`, url: p3, title: "Sonia", category: "Fashion" },
  { id: `${prefix}-4`, url: p4, title: "Chloe", category: "Editorial" },
];