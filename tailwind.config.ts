import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function({ addBase } : { addBase: any }) {
      addBase({
        'html': {
          fontFamily: 'Times New Roman, serif',
          lineHeight: '1.5',
          backgroundColor: '#fff',
          color: '#000',
        },
        'body': {
          margin: '8px',
          padding: '0',
        },
        'a': {
          color: '#00f',
          textDecoration: 'underline',
        },
        'a:visited': {
          color: '#800080',
        },
        'button': {
          backgroundColor: '#e0e0e0',
          border: '2px outset #d5d5d5',
          padding: '2px 6px',
          color: '#000',
          cursor: 'pointer',
        },
        'button:active': {
          border: '2px inset #d5d5d5',
        },
        'input, select, textarea': {
          backgroundColor: '#fff',
          border: '2px inset #d5d5d5',
          padding: '2px',
        },
        'input[type=submit], input[type=reset], input[type=button]': {
          backgroundColor: '#e0e0e0',
          border: '2px outset #d5d5d5',
          padding: '2px 6px',
          color: '#000',
          cursor: 'pointer',
        },
        'input[type=submit]:active, input[type=reset]:active, input[type=button]:active': {
          border: '2px inset #d5d5d5',
        },
        'hr': {
          border: '1px inset #808080',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: 'bold',
          margin: '0.67em 0',
        },
        'h1': { fontSize: '2em' },
        'h2': { fontSize: '1.5em' },
        'h3': { fontSize: '1.17em' },
        'table': {
          borderCollapse: 'collapse',
          border: '2px outset #d5d5d5',
        },
        'th, td': {
          border: '1px solid #d5d5d5',
          padding: '4px',
        },
        'th': {
          backgroundColor: '#e0e0e0',
          fontWeight: 'bold',
        },
        'pre, code': {
          fontFamily: 'Courier New, monospace',
          backgroundColor: '#f5f5f5',
          padding: '2px',
          border: '1px solid #d5d5d5',
        },
        'blockquote': {
          marginLeft: '40px',
          marginRight: '40px',
          borderLeft: '4px solid #d5d5d5',
          paddingLeft: '1em',
        },
        'ul, ol': {
          paddingLeft: '40px',
        },
        'li': {
          margin: '0.5em 0',
        },
      })
    },
  ],
} satisfies Config;
