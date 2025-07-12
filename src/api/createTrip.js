import { supabase } from './supabase';

export const createTrip = async (tripData) => {
  const { data, error } = await supabase
    .from('base-trips') // اسم الجدول في قاعدة البيانات
    .insert([tripData]);

  if (error) throw error;

  return data;
};
