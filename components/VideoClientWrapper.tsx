"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, RotateCcw, X, Grip } from "lucide-react";

// Logo Data
// Top: New Design
// Bottom: Bilafih
// Middle: The rest
const CLIENT_LOGOS = [
    { name: "Fried Chicken", src: "/logos/friedchicken.png", href: "https://www.instagram.com/fraide_chiken?igsh=MTBhanh5d3ZvMTQ2Zg==" },
    { name: "Rainbow", src: "/logos/rainbow.png", href: "https://www.instagram.com/rainbow.cafe.jenin?igsh=czQxNGx6ejh3M2t5" },
    { name: "Sinara", src: "/logos/sinara.png", href: "https://www.instagram.com/sinaramall?igsh=MXg2NmVwc201OTlyZQ==" },
    { name: "Massad", src: "/logos/massad.png", href: "https://www.instagram.com/massad.co?igsh=MTFuc2pqcjdoeGl6dw==" },
    { name: "Shaafi", src: "/logos/shaafi.png", href: "https://www.instagram.com/alshafie_company?igsh=MTVpNjhuZDl4eDJieA==" },
    { name: "Amore", src: "/logos/amore.png", href: "https://www.instagram.com/amorepizza1?igsh=MTkzY3k5bDN2a2V1MQ==" },
    { name: "Rida Market", src: "/logos/ridamarket.png", href: "#" }, // Placeholder as requested
];

export default function VideoClientWrapper() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        // Attempt autoplay
        if (videoRef.current) {
            videoRef.current.play().catch((err) => {
                console.log("Autoplay blocked:", err);
            });
        }
    }, []);

    const handleTimeUpdate = () => {
        // Use this if we need to trigger things at specific times, currently unused but good for observability
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setVideoEnded(true);
        setShowOverlay(true);
    };

    const handlePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const toggleOverlay = () => {
        if (showOverlay) {
            // Close overlay
            setShowOverlay(false);
            // Resume if it wasn't ended
            if (!videoEnded && videoRef.current) {
                videoRef.current.play();
            }
        } else {
            // Open overlay
            setShowOverlay(true);
            // Pause video to focus on overlay
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    };

    const handleReplay = () => {
        setShowOverlay(false);
        setVideoEnded(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <div className="relative w-full max-w-md md:max-w-[calc(100vh*9/16)] h-[85vh] md:h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mx-auto">
            {/* Video Layer */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/video.mov"
                playsInline
                muted={isMuted}
                onEnded={handleVideoEnd}
                onPlay={onPlay}
                onPause={onPause}
                onTimeUpdate={handleTimeUpdate}
                onClick={handlePlayPause} // Click video to play/pause when overlay is hidden
            />

            {/* Controls (Visible when overlay is hidden) */}
            {!showOverlay && (
                <div className="absolute top-4 right-4 flex gap-2 z-10 transition-opacity duration-300">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white/80 hover:text-white hover:bg-black/60 transition-all"
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                    <button
                        onClick={toggleOverlay}
                        className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white/90 font-medium text-sm border border-white/10 hover:bg-black/60 transition-all flex items-center gap-2"
                    >
                        <Grip size={16} /> Links
                    </button>
                </div>
            )}

            {/* Overlay Layer */}
            <div
                className={`absolute inset-0 bg-black/80 backdrop-blur-lg flex flex-col items-center justify-between p-6 z-20 transition-all duration-700 ease-in-out ${showOverlay ? "overlay-visible" : "overlay-hidden"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={toggleOverlay}
                    className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
                    aria-label="Close overlay"
                >
                    <X size={24} />
                </button>

                {/* Top: Brand Mark */}
                <div className="mt-4 mb-2 flex-shrink-0">
                    <Link
                        href="https://www.instagram.com/new.design_adv/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-48 h-20 md:w-64 md:h-24 block p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                    >
                        <Image
                            src="/logos/newdesign.png"
                            alt="New Design"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 w-full max-w-sm md:max-w-5xl px-4">
                        {CLIENT_LOGOS.map((logo, idx) => (
                            <Link
                                key={logo.name}
                                href={logo.href}
                                target={logo.href !== '#' ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className={`group flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 aspect-[5/3] relative ${
                                    // Custom size adjustments via padding
                                    // logo.name === 'Shaafi' ? 'p-6' :
                                    logo.name === 'Rainbow' ? 'p-1' : 'p-2'
                                    } ${
                                    // Center the last item (Rida Market):
                                    // Mobile (2 cols): Span 2, width ~50% (minus gap) to match others.
                                    // Desktop (3 cols): 7 items total. 2 rows of 3. Last item is on 3rd row. Center it (col-start-2).
                                    idx === CLIENT_LOGOS.length - 1
                                        ? 'col-span-2 w-[calc(50%-0.25rem)] mx-auto md:w-full md:col-span-1 md:col-start-2 md:mx-0'
                                        : ''
                                    }`}
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        fill
                                        className="object-contain object-center filter brightness-100 group-hover:brightness-110"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom: Signature & Replay */}
                <div className="flex flex-col items-center gap-6 mb-4 w-full">
                    {/* Signature Logo */}
                    <Link
                        href="https://www.instagram.com/belfa.campaign?igsh=MTM2MmYwYzg4OXNubw%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full max-w-[12rem] h-16 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                    >
                        <Image
                            src="/logos/bilafih.png"
                            alt="Bilafih"
                            fill
                            className="object-contain"
                        />
                    </Link>
                    {/* Replay Button Removed as requested */}
                </div>
            </div>

            {/* Play Button Overlay (if paused and no overlay) */}
            {!isPlaying && !showOverlay && !videoEnded && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full border border-white/20">
                        <Play size={32} fill="white" className="text-white ml-1" />
                    </div>
                </div>
            )}

        </div>
    );
}
