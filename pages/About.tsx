
import React from 'react';
import { MY_PROFILE } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Avatar & Info */}
        <div className="space-y-8">
          <div className="relative inline-block w-full">
            <div className="w-full lg:h-[50vh] rounded-[3rem] overflow-hidden border-[12px] border-white shadow-xl">
              <img src={MY_PROFILE.avatar} alt={MY_PROFILE.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#9DE0E5] text-white p-6 rounded-[2rem] cute-shadow">
              <p className="text-2xl font-black">{MY_PROFILE.nickname}</p>
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Since 2021</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">{MY_PROFILE.name}</h1>
            <p className="text-[#9DE0E5] font-black uppercase text-xs tracking-widest">{MY_PROFILE.role}</p>
            <p className="text-slate-500 leading-relaxed font-medium text-lg">
              {MY_PROFILE.bio}
            </p>
          </div>
        </div>

        {/* Right: Styles & Form */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-white shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              📸 Phong cách của mình
            </h3>
            <div className="flex flex-wrap gap-3">
              {MY_PROFILE.styles.map(style => (
                <span key={style} className="px-5 py-2 bg-[#DEF7F7] text-[#5A8D91] rounded-full text-sm font-bold">
                  #{style}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#B8BDDE] p-8 rounded-[3rem] cute-shadow text-white">
            <h3 className="text-xl font-bold mb-6">Gửi lời nhắn cho mình 💌</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Tên của bạn..." 
                className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-2xl placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <textarea 
                placeholder="Nội dung..." 
                rows={3}
                className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-2xl placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="w-full py-4 bg-white text-[#B8BDDE] rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 shadow-lg">
                Gửi đi
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-[3rem] flex items-center gap-6 shadow-sm">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-[#A6CCE2]">
              {/* Giả lập QR code */}
              <div className="w-16 h-16 bg-[#A6CCE2]/20 rounded-lg grid grid-cols-4 gap-1 p-2">
                {[...Array(16)].map((_, i) => <div key={i} className="bg-[#A6CCE2] rounded-[1px]"></div>)}
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-800">Scan QR liên hệ</p>
              <p className="text-xs text-slate-400 font-medium">Kết nối nhanh qua Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
