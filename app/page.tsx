import VideoClientWrapper from "@/components/VideoClientWrapper";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4">
            <VideoClientWrapper />
            <footer className="fixed bottom-2 text-white/20 text-xs text-center z-0 pointer-events-none">
                &copy; {new Date().getFullYear()} New Design
            </footer>
        </main>
    );
}
