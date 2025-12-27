import { supabase } from './supabaseClient';
import type { Post } from '../types';

const TABLE = 'posts';

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('date', { ascending: false });
  if (error) {
    console.warn('fetchPosts error', error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function upsertPost(post: Post): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE)
    .upsert(post, { onConflict: 'id' });
  if (error) {
    console.warn('upsertPost error', error);
    return false;
  }
  return true;
}

export async function deletePostById(id: string): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);
  if (error) {
    console.warn('deletePost error', error);
    return false;
  }
  return true;
}
