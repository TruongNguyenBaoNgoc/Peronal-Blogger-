
import React from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface AdminDashboardProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, onDelete, onEdit, onLogout }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-900">Quản lý bài viết (Admin)</h2>
        <div className="flex items-center gap-3">
          <Link to="/write" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md">
            Viết bài mới
          </Link>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-all border border-slate-200"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bài viết</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đăng</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={post.imageUrl} className="w-12 h-12 rounded object-cover" alt="" />
                    <span className="font-medium text-slate-900 line-clamp-1">{post.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {post.date}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link to={`/post/${post.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Xem</Link>
                  <button 
                    onClick={() => onEdit(post.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
                        onDelete(post.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {posts.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            Chưa có bài viết nào để quản lý.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
