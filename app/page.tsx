"use client"
import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'
import { 
  Zap, 
  Leaf, 
  TrendingUp, 
  Database, 
  Brain, 
  AlertCircle,
  Clock,
  Award,
  Recycle,
  Globe
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Saudi-themed color palette with futuristic accents
const COLORS = {
  primary: '#00ffaa',    // Vibrant green (Saudi heritage)
  secondary: '#ffd700',  // Gold (royal accent)
  accent: '#00f3ff',     // Cyan (tech/future)
  dark: '#050a0f',       // Deep space background
  surface: '#0a151a',    // Card surface
  border: '#1a3a3a',     // Subtle borders
  success: '#00e676',
  warning: '#ffab00',
  critical: '#ff5252'
}

// Animated gradient border component
const GradientBorder = ({ children, intensity = 1 }) => (
  <div className="relative rounded-2xl p-0.5 bg-gradient-to-r from-[#00ffaa] via-[#ffd700] to-[#00f3ff] animate-border-spin">
    <div className="bg-[#050a0f] rounded-xl">
      {children}
    </div>
  </div>
)

// Saudi pattern overlay (subtle geometric design)
const SaudiPattern = () => (
  <div 
    className="absolute inset-0 opacity-5 pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.1) 0%, transparent 20%),
        radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 20%),
        repeating
