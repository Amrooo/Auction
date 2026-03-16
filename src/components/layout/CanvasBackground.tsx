"use client"

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let time = 0

        const resize = () => {
            const ratio = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * ratio
            canvas.height = window.innerHeight * ratio
            ctx.scale(ratio, ratio)
        }

        const render = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            const isDark = resolvedTheme === 'dark'
            const dotColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)'
            const lineColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.06)'
            const accentGlow = isDark ? 'rgba(220, 38, 38, 0.04)' : 'rgba(220, 38, 38, 0.06)'

            time += 0.005

            const spacing = 40
            const cols = Math.ceil(window.innerWidth / spacing) + 1
            const rows = Math.ceil(window.innerHeight / spacing) + 1

            // 1. Draw structured grid lines (very faint)
            ctx.beginPath()
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5

            for (let i = 0; i < cols; i++) {
                ctx.moveTo(i * spacing, 0)
                ctx.lineTo(i * spacing, window.innerHeight)
            }
            for (let j = 0; j < rows; j++) {
                ctx.moveTo(0, j * spacing)
                ctx.lineTo(window.innerWidth, j * spacing)
            }
            ctx.stroke()

            // 2. Draw dot grid with a subtle perspective/noise motion
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing
                    const y = j * spacing

                    // Gentle wave motion
                    const offset = Math.sin(time + (i * 0.2) + (j * 0.3)) * 3

                    const dotSize = isDark ? 0.8 : 1.2
                    ctx.beginPath()
                    ctx.arc(x, y + offset, dotSize, 0, Math.PI * 2)
                    ctx.fillStyle = dotColor
                    ctx.fill()

                    // Occasionally highlight a intersection (like a data point)
                    if ((i + j) % 12 === 0) {
                        const pulse = (Math.sin(time * 1.5 + i + j) + 1) / 2
                        ctx.beginPath()
                        ctx.arc(x, y + offset, dotSize * 2 + pulse, 0, Math.PI * 2)
                        ctx.fillStyle = isDark ? `rgba(220, 38, 38, ${0.1 + pulse * 0.1})` : `rgba(220, 38, 38, ${0.12 + pulse * 0.08})`
                        ctx.fill()
                    }
                }
            }

            // 3. Elegant sweeping horizontal 'scan' glow
            const scanY = (Math.sin(time * 0.4) * 0.5 + 0.5) * window.innerHeight
            const grad = ctx.createLinearGradient(0, scanY - 150, 0, scanY + 150)
            grad.addColorStop(0, 'transparent')
            grad.addColorStop(0.5, accentGlow)
            grad.addColorStop(1, 'transparent')

            ctx.fillStyle = grad
            ctx.fillRect(0, scanY - 150, window.innerWidth, 300)

            // 4. Subtle diagonal geometric accent
            ctx.beginPath()
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.01)'
            ctx.lineWidth = 100
            ctx.moveTo(-100, -100)
            ctx.lineTo(window.innerWidth + 100, window.innerHeight + 100)
            ctx.stroke()

            animationFrameId = requestAnimationFrame(render)
        }

        resize()
        render()

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none -z-10"
            style={{
                opacity: 0.8,
            }}
        />
    )
}
