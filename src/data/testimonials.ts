
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Ferreira",
    position: "CEO",
    company: "TechInova",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "A colaboração foi excepcional! Entregou além das expectativas, demonstrando profissionalismo e uma compreensão profunda do que procurávamos."
  },
  {
    id: "2",
    name: "Carlos Mendes",
    position: "CTO",
    company: "DigitalSolutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Técnica impressionante aliada a uma comunicação clara. Resolveu problemas complexos com soluções elegantes e eficientes."
  },
  {
    id: "3",
    name: "Mariana Costa",
    position: "Diretora de Produto",
    company: "InnovateTech",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Trabalha com um nível de qualidade e dedicação incomparável. Verdadeiramente um profissional que entende as necessidades do negócio e implementa soluções técnicas perfeitas."
  }
];
