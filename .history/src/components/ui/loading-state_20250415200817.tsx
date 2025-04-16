import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface LoadingStateProps {
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
  children: ReactNode;
  loadingText?: string;
  errorText?: string;
  onRetry?: () => void;
}

export function LoadingState({
  isLoading,
  isError = false,
  error = null,
  children,
  loadingText = "Carregando...",
  errorText = "Ocorreu um erro ao carregar os dados.",
  onRetry,
}: LoadingStateProps) {
  // Estado de carregamento
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <p className="text-muted-foreground">{loadingText}</p>
      </div>
    );
  }

  // Estado de erro
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 max-w-md w-full">
          <h3 className="font-medium mb-2">Erro</h3>
          <p className="text-sm">{errorText}</p>
          {error && (
            <p className="text-xs mt-2 font-mono bg-destructive/5 p-2 rounded">
              {error.message}
            </p>
          )}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  // Estado de sucesso
  return <>{children}</>;
}
