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

        let particles: Particle[] = []
        const particleCount = 100
        const connectionDistance = 150

        class Particle {
            x: number
            y: number
            size: number

            constructor(width: number, height: number) {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.size = Math.random() * 3 + 1.5
            }

            draw(ctx: CanvasRenderingContext2D, color: string) {
                ctx.fillStyle = color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height))
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init()
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const isDark = resolvedTheme === 'dark'
            const particleColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(220, 38, 38, 0.3)'

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i]
                p1.draw(ctx, particleColor)

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * (isDark ? 0.4 : 0.6)
                        ctx.strokeStyle = isDark
                            ? `rgba(255, 255, 255, ${opacity})`
                            : `rgba(220, 38, 38, ${opacity})`
                        ctx.lineWidth = 1.2
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }
            }
        }

        const handleResize = () => {
            resize()
            render()
        }

        resize()
        render()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-10"
            style={{ opacity: 0.3 }}
        />
    )
}
