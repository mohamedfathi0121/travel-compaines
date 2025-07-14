import { supabase } from './supabase';

export const createTrip = async (tripData) => {
  const { data, error } = await supabase
    .from('base-trips')
    .insert([tripData]);

  if (error) throw error;

  return data;
};
