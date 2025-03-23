
import React from 'react';
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function WhatsAppButton({
  phoneNumber,
  message = "Olá! Vim do seu site e gostaria de conversar sobre um projeto.",
  className,
  variant = 'filled',
  size = 'md'
}: WhatsAppButtonProps) {
  // Remove qualquer caractere não numérico do número de telefone
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Criar URL do WhatsApp
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  };
  
  const variantClasses = {
    filled: "bg-green-500 hover:bg-green-600 text-white",
    outline: "bg-transparent border border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30",
  };
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <svg 
        viewBox="0 0 24 24" 
        width={size === 'sm' ? 16 : size === 'md' ? 18 : 20} 
        height={size === 'sm' ? 16 : size === 'md' ? 18 : 20} 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      WhatsApp
    </a>
  );
}
