# Base.dev

A modern, terminal-inspired landing page for Base's development platform built with Next.js.

## Features

- Terminal-inspired interface with a copyable npm command
- Interactive command palette (⌘/Ctrl + i) showcasing Base products:
  - Base Wallet - Secure and easy-to-use wallet
  - OnchainKit - AppKit for building onchain apps
  - Paymaster - Gasless transactions on Base
  - AgentKit - Framework for building AI agents
  - Base L3 - Base's upcoming Layer 3
- Animated text scramble effect
- Quick links to Base resources (blog, careers, X/Twitter)
- Responsive design with Tailwind CSS
- Built with Next.js 15 and TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [CMDK](https://cmdk.paco.me) - Command palette component
- [use-scramble](https://www.npmjs.com/package/use-scramble) - Text scramble effect

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components including the terminal landing and command palette
- `public/` - Static assets
- `lib/` - Utility functions and shared code

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
