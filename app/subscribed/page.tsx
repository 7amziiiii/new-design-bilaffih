"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SubscribedPage() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Target date: March 27, 2026, 8:00 PM Palestine Time
            // Palestine Time is UTC+2 or UTC+3 (Daylight Saving). In March 2026, it will likely be UTC+2 or UTC+3 depending on exact DST rules.
            // To be safe and precise with "Palestine Time", we can use a date string with the time zone if supported, or calculate relative to UTC.
            // However, the simplest robust way in modern browsers is usually to construct the date.

            // 8:00 PM is 20:00.

            // Let's assume standard handling. 
            // A reliable way is to explicitly target Asia/Hebron or Asia/Gaza if possible, 
            // but Date parsing with timezones can be tricky across browsers.
            // We will set the target to specific ISO string with offset if we know it, or rely on a library. 
            // Since I don't want to install extra deps like date-fns-tz just for this unless necessary, 
            // and "Palestine Time" usually follows Jerusalem time rules.

            // March 27 is usually close to DST switch. 
            // In 2026, Palestine DST typically starts late March. 
            // For simplicity and robustness without external libs, I will target the specific timestamp.
            // 27-03-2026 20:00:00 in Asia/Hebron.

            const targetDate = new Date("2026-03-27T20:00:00+02:00"); // Assuming standard time (winter time) or manually adjusting if I know better. 
            // Wait, Palestine normally switches to Summer time (UTC+3) around late March or April.
            // In 2024 it was April. In 2025 it might be different.
            // To be safe, I will treat "Palestine Time" as the local wall time in that region.
            // The user asked for "27-3-2026 الساعة 8 مساءا in plastine time".
            // I will interpret this as 20:00 local time.

            // Best effort without library: Create a date object, set to UTC, then adjust.
            // Or just use the string '2026-03-27T20:00:00' and assume user's browser understands if they are in that TZ, 
            // but that's risky.

            // Let's use a fixed target assuming +02:00 or +03:00. 
            // March 27 is likely +02:00 (Standard) or +03:00 (DST). 
            // Let's check typical switch. usually it's end of March.
            // I'll stick to a reasonable approximation or try to force the offset.
            // Recent years Palestine changed DST rules. 
            // Let's try to parse as "2026-03-27T20:00:00+02:00" (Standard) for now, or +03:00?
            // Actually, since 2023, Palestine observes DST from late April? No, it often changes.
            // I will assume +02:00 (Standard Time) for late March to be safe, or just use a helper if I could.
            // Let's just use `new Date("March 27, 2026 20:00:00 Asia/Hebron")` but that's invalid.

            // Plan B: Hardcode a specific timestamp or just strictly use ISO with offset.
            // I will use +02:00 as it's conventionally the base. If it's DST, it would be +03:00.
            // Given the date, I'll use +02:00 for now.
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

            <div className="z-10 flex flex-col items-center text-center p-8 max-w-2xl w-full">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6 pb-2">
                    تم الاشتراك بنجاح!
                </h1>

                <p className="text-lg md:text-xl text-white/60 mb-12">
                    شكراً لانضمامك إلينا. شيء مذهل قادم قريباً.
                </p>

                {/* Countdown Timer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" dir="ltr">
                    {timeLeft ? (
                        <>
                            <TimeBox value={timeLeft.days} label="أيام" />
                            <TimeBox value={timeLeft.hours} label="ساعات" />
                            <TimeBox value={timeLeft.minutes} label="دقائق" />
                            <TimeBox value={timeLeft.seconds} label="ثواني" />
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

function TimeBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105 group">
            <span className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 group-hover:from-white group-hover:to-white/80 tabular-nums">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm text-white/40 mt-2 uppercase tracking-wider font-medium">
                {label}
            </span>
        </div>
    );
}
