"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SubscribedPage() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Target date: March 27, 2026, 8:00 PM Palestine Time (+02:00)
            const target = new Date("2026-03-27T20:00:00+02:00").getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black selection:bg-rose-500/30 text-white" dir="rtl">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 flex flex-col items-center text-center p-8 max-w-4xl w-full">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <Image
                        src="/logos/bilafih.png"
                        alt="Bilafih Logo"
                        width={120}
                        height={120}
                        className="relative z-10 object-contain drop-shadow-2xl"
                    />
                </div>

                <p className="text-lg md:text-xl text-white/60 mb-12">
                    شكراً لإهتمامك.   باقي على السحب:
                </p>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 md:gap-8 w-full justify-items-center" dir="ltr">
                    {timeLeft ? (
                        <>
                            <CircularTimeBox value={timeLeft.days} maxValue={365} label="أيام" />
                            <CircularTimeBox value={timeLeft.hours} maxValue={24} label="ساعات" />
                            <CircularTimeBox value={timeLeft.minutes} maxValue={60} label="دقائق" />
                            <CircularTimeBox value={timeLeft.seconds} maxValue={60} label="ثواني" />
                        </>
                    ) : (
                        <div className="col-span-4 text-2xl font-bold text-white/80 animate-pulse">
                            حانت اللحظة!
                        </div>
                    )}
                </div>

                <div className="mt-12 text-sm text-white/30 uppercase tracking-widest">
                    موعد الانطلاق 27 مارس 2026
                </div>

                <div className="flex w-full items-center justify-center mt-8">
                    <span className="text-white/20 text-xs">
                        © 2025 New Design
                    </span>
                </div>
            </div>
        </div>
    );
}

function CircularTimeBox({ value, maxValue, label }: { value: number; maxValue: number; label: string }) {
    // Configuration for the circle
    const totalTicks = 60; // Total number of ticks in the circle
    const percentage = Math.min(Math.max(value / maxValue, 0), 1);
    const activeTicks = Math.round(percentage * totalTicks);

    // Generate ticks
    const ticks = Array.from({ length: totalTicks }).map((_, i) => {
        const rotation = (i / totalTicks) * 360;
        const isActive = i < activeTicks;

        return (
            <line
                key={i}
                x1="50"
                y1="6" // Inner start of tick (closer to edge)
                x2="50"
                y2="12" // Outer end of tick (border thickness)
                transform={`rotate(${rotation} 50 50)`}
                className={`transition-colors duration-300 ${isActive ? "stroke-green-500" : "stroke-white/10"}`}
                strokeWidth="2"
                strokeLinecap="round"
            />
        );
    });

    return (
        <div className="flex flex-col items-center justify-center group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 flex items-center justify-center">
                {/* SVG Ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {ticks}
                </svg>

                {/* Text Content */}
                <div className="flex flex-col items-center z-10">
                    <span className="text-xl sm:text-2xl md:text-5xl font-bold text-green-500 tabular-nums leading-none">
                        {String(value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm text-green-500/80 mt-0.5 md:mt-1 uppercase font-bold tracking-wider">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
}
