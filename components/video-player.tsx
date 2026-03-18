"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SpeakerHigh,
  SpeakerX,
  ArrowsOut,
  SpeakerLow,
} from "@phosphor-icons/react";
import { formatDuration } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string;
  lessonId: string;
  onComplete?: () => void;
}

export function VideoPlayer({ videoUrl, lessonId, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [completeFired, setCompleteFired] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset on lesson change
  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setCompleteFired(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [lessonId]);

  const fireComplete = useCallback(async () => {
    if (completeFired) return;
    setCompleteFired(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });
      onComplete?.();
    } catch {
      // non-fatal
    }
  }, [completeFired, lessonId, onComplete]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (!completeFired && video.duration > 0) {
      const pct = video.currentTime / video.duration;
      if (pct >= 0.9) {
        fireComplete();
      }
    }
  }, [completeFired, fireComplete]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const video = videoRef.current;
    if (!bar || !video || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * duration;
    setCurrentTime(pct * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      setMuted(v === 0);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !muted;
    setMuted(newMuted);
    video.muted = newMuted;
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      await container.requestFullscreen().catch(() => {});
      setFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => {});
      setFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (playing) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime += 10;
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime -= 10;
      } else if (e.code === "KeyF") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        toggleMute();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const onFsChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const VolumeIcon = muted || volume === 0 ? SpeakerX : volume < 0.5 ? SpeakerLow : SpeakerHigh;

  return (
    <div
      ref={containerRef}
      className="video-player-container group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          fireComplete();
        }}
        preload="metadata"
        playsInline
      />

      {/* Big play button overlay when paused */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play weight="fill" className="w-7 h-7 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`video-controls ${showControls || !playing ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="video-progress-bar"
          onClick={handleProgressClick}
        >
          <div
            className="video-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-white/80 transition-colors p-1"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause weight="fill" className="w-5 h-5" />
            ) : (
              <Play weight="fill" className="w-5 h-5" />
            )}
          </button>

          {/* Time */}
          <span className="text-white/80 text-xs font-mono tabular-nums">
            {formatDuration(Math.floor(currentTime))}
            {" / "}
            {formatDuration(Math.floor(duration))}
          </span>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-white hover:text-white/80 transition-colors p-1"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              <VolumeIcon className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-purple h-1 cursor-pointer"
              aria-label="Volume"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-white/80 transition-colors p-1"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            <ArrowsOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
