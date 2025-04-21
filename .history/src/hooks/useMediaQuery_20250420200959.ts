import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Função para atualizar o estado
    const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    // Verificação inicial
    setMatches(mediaQuery.matches);

    // Adicionar listener para mudanças
    if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMatches);
    } else {
      mediaQuery.addEventListener("change", updateMatches);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateMatches);
      } else {
        mediaQuery.removeEventListener("change", updateMatches);
      }
    };
  }, [query]);

  return matches;
}
