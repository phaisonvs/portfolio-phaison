import { createClient } from "@supabase/supabase-js";

// Cria um cliente Supabase com as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";

// Verifica se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseKey) {
  console.warn("Variáveis de ambiente Supabase não encontradas");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Interface para o tipo Project
export interface Project {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  images: string[];
  technologies: string[];
  features: string[];
  created_at: string;
  updated_at: string;
  github_link?: string;
  live_link?: string;
}

// Funções de API

/**
 * Obtém todos os projetos
 */
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }

  return data || [];
};

/**
 * Obtém um projeto pelo ID
 */
export const getProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Erro ao buscar projeto com ID ${id}:`, error);
    throw error;
  }

  return data;
};
