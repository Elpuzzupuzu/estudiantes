// src/api/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// 🚨 CORRECCIÓN: Usar import.meta.env, que es cómo Vite inyecta las variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Faltan variables de entorno de Supabase (VITE_...)");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);