
// Utility functions for smooth scroll animations
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Configuração otimizada para o IntersectionObserver
export const setupScrollAnimations = () => {
  // Use uma única instância do IntersectionObserver para melhor performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // Aplicar a classe de animação quando o elemento estiver visível
          element.classList.add('animate');
          
          // Opcionalmente, parar de observar depois da animação
          if (element.getAttribute('data-observe-once') === 'true') {
            observer.unobserve(element);
          }
        } else if (element.getAttribute('data-observe-once') !== 'true') {
          // Remover a classe se o elemento sair da tela (apenas para elementos de animação contínua)
          element.classList.remove('animate');
        }
      });
    },
    {
      threshold: 0.1, // Iniciar a animação quando 10% do elemento estiver visível
      rootMargin: '0px 0px -100px 0px', // Margem negativa inferior para iniciar a animação um pouco antes
    }
  );

  // Selecionar todos os elementos com a classe animate-on-scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observar cada elemento
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Função para limpar o observador quando necessário
  return () => {
    animateElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};

// Função para animar elementos com base na posição de rolagem
export const animateOnScroll = (element: HTMLElement, startOffset: number = 0.2, endOffset: number = 0.8) => {
  if (!element) return;

  const handleScroll = () => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calcular a visibilidade do elemento na tela
    const visiblePortion = 1 - (rect.bottom / windowHeight);
    
    // Normalizar valor entre startOffset e endOffset
    const scrollProgress = Math.max(0, Math.min(1, (visiblePortion - startOffset) / (endOffset - startOffset)));
    
    // Aplicar o valor como propriedade CSS personalizada
    element.style.setProperty('--scroll-progress', scrollProgress.toString());
    
    // Adicionar classe quando o elemento é visível
    if (scrollProgress > 0 && scrollProgress < 1) {
      element.classList.add('in-view');
    } else {
      element.classList.remove('in-view');
    }
  };

  // Configuração inicial
  handleScroll();
  
  // Otimizar performance com throttling
  let ticking = false;
  
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  // Adicionar evento de rolagem
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Retornar função para limpar o evento
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

// Configurar animações para elementos de circuito
export const setupCircuitAnimations = () => {
  const circuitElements = document.querySelectorAll('.circuit-lines-container');
  
  circuitElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      animateOnScroll(element, 0.1, 0.7);
    }
  });
};
