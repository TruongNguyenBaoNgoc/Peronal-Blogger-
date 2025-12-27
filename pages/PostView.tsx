
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';
import { summarizePost } from '../services/geminiService';

interface PostViewProps {
  posts: Post[];
}

const PostView: React.FC<PostViewProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);
  
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    if (!post) return;
    setIsSummarizing(true);
    const result = await summarizePost(post.content);
    setSummary(result);
    setIsSummarizing(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] text-center cute-shadow">
           <h2 className="text-3xl font-bold text-slate-800 mb-4">Hic! Không tìm thấy rồi.</h2>
           <Link to="/" className="text-[#9DE0E5] font-bold hover:underline">Quay về trang chủ thôi</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-12 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center text-xs font-bold text-[#A6CCE2] hover:text-[#9DE0E5] transition-colors mb-8 bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </Link>
        <div className="mb-6">
          <span className="px-4 py-1.5 text-xs font-black text-[#5A8D91] bg-white rounded-full uppercase tracking-widest shadow-sm">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-slate-400 text-sm font-bold">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <img src={`https://ui-avatars.com/api/?name=${post.author}&background=9DE0E5&color=fff&rounded=true`} className="w-6 h-6 mr-2" alt={post.author} />
            <span className="text-slate-600">{post.author}</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm">{post.date}</span>
        </div>
      </header>

      <div className="rounded-[3rem] overflow-hidden shadow-xl mb-16 border-8 border-white">
        <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <article className="flex-grow bg-white/50 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/60">
          <div 
            className="text-slate-700 leading-relaxed space-y-6 text-lg font-medium prose prose-slate"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Sidebar Widgets */}
        <aside className="lg:w-72 flex-shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-white/60">
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 bg-[#DEF7F7] rounded-full text-[#9DE0E5]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95l.13 4.14 3.974-.522a1 1 0 011.082 1.258l-1.01 3.535 3.125 1.15a1 1 0 01.077 1.831l-3.23 1.545 1.54 3.234a1 1 0 01-1.832.078l-1.147-3.125-3.537 1.01a1 1 0 01-1.259-1.082l.523-3.974-4.14-.13a1 1 0 01-.95-.897l-.047-1.13a1 1 0 01.95-.897l4.14.13-.523-3.974a1 1 0 011.082-1.258l3.535 1.01-1.15-3.125a1 1 0 01.077-1.831l3.23-1.545-1.54-3.234a1 1 0 011.832-.078l1.147 3.125 3.537-1.01a1 1 0 011.259 1.082l-.523 3.974 4.14.13a1 1 0 01.95.897l.047 1.13a1 1 0 01-.95.897l-4.14-.13.523 3.974a1 1 0 01-1.082 1.258l-3.535-1.01 1.15 3.125a1 1 0 01-.077 1.831l-3.23 1.545 1.54 3.234a1 1 0 01-1.832.078l-1.147-3.125-3.537 1.01a1 1 0 01-1.259-1.082l.523-3.974-4.14-.13a1 1 0 01-.95-.897l-.047-1.13a1 1 0 01.95-.897l4.14.13-.523-3.974a1 1 0 011.082-1.258l3.535 1.01-1.15-3.125a1 1 0 01.077-1.831l3.23-1.545-1.54-3.234a1 1 0 011.832-.078l1.147 3.125 3.537-1.01a1 1 0 011.259 1.082l-.523 3.974 4.14.13a1 1 0 01.95.897l.047 1.13z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="font-black text-[#5A8D91] uppercase text-xs tracking-widest">AI Summary</h3>
            </div>
            
            {!summary ? (
              <div className="space-y-4">
                <p className="text-slate-500 text-sm font-medium">
                 
                </p>
                <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="w-full py-3 bg-[#9DE0E5] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#8CCFD4] transition-all disabled:opacity-50 cute-shadow active:scale-95"
                >
                  {isSummarizing ? 'Đang đọc...' : 'Tóm tắt ngay'}
                </button>
              </div>
            ) : (
              <div className="bg-[#DEF7F7]/50 p-6 rounded-[2rem] border border-[#9DE0E5]/20">
                <p className="text-slate-600 text-sm italic font-medium leading-relaxed">
                  {summary}
                </p>
                <button 
                  onClick={() => setSummary(null)}
                  className="mt-6 text-[10px] font-black uppercase text-[#9DE0E5] tracking-widest hover:text-[#5A8D91]"
                >
                  Tạo tóm tắt khác
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#B8BDDE] text-white p-8 rounded-[2.5rem] cute-shadow">
            <h3 className="font-black uppercase text-xs tracking-[0.2em] mb-4">Gửi chút yêu thương</h3>
            <p className="text-white/80 text-xs font-medium mb-6">
              Đăng ký để nhận những thông báo mới nhất từ mình nhé! 🍬
            </p>
            <input 
              type="email" 
              placeholder="Email của bạn nè..."
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl mb-4 text-xs placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="w-full py-3 bg-white text-[#B8BDDE] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
              Đăng ký
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostView;
