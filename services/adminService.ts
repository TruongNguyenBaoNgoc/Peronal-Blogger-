import { supabase } from './supabaseClient';

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return false;
  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .limit(1);
  if (error) {
    console.warn('isCurrentUserAdmin error', error);
    return false;
  }
  return !!data && data.length > 0;
}
