'use client';

import { useEffect, useRef, useState } from "react";

export default function LoginSuccessVideo() {
  const [visible, setVisible] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const shouldPlay = sessionStorage.getItem("play-login-video") === "1";
    if (!shouldPlay) return;

    sessionStorage.removeItem("play-login-video");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {
      setNeedsInteraction(true);
    });
  }, [visible]);

  const handlePlayWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;

    try {
      await video.play();
      setNeedsInteraction(false);
    } catch {
      setNeedsInteraction(true);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/imgs/video.mp4"
        autoPlay
        playsInline
        controls={needsInteraction}
        onEnded={() => setVisible(false)}
      />
      {needsInteraction ? (
        <button
          type="button"
          onClick={handlePlayWithSound}
          className="absolute rounded-2xl border border-white/20 bg-black/55 px-6 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur"
        >
          Reproducir con sonido
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-6 top-6 btn btn-circle btn-sm border-white/20 bg-black/40 text-white hover:bg-black/60"
      >
        ✕
      </button>
    </div>
  );
}
