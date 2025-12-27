
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post, Category } from '../types';
import { generateBlogIdeas } from '../services/geminiService';

interface WritePostProps {
  onSave: (post: Post) => void;
  posts?: Post[];
}

const WritePost: React.FC<WritePostProps> = ({ onSave, posts = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editingPost = id ? posts.find(p => p.id === id) : null;
  
  const [title, setTitle] = useState(editingPost?.title || '');
  const [content, setContent] = useState(editingPost?.content || '');
  const [category, setCategory] = useState<Category>(editingPost?.category || Category.LIFESTYLE);
  const [author, setAuthor] = useState(editingPost?.author || 'Blogger Cute');
  const [imageUrl, setImageUrl] = useState(editingPost?.imageUrl || 'https://picsum.photos/seed/cute/800/450');
  
  const [aiTopic, setAiTopic] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: editingPost?.id || Date.now().toString(),
      title,
      content,
      excerpt: content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      category,
      author,
      date: editingPost?.date || new Date().toLocaleDateString('vi-VN'),
      imageUrl,
      readTime: Math.ceil(content.split(' ').length / 200) + ' phút'
    };
    onSave(newPost);
    navigate('/');
  };

  const fetchIdeas = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    const ideas = await generateBlogIdeas(aiTopic);
    setAiSuggestions(ideas);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Main Editor */}
        <div className="flex-grow space-y-8">
          <div className="bg-white/50 p-8 md:p-12 rounded-[3rem] border border-white shadow-sm">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <span className="text-3xl">📝</span> {editingPost ? 'Chỉnh sửa bài viết' : 'Viết điều gì đó mới mẻ'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-[#A6CCE2] tracking-widest mb-2 ml-4">Tiêu đề bài viết</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#9DE0E5]/20 transition-all text-xl font-bold text-slate-700 placeholder:text-slate-300"
                  placeholder="Tiêu đề thật kêu nhé..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-[#A6CCE2] tracking-widest mb-2 ml-4">Danh mục</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#9DE0E5]/20 transition-all font-bold text-slate-600 appearance-none"
                  >
                    {Object.values(Category).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[#A6CCE2] tracking-widest mb-2 ml-4">Bút danh</label>
                  <input 
                    type="text" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#9DE0E5]/20 transition-all font-bold text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[#A6CCE2] tracking-widest mb-2 ml-4">Nội dung câu chuyện</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  className="w-full px-6 py-6 bg-white border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-[#9DE0E5]/20 transition-all text-slate-600 leading-relaxed font-medium"
                  placeholder="Ghi lại những dòng suy nghĩ của bạn tại đây..."
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-white rounded-full text-slate-400 font-bold hover:text-red-400 transition-all"
                >
                  Hủy bài
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-[#9DE0E5] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#8CCFD4] transition-all cute-shadow active:scale-95"
                >
                  🚀 Đăng ngay
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="md:w-72 flex-shrink-0">
          <div className="sticky top-24 bg-[#B8BDDE] p-8 rounded-[3rem] cute-shadow text-white">
            <h3 className="flex items-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] mb-4">
              ✨ Trợ lý AI
            </h3>
            <p className="text-xs text-white/80 mb-6 font-medium leading-relaxed">
              Nhập chủ đề và để mình gợi ý tiêu đề cực nghệ cho bạn nhé!
            </p>
            <input 
              type="text"
              placeholder="Chủ đề là gì nhỉ?"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-xs mb-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
            />
            <button 
              onClick={fetchIdeas}
              disabled={isGenerating}
              className="w-full py-3 bg-white text-[#B8BDDE] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? 'Đang nghĩ...' : 'Lấy ý tưởng'}
            </button>

            {aiSuggestions.length > 0 && (
              <div className="mt-8 space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Kết quả:</p>
                {aiSuggestions.map((suggestion, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setTitle(suggestion)}
                    className="w-full text-left p-4 bg-white/10 hover:bg-white/20 text-xs text-white rounded-[1.5rem] border border-white/10 transition-colors font-medium leading-tight"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
