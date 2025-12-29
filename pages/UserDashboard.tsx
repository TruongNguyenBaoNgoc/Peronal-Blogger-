import React, { useState } from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface UserDashboardProps {
  role?: 'admin' | 'user';
  posts: Post[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ role = 'user', posts, onDelete, onEdit }) => {
  const [statsView] = useState({
    totalPosts: posts.length,
    totalViews: posts.length * Math.floor(Math.random() * 500) + 100,
    avgReadTime: posts.length > 0 ? Math.ceil(posts.reduce((acc, p) => acc + parseInt(p.readTime), 0) / posts.length) : 0
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Bảo Ngọc Dashboard</h2>
          <p className="text-slate-500">Quản lý nội dung và theo dõi hiệu suất của bạn</p>
        </div>
        {role === 'admin' && (
          <Link to="/write" className="bg-[#9DE0E5] text-white px-6 py-3 rounded-full font-bold hover:bg-[#8CCFD4] transition-all shadow-md">
            ✨ Viết bài mới
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#9DE0E5]/20 to-[#9DE0E5]/5 rounded-[2rem] p-6 border border-[#9DE0E5]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">Tổng bài viết</p>
              <p className="text-3xl font-bold text-[#5A8D91]">{statsView.totalPosts}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#B8BDDE]/20 to-[#B8BDDE]/5 rounded-[2rem] p-6 border border-[#B8BDDE]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">Tổng lượt xem</p>
              <p className="text-3xl font-bold text-[#6366A1]">{statsView.totalViews.toLocaleString()}</p>
            </div>
            <div className="text-4xl">👁️</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#A6CCE2]/20 to-[#A6CCE2]/5 rounded-[2rem] p-6 border border-[#A6CCE2]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">Trung bình đọc</p>
              <p className="text-3xl font-bold text-[#4A95A6]">{statsView.avgReadTime} phút</p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-[#9DE0E5]/5 to-[#B8BDDE]/5">
          <h3 className="text-lg font-bold text-slate-900">Bài viết của tôi</h3>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bài viết</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đăng</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian đọc</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-900 line-clamp-1 text-sm">{post.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#9DE0E5]/20 text-[#5A8D91] rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {post.date}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                  {post.readTime}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link to={`/post/${post.id}`} className="inline-block px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-[#9DE0E5] hover:text-white text-xs font-bold rounded-lg transition-all">
                    👁️ Xem
                  </Link>
                  {role === 'admin' && (
                    <>
                      <button 
                        onClick={() => onEdit(post.id)}
                        className="px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold rounded-lg transition-all"
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
                            onDelete(post.id);
                          }
                        }}
                        className="px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold rounded-lg transition-all"
                      >
                        🗑️ Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {posts.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p className="text-lg font-medium mb-4">Chưa có bài viết nào</p>
            {role === 'admin' && (
              <Link to="/write" className="inline-block bg-[#9DE0E5] text-white px-6 py-3 rounded-full font-bold hover:bg-[#8CCFD4] transition-all">
                Viết bài đầu tiên nào!
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-6 border border-slate-200 hover:shadow-lg transition-all">
          <div className="text-3xl mb-3">📊</div>
          <h4 className="font-bold text-slate-900 mb-2">Analytics</h4>
          <p className="text-xs text-slate-500 mb-4">Xem chi tiết thống kê bài viết của bạn</p>
          <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
            Xem chi tiết
          </button>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-6 border border-slate-200 hover:shadow-lg transition-all">
          <div className="text-3xl mb-3">📸</div>
          <h4 className="font-bold text-slate-900 mb-2">Gallery</h4>
          <p className="text-xs text-slate-500 mb-4">Quản lý hình ảnh portfolio của bạn</p>
          <a href="#/portfolio" className="block w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all text-center">
            Chỉnh sửa
          </a>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-6 border border-slate-200 hover:shadow-lg transition-all">
          <div className="text-3xl mb-3">⚙️</div>
          <h4 className="font-bold text-slate-900 mb-2">Cài đặt</h4>
          <p className="text-xs text-slate-500 mb-4">Quản lý thông tin hồ sơ của bạn</p>
          <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
            Cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
