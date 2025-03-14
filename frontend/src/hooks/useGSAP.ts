import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (
  animationCallback: () => void,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    animationCallback();
  }, [animationCallback, dependencies]); // ✅ Pass `dependencies` as a reference instead of spreading
};
