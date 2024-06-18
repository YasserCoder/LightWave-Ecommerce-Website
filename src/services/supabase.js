import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hduuhqllappeuqfoofzi.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdXVocWxsYXBwZXVxZm9vZnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMDI5NTgsImV4cCI6MjAzMzY3ODk1OH0.xDnzVcVqAZJ-Ujo9Q3YCvlnChsAGoVTXh8NJMeqLtCQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
