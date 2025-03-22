
import React from "react";
import { ScrollAnimator } from "@/components/ScrollAnimator";

const AdminSettings = () => {
  return (
    <div>
      <ScrollAnimator>
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      </ScrollAnimator>
      
      {/* Personal Info */}
      <ScrollAnimator className="mb-8">
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <h2 className="text-lg font-medium mb-6">Informações Pessoais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                defaultValue="Milton Ivan"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                defaultValue="Desenvolvedor Javascript Profissional"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                defaultValue="Criando valor para o crescimento dos negócios através do código."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </ScrollAnimator>
      
      {/* Social Links */}
      <ScrollAnimator className="mb-8">
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <h2 className="text-lg font-medium mb-6">Redes Sociais</h2>
          
          <div className="space-y-4 mb-6">
            {[
              { name: "GitHub", value: "https://github.com/username" },
              { name: "LinkedIn", value: "https://linkedin.com/in/username" },
              { name: "Twitter", value: "https://twitter.com/username" },
              { name: "Email", value: "mail@example.com" },
            ].map((social, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">{social.name}</label>
                <input
                  type="text"
                  defaultValue={social.value}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </ScrollAnimator>
      
      {/* Site Settings */}
      <ScrollAnimator>
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <h2 className="text-lg font-medium mb-6">Configurações do Site</h2>
          
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">SEO - Título da Página</label>
              <input
                type="text"
                defaultValue="Milton Ivan - Desenvolvedor Javascript Profissional"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">SEO - Descrição</label>
              <textarea
                defaultValue="Portfólio de Milton Ivan, Desenvolvedor Javascript Profissional especializado em soluções web modernas e escaláveis."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="googleAnalytics"
                defaultChecked
                className="w-4 h-4 mr-2"
              />
              <label htmlFor="googleAnalytics" className="text-sm font-medium">Ativar Google Analytics</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">ID do Google Analytics</label>
              <input
                type="text"
                defaultValue="G-XXXXXXXXXX"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </ScrollAnimator>
    </div>
  );
};

export default AdminSettings;
