
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadConcept, setUploadConcept] = useState('Studio');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const concepts = ['All', 'Studio', 'Lifestyle', 'Outdoor', 'Vintage', 'Portrait'];
  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.concept === filter);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      alert('Chỉ được chọn tối đa 10 ảnh!');
      return;
    }
    setSelectedFiles([...selectedFiles, ...files].slice(0, 10));
  };

  const handleUpload = () => {
    const newItems: GalleryItem[] = selectedFiles.map((file, idx) => ({
      id: `g${Date.now()}_${idx}`,
      url: URL.createObjectURL(file),
      title: file.name.split('.')[0],
      concept: uploadConcept,
      color: 'Neutral'
    }));
    setGalleryItems([...newItems, ...galleryItems]);
    setSelectedFiles([]);
    setShowUploadModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-800 mb-6">Gallery của Bảo Ngọc</h2>
        <p className="text-slate-500 font-medium">Mỗi bức ảnh là một câu chuyện riêng biệt.</p>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="mt-6 bg-[#9DE0E5] text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          📸 Đăng ảnh mới
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {concepts.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === c ? 'bg-[#B8BDDE] text-white cute-shadow' : 'bg-white text-slate-400 hover:bg-[#DEF7F7]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-[2.5rem] cute-shadow cursor-pointer border-4 border-white"
            onClick={() => setSelectedImage(item.url)}
          >
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#B8BDDE]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
              <span className="text-[10px] font-black uppercase text-white/80 tracking-widest mb-1">{item.concept}</span>
              <h4 className="text-xl font-bold text-white">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <img src={selectedImage} className="max-h-full max-w-full rounded-[2rem] object-contain shadow-2xl" />
            <button className="absolute top-4 right-4 text-white text-4xl">&times;</button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Đăng ảnh mới</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-600 mb-2">Chọn danh mục</label>
              <select 
                value={uploadConcept}
                onChange={(e) => setUploadConcept(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9DE0E5]"
              >
                {concepts.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-600 mb-2">Chọn ảnh (tối đa 10)</label>
              <input 
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9DE0E5]"
              />
              <p className="text-xs text-slate-400 mt-2">Đã chọn: {selectedFiles.length}/10 ảnh</p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-6 grid grid-cols-5 gap-2">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img src={URL.createObjectURL(file)} className="w-full h-20 object-cover rounded-lg" />
                    <button 
                      onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => { setShowUploadModal(false); setSelectedFiles([]); }}
                className="px-6 py-3 bg-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-300 transition-all"
              >
                Hủy
              </button>
              <button 
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className="px-6 py-3 bg-[#9DE0E5] text-white rounded-full font-bold hover:bg-[#8CCFD4] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Đăng {selectedFiles.length} ảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
