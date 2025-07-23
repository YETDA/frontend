"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

type DotLottieProps = JSX.IntrinsicElements["dotlottie-player"] & {
  autoplay?: boolean;
  loop?: boolean | number;
};

const DotLottie = dynamic(
  async () => {
    await import("@dotlottie/player-component");

    return function DotLottieInner({
      autoplay = true,
      loop = true,
      ...rest
    }: DotLottieProps) {
      const ref = useRef<any>(null);
      const playedCount = useRef(0);
      const [ready, setReady] = useState(false);

      useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onReady = () => {
          setReady(true);
          el.loop = typeof loop === "number" ? loop : loop;
          if (autoplay) el.play?.();
        };

        const onComplete = () => {
          if (loop === true) {
            el.seek?.(0);
            el.play?.();
          } else if (typeof loop === "number") {
            playedCount.current += 1;
            if (playedCount.current < loop) {
              el.seek?.(0);
              el.play?.();
            }
          }
        };

        el.addEventListener("ready", onReady);
        el.addEventListener("load", onReady);
        el.addEventListener("complete", onComplete);

        return () => {
          el.removeEventListener("ready", onReady);
          el.removeEventListener("load", onReady);
          el.removeEventListener("complete", onComplete);
        };
      }, [autoplay, loop]);

      return <dotlottie-player ref={ref} {...rest} />;
    };
  },
  { ssr: false },
);

export default DotLottie;
