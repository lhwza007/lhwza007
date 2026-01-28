import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number; // milliseconds
    onClose: () => void;
}

export default function Toast({
    message,
    type,
    duration = 3000,
    onClose,
}: ToastProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Auto close after duration
        const closeTimer = setTimeout(() => {
            onClose();
        }, duration);

        // Update progress bar
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const decrement = 100 / steps;

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = prev - decrement;
                return next <= 0 ? 0 : next;
            });
        }, interval);

        return () => {
            clearTimeout(closeTimer);
            clearInterval(progressTimer);
        };
    }, [duration, onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return {
                    border: "border-violet-500/30",
                    bg: "bg-violet-500/10",
                    text: "text-violet-200",
                    progressBg: "bg-violet-500",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                };
            case "error":
                return {
                    border: "border-zinc-500/30",
                    bg: "bg-zinc-500/10",
                    text: "text-zinc-200",
                    progressBg: "bg-zinc-500",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ),
                };
            case "info":
                return {
                    border: "border-violet-500/30",
                    bg: "bg-violet-500/10",
                    text: "text-violet-200",
                    progressBg: "bg-violet-500",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <>
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Toast Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className={`
            pointer-events-auto
            relative overflow-hidden
            rounded-2xl border ${styles.border} ${styles.bg}
            backdrop-blur-xl
            shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_50px_rgba(0,0,0,0.5)]
            max-w-md w-full
            animate-[slideIn_0.3s_ease-out]
          `}
                >
                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                                className={`
                  flex-shrink-0 h-10 w-10 rounded-full
                  ${styles.bg} border ${styles.border}
                  flex items-center justify-center
                  text-xl font-bold ${styles.text}
                `}
                            >
                                {styles.icon}
                            </div>

                            {/* Message */}
                            <div className="flex-1 pt-1">
                                <p className={`text-sm leading-relaxed ${styles.text}`}>
                                    {message}
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 text-zinc-400 hover:text-white transition"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-white/5">
                        <div
                            className={`h-full ${styles.progressBg} transition-all duration-50 ease-linear`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </>
    );
}
