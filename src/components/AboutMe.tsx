
import React from 'react';
import { ScrollAnimator } from "@/components/ScrollAnimator";

export function AboutMe() {
  return (
    <section className="py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <ScrollAnimator className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre mim</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Olá! Sou Milton Ivan, um desenvolvedor profissional especializado em tecnologias JavaScript. 
                Nos últimos 8 anos, tenho trabalhado com diversas empresas e startups, ajudando a transformar 
                ideias em produtos digitais de alta qualidade.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Minha jornada no desenvolvimento começou há mais de uma década, quando criei meu primeiro 
                site com HTML e CSS. Desde então, evoluí para trabalhar com frameworks modernos como React, 
                Vue.js e Node.js, sempre buscando as melhores práticas e padrões de arquitetura.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Acredito firmemente no poder do código limpo e bem estruturado. Meu objetivo é não apenas 
                criar soluções que funcionam hoje, mas que sejam fáceis de manter e escalar no futuro.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Minhas habilidades incluem:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  React/Next.js
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  TypeScript
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  Node.js
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  Tailwind CSS
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  AWS/Vercel
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm shadow-sm">
                  UI/UX Design
                </div>
              </div>
            </div>
          </ScrollAnimator>

          <ScrollAnimator className="lg:w-1/2" delay={200}>
            <div className="relative">
              <img 
                src="/lovable-uploads/9e0cd413-c15d-4cf3-80ad-b6245c3718c4.png" 
                alt="Milton Ivan trabalhando em seu escritório"
                className="w-full rounded-lg shadow-lg" 
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">Disponível para novos projetos</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Estou atualmente buscando novos desafios e oportunidades de colaboração
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
