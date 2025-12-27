
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <Link to={`/post/${post.id}`} className="group relative block cute-card overflow-hidden cute-shadow mb-12">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-72 md:h-auto overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="p-8 md:p-14 flex flex-col justify-center bg-white/60">
            <span className="inline-block px-4 py-1.5 text-xs font-bold text-[#5A8D91] bg-[#DEF7F7] rounded-full mb-6 w-fit uppercase tracking-widest">
              🌟 {post.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 group-hover:text-[#9DE0E5] transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-slate-500 text-lg mb-8 line-clamp-2 font-medium">
              {post.excerpt}
            </p>
            <div className="flex items-center text-sm font-semibold text-slate-400">
              <span className="text-[#B8BDDE]">{post.author}</span>
              <span className="mx-3 opacity-30">•</span>
              <span>{post.readTime} đọc</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group cute-card overflow-hidden border border-white/60 shadow-sm hover:shadow-xl flex flex-col h-full bg-white/40 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[1.5rem]">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[10px] font-bold text-white bg-[#B8BDDE]/80 backdrop-blur-md rounded-full uppercase tracking-tighter">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 pt-2 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#9DE0E5] transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100/50">
          <span className="text-xs font-bold text-[#A6CCE2]">{post.author}</span>
          <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase">
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
