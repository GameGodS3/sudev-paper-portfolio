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

    // Pan/clamp helpers
    const SMALL_NUDGE = 30; // allow small nudges when image is smaller than container

    const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

    const getBounds = () => {
        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return { maxX: SMALL_NUDGE, maxY: SMALL_NUDGE, containerW: 0, containerH: 0 };

        const containerW = container.clientWidth;
        const containerH = container.clientHeight;

        // natural sizes (fallback to rendered if natural not present)
        const naturalW = img.naturalWidth || img.width || containerW;
        const naturalH = img.naturalHeight || img.height || containerH;

        const scaledW = naturalW * zoom;
        const scaledH = naturalH * zoom;

        let maxX = Math.max(0, (scaledW - containerW) / 2);
        let maxY = Math.max(0, (scaledH - containerH) / 2);

        // Allow small nudges if image is smaller than container
        if (scaledW <= containerW) maxX = SMALL_NUDGE;
        if (scaledH <= containerH) maxY = SMALL_NUDGE;

        return { maxX, maxY, containerW, containerH, scaledW, scaledH };
    };

    const clampPan = (x: number, y: number) => {
        const { maxX, maxY } = getBounds();
        return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
    };

    // Resolve local project images under `data/articleImages/` to Vite-served URLs.
    // This mirrors the logic in `ImageWithFallback` so passing a relative path
    // like "articleImages/ai-email-generator/flowchart.jpg" will still work here.
    const localImages = import.meta.glob('../../data/articleImages/**', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

    const resolveLocalSrc = (rawSrc?: string | null) => {
        if (!rawSrc) return rawSrc;

        if (/^https?:\/\//.test(rawSrc) || rawSrc.startsWith('data:') || rawSrc.startsWith('/')) {
            return rawSrc;
        }

        const norm = rawSrc.replace(/^\.\/+/, '').replace(/^\.\.\//, '');

        for (const key in localImages) {
            if (key.endsWith(norm) || key.endsWith('/' + norm)) {
                return localImages[key];
            }
        }

        const basename = norm.split('/').pop() || norm;
        for (const key in localImages) {
            if (key.endsWith(basename)) {
                return localImages[key];
            }
        }

        return rawSrc;
    };

    const resolvedSrc = resolveLocalSrc(src);

    // Handle mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prevZoom) => Math.max(1, Math.min(5, prevZoom + delta)));
    };

    // Handle pinch zoom (native touch events)
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

    // React touch handlers for single-finger panning (mobile)
    const handleTouchStartReact = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && zoom > 1) {
            e.preventDefault();
            setIsPanning(true);
            setPanStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
        }
    };

    const handleTouchMoveReact = (e: React.TouchEvent) => {
        if (isPanning && e.touches.length === 1) {
            e.preventDefault();
            const candidateX = e.touches[0].clientX - panStart.x;
            const candidateY = e.touches[0].clientY - panStart.y;
            const clamped = clampPan(candidateX, candidateY);
            setPan(clamped);
        }
    };

    const handleTouchEndReact = (_e: React.TouchEvent) => {
        if (isPanning) setIsPanning(false);
    };

    // Handle mouse drag pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            e.preventDefault();
            setIsPanning(true);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning && zoom > 1) {
            const candidateX = e.clientX - panStart.x;
            const candidateY = e.clientY - panStart.y;
            const clamped = clampPan(candidateX, candidateY);
            setPan(clamped);
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
        setZoom((prev) => {
            const next = Math.max(1, prev - 0.5);
            if (next <= 1) setPan({ x: 0, y: 0 });
            return next;
        });
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // When zoom goes back to 1 via other means, ensure pan resets
    useEffect(() => {
        if (zoom <= 1.0001) {
            setPan({ x: 0, y: 0 });
        }
    }, [zoom]);

    // Clamp pan when zoom changes so existing pan stays within new bounds
    useEffect(() => {
        if (zoom <= 1.0001) {
            setPan({ x: 0, y: 0 });
            return;
        }
        const { maxX, maxY } = getBounds();
        setPan((p) => ({ x: clamp(p.x, -maxX, maxX), y: clamp(p.y, -maxY, maxY) }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoom]);

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
                        onClick={(e) => {
                            e.stopPropagation();
                            handleZoomOut();
                        }}
                        className="p-2 hover:bg-white/20 rounded transition-colors"
                        title="Zoom out"
                    >
                        <ZoomOut className="w-5 h-5 text-white" />
                    </button>
                    <span className="text-white text-sm font-semibold">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleZoomIn();
                        }}
                        className="p-2 hover:bg-white/20 rounded transition-colors"
                        title="Zoom in"
                    >
                        <ZoomIn className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleResetZoom();
                        }}
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
                onTouchStart={handleTouchStartReact}
                onTouchMove={handleTouchMoveReact}
                onTouchEnd={handleTouchEndReact}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    ref={imageRef}
                    src={resolvedSrc as string}
                    alt={alt}
                    className={`max-w-full max-h-full select-none ${isPanning ? '' : 'transition-transform duration-150'}`}
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
