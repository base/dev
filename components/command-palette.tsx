'use client'

import { useEffect, useState, useRef } from 'react'
import type React from 'react'
import { Command } from 'cmdk'

type Product = {
  name: string
  description: string
  status: 'available' | 'coming soon'
  url?: string
}

const products: Product[] = [
  {
    name: "Smart Wallet",
    description: "Secure and easy-to-use wallet for Base",
    status: "available",
    url: "https://smartwallet.dev"
  },
  {
    name: "OnchainKit",
    description: "AppKit to build any onchain app in 15 minutes",
    status: "available",
    url: "https://onchainkit.xyz"
  },
  {
    name: "Paymaster",
    description: "Gasless transactions on Base",
    status: "available",
    url: "https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/"
  },
  {
    name: "AgentKit",
    description: "Framework to build AI agents on Base",
    status: "available",
    url: "https://docs.cdp.coinbase.com/agentkit/docs/welcome"
  }
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'i' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleSelect = (product: Product) => {
    if (product.url) {
      window.open(product.url, '_blank')
      setOpen(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => i < products.length - 1 ? i + 1 : 0)
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => i > 0 ? i - 1 : products.length - 1)
      }

      if (e.key === 'Enter') {
        const selectedProduct = products[selectedIndex]
        if (selectedProduct?.url) {
          handleSelect(selectedProduct)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, selectedIndex])

  if (!open) return null

  return (
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      className="fixed inset-0 bg-black/50 z-50"
    >
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl">
        <Command className="bg-black border border-gray-800 rounded-lg shadow-2xl relative">
          <button 
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-3 text-gray-400 hover:text-white"
            aria-label="Close command palette"
          >
            <kbd className="font-mono text-xs bg-gray-800/80 px-1.5 py-0.5 rounded">
              ⎋
            </kbd>
          </button>
          <div className="flex items-center border-b border-gray-800 px-4 h-12">
            <Command.Input 
              placeholder="Search base.dev products..." 
              className="w-full bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <Command.List className="p-4 max-h-[60vh] overflow-auto">
            <Command.Empty className="text-sm text-gray-400 p-2">
              No results found.
            </Command.Empty>
            {products.map((product, index) => (
              <Command.Item 
                key={product.name}
                onSelect={() => handleSelect(product)}
                className={`flex items-start gap-4 p-3 rounded transition-colors ${
                  index === selectedIndex ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                } cursor-pointer ${
                  product.url ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <div>
                  <div className="text-white font-mono">{product.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{product.description}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-xs text-[#0052ff]">{product.status}</div>
                    {product.url && (
                      <div className="text-xs text-gray-500">↗</div>
                    )}
                  </div>
                </div>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  )
} 
