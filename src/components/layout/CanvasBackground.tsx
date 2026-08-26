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
            const width = window.innerWidth
            const height = window.innerHeight
            ctx.clearRect(0, 0, width, height)

            const isDark = resolvedTheme === 'dark'
            time += 0.003

            // Wave definitions (grey & black luxury ribbon waves)
            const waves = isDark
                ? [
                    // Deep black/charcoal base wave
                    {
                        baseY: height * 0.45,
                        amplitude: 55,
                        frequency: 0.0012,
                        speed: 0.8,
                        gradStart: 'rgba(15, 23, 42, 0.45)',
                        gradEnd: 'rgba(2, 6, 23, 0.85)',
                        stroke: 'rgba(71, 85, 105, 0.18)',
                        strokeWidth: 1.5,
                        phase: 0,
                    },
                    // Mid smoky grey wave
                    {
                        baseY: height * 0.6,
                        amplitude: 70,
                        frequency: 0.0016,
                        speed: -0.6,
                        gradStart: 'rgba(30, 41, 59, 0.4)',
                        gradEnd: 'rgba(15, 23, 42, 0.75)',
                        stroke: 'rgba(148, 163, 184, 0.15)',
                        strokeWidth: 1.2,
                        phase: Math.PI / 3,
                    },
                    // Graphite slate foreground wave
                    {
                        baseY: height * 0.75,
                        amplitude: 60,
                        frequency: 0.002,
                        speed: 1.1,
                        gradStart: 'rgba(51, 65, 85, 0.28)',
                        gradEnd: 'rgba(15, 23, 42, 0.85)',
                        stroke: 'rgba(203, 213, 225, 0.12)',
                        strokeWidth: 1,
                        phase: Math.PI * 0.8,
                    },
                    // Subtle dynamic accent wave
                    {
                        baseY: height * 0.3,
                        amplitude: 45,
                        frequency: 0.0014,
                        speed: 0.5,
                        gradStart: 'rgba(220, 38, 38, 0.04)',
                        gradEnd: 'rgba(15, 23, 42, 0.3)',
                        stroke: 'rgba(220, 38, 38, 0.08)',
                        strokeWidth: 1,
                        phase: Math.PI * 1.2,
                    },
                ]
                : [
                    // Light mode: soft misty grey, silver and charcoal waves
                    {
                        baseY: height * 0.45,
                        amplitude: 50,
                        frequency: 0.0012,
                        speed: 0.8,
                        gradStart: 'rgba(226, 232, 240, 0.55)',
                        gradEnd: 'rgba(241, 245, 249, 0.8)',
                        stroke: 'rgba(148, 163, 184, 0.3)',
                        strokeWidth: 1.5,
                        phase: 0,
                    },
                    {
                        baseY: height * 0.6,
                        amplitude: 65,
                        frequency: 0.0015,
                        speed: -0.6,
                        gradStart: 'rgba(203, 213, 225, 0.45)',
                        gradEnd: 'rgba(226, 232, 240, 0.75)',
                        stroke: 'rgba(100, 116, 139, 0.25)',
                        strokeWidth: 1.2,
                        phase: Math.PI / 3,
                    },
                    {
                        baseY: height * 0.75,
                        amplitude: 55,
                        frequency: 0.0018,
                        speed: 1.0,
                        gradStart: 'rgba(148, 163, 184, 0.3)',
                        gradEnd: 'rgba(203, 213, 225, 0.7)',
                        stroke: 'rgba(71, 85, 105, 0.2)',
                        strokeWidth: 1,
                        phase: Math.PI * 0.8,
                    },
                ]

            // Draw organic flowing waves
            waves.forEach((w) => {
                ctx.save()
                ctx.beginPath()
                ctx.moveTo(0, height)

                // Starting point on the left
                const startY =
                    w.baseY +
                    Math.sin(time * w.speed + w.phase) * w.amplitude +
                    Math.cos(time * 0.5 * w.speed) * 15
                ctx.lineTo(0, startY)

                const step = 30
                for (let x = 0; x <= width + step; x += step) {
                    const wave1 = Math.sin(x * w.frequency + time * w.speed + w.phase) * w.amplitude
                    const wave2 = Math.cos(x * w.frequency * 0.6 - time * w.speed * 0.5) * (w.amplitude * 0.35)
                    const y = w.baseY + wave1 + wave2

                    ctx.lineTo(x, y)
                }

                ctx.lineTo(width, height)
                ctx.closePath()

                // Gradient fill from top of wave to bottom of canvas
                const grad = ctx.createLinearGradient(0, w.baseY - w.amplitude, 0, height)
                grad.addColorStop(0, w.gradStart)
                grad.addColorStop(1, w.gradEnd)
                ctx.fillStyle = grad
                ctx.fill()

                // Draw luminous crest line
                if (w.stroke) {
                    ctx.beginPath()
                    for (let x = 0; x <= width + step; x += step) {
                        const wave1 = Math.sin(x * w.frequency + time * w.speed + w.phase) * w.amplitude
                        const wave2 = Math.cos(x * w.frequency * 0.6 - time * w.speed * 0.5) * (w.amplitude * 0.35)
                        const y = w.baseY + wave1 + wave2

                        if (x === 0) {
                            ctx.moveTo(x, y)
                        } else {
                            ctx.lineTo(x, y)
                        }
                    }
                    ctx.strokeStyle = w.stroke
                    ctx.lineWidth = w.strokeWidth
                    ctx.stroke()
                }

                ctx.restore()
            })

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
                opacity: 0.95,
            }}
        />
    )
}
