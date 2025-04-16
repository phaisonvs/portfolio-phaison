// Funções auxiliares para trabalhar com a View Transition API

/**
 * Executa uma função com transição de visualização suave
 * @param callback A função a ser executada durante a transição
 */
export function withViewTransition(callback: () => void): void {
  if (!document.startViewTransition) {
    // Se o navegador não suportar a API, apenas executa a função normalmente
    callback();
    return;
  }

  // Inicia a transição de visualização
  document.startViewTransition(() => {
    callback();
  });
}

/**
 * Navega para uma URL com transição de visualização suave
 * @param url URL para a qual navegar
 * @param router Objeto router para gerenciar a navegação
 */
export function navigateWithTransition(
  url: string,
  navigate: (path: string) => void
): void {
  if (!document.startViewTransition) {
    // Se o navegador não suportar a API, apenas navega normalmente
    navigate(url);
    return;
  }

  // Inicia a transição de visualização
  document.startViewTransition(() => {
    navigate(url);
  });
}

/**
 * Aplica estilos CSS para personalizar as transições de visualização
 */
export function applyViewTransitionStyles(): void {
  // Verifica se os estilos já foram aplicados
  if (document.getElementById("view-transition-styles")) {
    return;
  }

  // Cria um elemento de estilo para as transições de visualização
  const styleElement = document.createElement("style");
  styleElement.id = "view-transition-styles";

  styleElement.textContent = `
    ::view-transition-old(root) {
      animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
    }
    
    ::view-transition-new(root) {
      animation: 500ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
    }
    
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;

  document.head.appendChild(styleElement);
}
