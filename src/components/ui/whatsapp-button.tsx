
"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  children: React.ReactNode;
  className?: string;
}

export function WhatsAppButton({ 
  phoneNumber, 
  message = "Olá, gostaria de conversar sobre um projeto.", 
  children,
  className
}: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    
    // Formatar número de telefone removendo caracteres não numéricos
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Abrir em nova janela/aba
    window.open(whatsappUrl, "_blank");
    
    // Resetar estado de loading após pequeno delay
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "relative justify-center cursor-pointer inline-flex items-center text-center",
        "ease-out duration-200 rounded-md outline-none transition-all outline-0",
        "focus-visible:outline-4 focus-visible:outline-offset-1",
        "bg-[hsl(151.3deg_66.9%_66.9%)]",
        "hover:bg-[hsl(156.5deg_86.5%_26.1%)]/90",
        "dark:bg-[hsl(154.9deg_100%_19.2%)]",
        "dark:hover:bg-[hsl(154.9deg_59.5%_70%)]/50",
        "text-foreground",
        "!border !border-[hsl(var(--brand-500)_/_0.75)]",
        "dark:!border-[hsl(154.9deg_100%_19.2%)]/30",
        "hover:!border-[hsl(156.5deg_86.5%_26.1%)]",
        "dark:hover:!border-[hsl(154.9deg_59.5%_70%)]",
        isLoading && [
          "!pl-7",
          "!bg-[hsl(156.5deg_86.5%_26.1%)]/90",
          "dark:!bg-[hsl(154.9deg_59.5%_70%)]/50",
          "!border-[hsl(156.5deg_86.5%_26.1%)]",
          "dark:!border-[hsl(154.9deg_59.5%_70%)]"
        ],
        className
      )}
      style={{
        '--brand-500': '155.3deg 78.4% 40%'
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <div 
          className={cn(
            "absolute left-2.5 transition-all duration-200 ease-in-out opacity-0 -translate-x-2",
            isLoading && "opacity-100 translate-x-0"
          )}
        >
          <LoaderCircle
            className="animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <span>{children}</span>
      </div>
    </Button>
  );
}
