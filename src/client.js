import { createClient } from '@supabase/supabase-js';

// 🔧 Replace these with your Supabase project credentials
// Go to: Supabase Dashboard → Settings → API
const URL = 'https://aeeikwlwuaelfaybkkaz.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZWlrd2x3dWFlbGZheWJra2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NTMwNTksImV4cCI6MjA5MzQyOTA1OX0.Vw9SqoWJWrQ_sSUk4qkvxf4frQppnLcBXZJXQn4G4zM';

export const supabase = createClient(URL, API_KEY);
