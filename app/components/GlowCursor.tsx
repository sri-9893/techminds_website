'use client';

import { useEffect, useRef } from 'react';
import './GlowCursor.css';

const MAX_POINTS = 36;

export default function GlowCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
        let initialized = false;
        let frame = 0;
        let width = 1;
        let height = 1;
        let disposed = false;
        let lastMove = performance.now();

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const move = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return;
            if (!initialized) {
                points.forEach((point) => { point.x = event.clientX; point.y = event.clientY; });
                initialized = true;
            }
            points[0].x = event.clientX;
            points[0].y = event.clientY;
            lastMove = performance.now();
        };

        const render = (now: number) => {
            if (disposed) return;
            context.clearRect(0, 0, width, height);
            if (initialized) {
                for (let index = 1; index < MAX_POINTS; index++) {
                    points[index].x += (points[index - 1].x - points[index].x) * 0.28;
                    points[index].y += (points[index - 1].y - points[index].y) * 0.28;
                }

                const idleFade = Math.max(0, 1 - (now - lastMove) / 900);
                const gradient = context.createLinearGradient(points[MAX_POINTS - 1].x, points[MAX_POINTS - 1].y, points[0].x, points[0].y);
                gradient.addColorStop(0, 'rgba(167, 139, 250, 0)');
                gradient.addColorStop(0.55, `rgba(103, 232, 249, ${0.18 * idleFade})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${0.85 * idleFade})`);
                context.strokeStyle = gradient;
                context.lineWidth = 8;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.shadowBlur = 18;
                context.shadowColor = `rgba(103, 232, 249, ${0.8 * idleFade})`;
                context.beginPath();
                context.moveTo(points[MAX_POINTS - 1].x, points[MAX_POINTS - 1].y);
                for (let index = MAX_POINTS - 2; index >= 0; index--) context.lineTo(points[index].x, points[index].y);
                context.stroke();
                context.shadowBlur = 0;
            }
            frame = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', move, { passive: true });
        frame = requestAnimationFrame(render);

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', move);
        };
    }, []);

    return <canvas ref={canvasRef} className="glow-cursor" aria-hidden="true" />;
}