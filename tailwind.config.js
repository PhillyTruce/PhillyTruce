import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
const config = {
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
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1C4587",
                    foreground: "#1C4587",
                },
                level: {
                    "1": "#FFFFFF",
                    "2": "#F3F3F3",
                },
                status: {
                    positive: "#4ECB71",
                    notification: "#F6893C",
                    negative: "#B3261E",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
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
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                default: "#334155",
                accent: "#F2F2F2",
                link: "#0D99FF",
                transparent: colors.transparent,
                white: colors.white,
                black: colors.black,
                homelistbg: "#F3F3F3",
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
                slide: {
                    from: {
                        transform: "translateX(100%)",
                    },
                    to: {
                        transform: "translateX(0%)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                slide: "slide 750ms ease-in-out",
            },
            boxShadow: Object.assign({}, defaultTheme.boxShadow),
            fontSize: {
                '2xs': '0.625rem'
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;