
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export enum Category {
  TECH = 'Công nghệ',
  LIFESTYLE = 'Lối sống',
  DESIGN = 'Thiết kế',
  AI = 'Trí tuệ nhân tạo',
  TRAVEL = 'Du lịch',
  BEHIND_SCENES = 'Hậu trường',
  TIPS = 'Kinh nghiệm'
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  concept: 'Studio' | 'Outdoor' | 'Vintage' | 'Portrait';
  color: string;
}

export interface Profile {
  name: string;
  nickname: string;
  role: string;
  bio: string;
  styles: string[];
  avatar: string;
  socials: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}
