import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixtjokxhrlaxqfqsxigc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dGpva3hocmxheHFmcXN4aWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTkxNTUsImV4cCI6MjA3NDg3NTE1NX0.4BEhI1nCOgtcWY5p8zvKR4xzCk9Yp0CWIMQUMLO_ERg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
