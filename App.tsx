
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PostView from './pages/PostView';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import WritePost from './pages/WritePost';
import Login from './pages/Login';
import { Post } from './types';
import { INITIAL_POSTS } from './constants';
import { fetchPosts, upsertPost, deletePostById } from './services/postService';
import { getSession, onAuthChange, signOut } from './services/authService';
import { isCurrentUserAdmin } from './services/adminService';

const Navbar: React.FC<{ isAdmin: boolean; isAuthed: boolean }> = ({ isAdmin, isAuthed }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-4 z-50 mx-4 mt-4">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] px-6 py-3 cute-shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-[#5A8D91] flex items-center gap-2">
              <span className="w-8 h-8 bg-[#9DE0E5] rounded-full flex items-center justify-center text-white">L</span>
              Trương Nguyễn Bảo Ngọc
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-bold transition-all ${isActive('/') ? 'text-[#9DE0E5] scale-110' : 'text-slate-500 hover:text-[#9DE0E5]'}`}>Trang chủ</Link>
            <Link to="/portfolio" className={`text-sm font-bold transition-all ${isActive('/portfolio') ? 'text-[#B8BDDE] scale-110' : 'text-slate-500 hover:text-[#B8BDDE]'}`}>Portfolio</Link>
            <Link to="/about" className={`text-sm font-bold transition-all ${isActive('/about') ? 'text-[#A6CCE2] scale-110' : 'text-slate-500 hover:text-[#A6CCE2]'}`}>Giới thiệu</Link>
            <Link to="/dashboard" className={`text-sm font-bold transition-all ${isActive('/dashboard') ? 'text-[#DEF7F7] scale-110' : 'text-slate-500 hover:text-[#DEF7F7]'}`}>Dashboard</Link>
            {isAdmin ? (
              <>
                <Link to="/admin" className={`text-sm font-bold transition-all ${isActive('/admin') ? 'text-[#9DE0E5] scale-110' : 'text-slate-500 hover:text-[#9DE0E5]'}`}>Admin</Link>
                <Link to="/write" className="bg-[#9DE0E5] text-white px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95">✨ Đăng bài</Link>
              </>
            ) : (
              <Link to="/login" className={`text-sm font-bold transition-all ${isActive('/login') ? 'text-[#9DE0E5] scale-110' : 'text-slate-500 hover:text-[#9DE0E5]'}`}>Đăng nhập</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="mt-20 pb-12 pt-8">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="inline-block p-8 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white/40 shadow-sm max-w-lg">
        <p className="text-2xl font-bold text-[#5A8D91] mb-2 font-serif">Stay Connected</p>
        <p className="text-slate-400 text-sm mb-6">Hãy cùng nhau tạo nên những điều tuyệt vời nhé!</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#9DE0E5] shadow-sm hover:bg-[#9DE0E5] hover:text-white transition-all">FB</a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#B8BDDE] shadow-sm hover:bg-[#B8BDDE] hover:text-white transition-all">IG</a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#A6CCE2] shadow-sm hover:bg-[#A6CCE2] hover:text-white transition-all">TT</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [role, setRole] = useState<'admin' | 'user'>(() => {
    const saved = localStorage.getItem('zenblog_role');
    return (saved === 'admin' || saved === 'user') ? (saved as 'admin' | 'user') : 'user';
  });

  useEffect(() => {
    (async () => {
      const { data } = await getSession();
      setIsAuthed(!!data.session);
      onAuthChange(async (a) => {
        setIsAuthed(a);
        setIsAdmin(a ? await isCurrentUserAdmin() : false);
      });
      if (data.session) {
        setIsAdmin(await isCurrentUserAdmin());
      }
    })();
    // Load posts from Supabase; if empty, seed initial
    (async () => {
      setLoading(true);
      const data = await fetchPosts();
      if (data.length === 0) {
        // seed initial posts once
        for (const p of INITIAL_POSTS) {
          await upsertPost(p);
        }
        const seeded = await fetchPosts();
        setPosts(seeded);
      } else {
        setPosts(data);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('zenblog_role', role);
  }, [role]);

  const addPost = async (newPost: Post) => {
    const ok = await upsertPost(newPost);
    if (ok) setPosts([newPost, ...posts]);
  };

  const updatePost = async (updatedPost: Post) => {
    const ok = await upsertPost(updatedPost);
    if (ok) setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deletePost = async (id: string) => {
    const ok = await deletePostById(id);
    if (ok) setPosts(posts.filter(p => p.id !== id));
  };

  const logoutToUser = () => {
    setRole('user');
    signOut();
    window.location.href = '#/dashboard';
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar isAdmin={isAdmin} isAuthed={isAuthed} />
        <main className="flex-grow">
          {loading && (
            <div className="max-w-5xl mx-auto px-6 py-8 text-center text-slate-500">Đang tải bài viết...</div>
          )}
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/post/:id" element={<PostView posts={posts} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<UserDashboard posts={posts} onDelete={deletePost} onEdit={(id) => window.location.href = `#/write/${id}`} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={isAdmin ? (
              <AdminDashboard posts={posts} onDelete={deletePost} onEdit={(id) => window.location.href = `#/write/${id}`} onLogout={logoutToUser} />
            ) : (
              <Login />
            )} />
            <Route path="/write" element={isAdmin ? (<WritePost onSave={addPost} posts={posts} />) : (<Login />)} />
            <Route path="/write/:id" element={isAdmin ? (<WritePost onSave={updatePost} posts={posts} />) : (<Login />)} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
