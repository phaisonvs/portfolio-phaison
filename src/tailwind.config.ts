
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ['FinalSix', 'Inter', 'sans-serif'],
				mono: ['Fira Code', 'monospace'],
				geist: ['FinalSix', 'Inter', 'sans-serif'],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Cores personalizadas para o tema azul marinho
				navy: {
					50: "#E7ECF2",
					100: "#C0D1E2",
					200: "#96B3D0",
					300: "#6C95BD",
					400: "#4D7FAE",
					500: "#2D699F",
					600: "#1E5187",
					700: "#0F3A6F",
					800: "#072657",
					900: "#031A3F",
				},
				// Novas cores para melhorar o modo light
				sky: {
					50: "#F0F7FF",
					100: "#E0F0FF",
					200: "#BDE0FF",
					300: "#91C8FF",
					400: "#61ABFF",
					500: "#3B8BF6",
					600: "#2E6FD9",
					700: "#1E54B7",
					800: "#153C8C",
					900: "#0C2D6F",
				},
				teal: {
					50: "#EFFCF6",
					100: "#DCF7EC",
					200: "#B8EED9",
					300: "#88E0C3",
					400: "#5BCCA7",
					500: "#3EB489",
					600: "#2E9B72",
					700: "#20785A",
					800: "#175C45",
					900: "#0F4635",
				},
				amber: {
					50: "#FFFAEB",
					100: "#FFF3C7",
					200: "#FFE483",
					300: "#FFD54F",
					400: "#FFC929",
					500: "#FFC107",
					600: "#E0A800",
					700: "#BB8A00",
					800: "#956C00",
					900: "#7A5900",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-in-right": {
					"0%": { opacity: "0", transform: "translateX(20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" }
				},
				"fade-in-left": {
					"0%": { opacity: "0", transform: "translateX(-20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" }
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" }
				},
				"slow-spin": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" }
				},
				"btn-press": {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(0.97)" },
					"100%": { transform: "scale(1)" }
				},
				"grid-pulse": {
					"0%": { opacity: "0.3" },
					"50%": { opacity: "0.8" },
					"100%": { opacity: "0.3" }
				},
				"float": {
					"0%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateY(0px)" }
				},
				"parallax-scroll": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-50%)" }
				},
				"grid": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(calc(-100% + 100vh))" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.7s ease-out",
				"fade-in-right": "fade-in-right 0.7s ease-out",
				"fade-in-left": "fade-in-left 0.7s ease-out",
				"scale-in": "scale-in 0.6s ease-out",
				"slow-spin": "slow-spin 15s linear infinite",
				"btn-press": "btn-press 0.3s ease-in-out",
				"grid-pulse": "grid-pulse 3s ease-in-out infinite",
				"float": "float 5s ease-in-out infinite",
				"parallax-scroll": "parallax-scroll 15s linear infinite alternate",
				"grid": "grid 15s linear infinite"
			},
			backdropBlur: {
				xs: '2px',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
