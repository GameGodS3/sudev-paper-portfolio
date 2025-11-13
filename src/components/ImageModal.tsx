import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ImageModalProps {
    src: string;
    alt: string;
    caption?: string;
    onClose: () => void;
}

export function ImageModal({ src, alt, caption, onClose }: ImageModalProps) {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Handle mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prevZoom) => Math.max(1, Math.min(5, prevZoom + delta)));
    };

    // Handle pinch zoom (touch)
    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            const distance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            setPanStart({ x: distance, y: 0 });
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const distance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = (distance - panStart.x) * 0.01;
            setZoom((prevZoom) => Math.max(1, Math.min(5, prevZoom + delta)));
            setPanStart({ x: distance, y: 0 });
        }
    };

    // Handle mouse drag pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsPanning(true);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning && zoom > 1) {
            setPan({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false });
        container.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart as EventListener);
            container.removeEventListener('touchmove', handleTouchMove as EventListener);
        };
    }, [panStart, zoom, isPanning, pan]);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(5, prev + 0.5));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(1, prev - 0.5));
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Header with controls */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleZoomOut}
                        className="p-2 hover:bg-white/20 rounded transition-colors"
                        title="Zoom out"
                    >
                        <ZoomOut className="w-5 h-5 text-white" />
                    </button>
                    <span className="text-white text-sm font-semibold">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        className="p-2 hover:bg-white/20 rounded transition-colors"
                        title="Zoom in"
                    >
                        <ZoomIn className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={handleResetZoom}
                        className="ml-2 px-3 py-2 text-white text-sm hover:bg-white/20 rounded transition-colors"
                        title="Reset zoom"
                    >
                        Reset
                    </button>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close image"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Image container */}
            <div
                ref={containerRef}
                className="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-full transition-transform duration-150 select-none"
                    style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    }}
                    draggable={false}
                />
            </div>

            {/* Caption footer */}
            {caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm text-center font-['Patrick_Hand',_cursive]">
                        {caption}
                    </p>
                </div>
            )}
        </div>
    );
}
