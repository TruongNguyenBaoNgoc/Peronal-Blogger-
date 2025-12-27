
import React from 'react';
import PostCard from '../components/PostCard';
import { Post, Category } from '../types';
import { Link } from 'react-router-dom';
import { MY_PROFILE } from '../constants';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Hero Welcome */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-24 py-12">
        <div className="order-2 md:order-1 space-y-8">
          <div className="inline-block px-4 py-1.5 bg-[#DEF7F7] text-[#5A8D91] rounded-full text-xs font-black uppercase tracking-widest">
            Hello, Cậu đã đến! 👋
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-800 leading-[1.1]">
            Mình là <span className="text-[#9DE0E5]">{MY_PROFILE.nickname}</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
            Ghi lại những khoảnh khắc đời thường qua lăng kính mộng mơ và những bộ ảnh concept đặc sắc.
          </p>
          <div className="flex gap-4">
            <Link to="/portfolio" className="bg-[#B8BDDE] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Xem Gallery</Link>
            <Link to="/about" className="bg-white text-slate-500 px-8 py-4 rounded-full font-black uppercase tracking-widest border border-slate-100 hover:bg-[#DEF7F7] transition-all">Giới thiệu</Link>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#9DE0E5] rounded-[3rem] rotate-6 absolute inset-0 -z-10 opacity-20"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#B8BDDE] rounded-full -rotate-6 absolute inset-0 -z-10 opacity-20"></div>
            <img 
              src={MY_PROFILE.avatar} 
              alt="Avatar" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3.5rem] shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Câu chuyện mới ☁️</h2>
          <Link to="/admin" className="text-[#9DE0E5] font-bold text-sm hover:underline">Xem tất cả bài viết &rarr;</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Instagram Hook */}
      <section className="bg-white/40 backdrop-blur-md rounded-[3rem] p-12 text-center border border-white/60">
        <h3 className="text-2xl font-bold text-slate-800 mb-4 font-serif">Follow me on Instagram</h3>
        <p className="text-[#B8BDDE] font-black text-xl mb-8">{MY_PROFILE.socials.instagram}</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <img src={`https://picsum.photos/seed/insta${i}/300/300`} className="w-full h-full object-cover" alt="insta" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
