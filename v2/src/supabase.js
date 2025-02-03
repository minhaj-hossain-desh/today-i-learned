
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eplvslaknoesemxzgimf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbHZzbGFrbm9lc2VteHpnaW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg3NTQsImV4cCI6MjA1MjYyNDc1NH0.oC0J_kvwqJ0JprCqmZKCy0U1TU_3J2dw8Jl80NW0SKk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;