import { supabase, hasSupabase } from './supabaseClient';
import type { Post } from '../types';

const TABLE = 'posts';

export async function fetchPosts(): Promise<Post[]> {
  if (!hasSupabase || !supabase) return [];
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function upsertPost(post: Post): Promise<Post> {
  if (!hasSupabase || !supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from(TABLE).upsert(post).select().single();
  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  if (!hasSupabase || !supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
