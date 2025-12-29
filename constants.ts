
import { Post, Category, GalleryItem, Profile } from './types';

export const MY_PROFILE: Profile = {
  name: 'Trương Nguyễn Bảo Ngọc',
  nickname: 'Bảo Ngọc',
  role: 'Freelance Model / Concept Creator',
  bio: 'Mình là Trương Nguyênc Bảo Ngọc, sinh viên năm cuối của Trường Đại Học HUTECH. Đây sẽ là nơi chia sẻ về bản thân mình và nhưng lưu ý mà mình biết được khi đi học',
  styles: ['Vintage', 'Nàng thơ', 'Street Style', 'High Fashion'],
  avatar: '/z7355132863874_9fe8794bd3b2f2145b1e0669de0129cf.jpg',
  socials: {
    facebook: 'fb.com/baongoc',
    instagram: '@baongoc_dreamer',
    tiktok: '@baongoc_daily'
  }
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', url: '/z7355132411217_84b1702b470d385b532f60626793efab.jpg', title: 'Lifestyle Moment', concept: 'Lifestyle', color: 'Warm' },
  { id: 'g2', url: '/z7355132413467_90cb4f32f2f19ef4ae1ef3d5e4ad0c5e.jpg', title: 'Daily Vibe', concept: 'Lifestyle', color: 'Bright' },
  { id: 'g3', url: '/z7355132423924_eca3de1b1c310c786b5e9015372cd862.jpg', title: 'Lifestyle Style', concept: 'Lifestyle', color: 'Neutral' },
  { id: 'g4', url: '/z7355132439683_b2a7e33d3349c26b114d9a0a65fefa3d.jpg', title: 'Lifestyle Mood', concept: 'Lifestyle', color: 'Cold' },
  { id: 'g5', url: '/z7355132432671_6e16a2c6e088d051741d0574adfcbee6.jpg', title: 'Studio Setup', concept: 'Studio', color: 'Neutral' },
  { id: 'g6', url: '/z7355132439682_eb4e7aac00380af1d015b3d48c2ac6b0.jpg', title: 'Studio Light', concept: 'Studio', color: 'Warm' },
  { id: 'g7', url: '/z7355132441018_5bc0db72445649fd874f303b409dc32f.jpg', title: 'Studio Session', concept: 'Studio', color: 'Bright' },
  { id: 'g8', url: '/z7355132441211_dde14d920713c1ff2d7a396a95891015.jpg', title: 'Creative Studio', concept: 'Studio', color: 'Cold' },
  { id: 'g9', url: '/z7355132453157_c96326ef1ec9767bd6d96a5c8a2b2645.jpg', title: 'Studio Mood', concept: 'Studio', color: 'Pastel' },
  { id: 'g10', url: '/z7355132473265_2af421dbbc9b4807baa4a7097e26be93.jpg', title: 'Studio Portrait', concept: 'Studio', color: 'Sepia' },
  { id: 'g11', url: '/z7355132477747_40ce38e1fa2589ce94b9c90227ee97d2.jpg', title: 'Studio Art', concept: 'Studio', color: 'Warm' },
  { id: 'g12', url: '/z7355132479431_f4c5cedf7930cc5a2229e1d159491653.jpg', title: 'Studio Concept', concept: 'Studio', color: 'Bright' },
  { id: 'g13', url: '/z7355132479432_0f49978b59d8ae7022b2595844db0845.jpg', title: 'Studio Frame', concept: 'Studio', color: 'Neutral' },
  { id: 'g14', url: '/z7355132479433_cadff5eb4758c280e6c3dc91a7b5df0d.jpg', title: 'Studio Vision', concept: 'Studio', color: 'Cold' },
  { id: 'g15', url: '/z7355132483261_168dea009d13fb1cbc6977312d923b0c.jpg', title: 'Studio Dream', concept: 'Studio', color: 'Pastel' },
  { id: 'g16', url: '/z7355132490164_274189a180f86ae0b3910ee328aa640d.jpg', title: 'Studio Magic', concept: 'Studio', color: 'Sepia' },
  { id: 'g17', url: '/z7355132492312_9d914145210aa4d9779413f8aca4c8cb.jpg', title: 'Studio Glow', concept: 'Studio', color: 'Warm' },
  { id: 'g18', url: '/z7355132497401_205f857e23300e297aeb2a5feed86c08.jpg', title: 'Studio Scene', concept: 'Studio', color: 'Bright' },
  { id: 'g19', url: '/z7355132506411_3d98ba833a9bc2e7554efe822e3d6792.jpg', title: 'Studio Style', concept: 'Studio', color: 'Neutral' },
  { id: 'g20', url: '/z7355132513225_a8ae835f5de1aad3bc9b5ff6ede5330c.jpg', title: 'Studio Vibe', concept: 'Studio', color: 'Cold' },
  { id: 'g21', url: '/z7355132513417_71ef2ed6279038040ab2d5fdc488bae8.jpg', title: 'Studio Essence', concept: 'Studio', color: 'Pastel' },
  { id: 'g22', url: '/z7355132513616_0c6da37cdcd2668c6db1f78124dec74d.jpg', title: 'Studio Grace', concept: 'Studio', color: 'Sepia' },
  { id: 'g23', url: '/z7355132524660_0f307edbdae4268a7bdc360813f40181.jpg', title: 'Studio Beauty', concept: 'Studio', color: 'Warm' },
  { id: 'g24', url: '/z7355132531037_2253a938c5110942a401d9be0a9bd5b1.jpg', title: 'Studio Charm', concept: 'Studio', color: 'Bright' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'Kể chuyện sau ống kính: Bộ ảnh "Mùa Thu Trong Veo"',
    excerpt: 'Lần đầu tiên mình thử sức với ánh sáng tự nhiên lúc 5h sáng tại bờ hồ sương mù...',
    content: `
      <h2>Ý tưởng ban đầu</h2>
      <p>Mình muốn tạo ra một cảm giác hoài niệm nhưng vẫn tươi mới. Bộ ảnh này được thực hiện tại một công viên cũ...</p>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200" class="rounded-[2rem] my-8 shadow-lg" />
      <h3>Tips cho các bạn mẫu mới</h3>
      <p>Đừng quá gồng mình, hãy thả lỏng và tương tác với môi trường xung quanh.</p>
    `,
    category: Category.BEHIND_SCENES,
    author: 'Trương Nguyễn Bảo Ngọc',
    date: '20/05/2024',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    readTime: '5 phút'
  }
];
