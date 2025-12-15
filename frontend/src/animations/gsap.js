import gsap from "gsap";

export const fadeUp = (el) => {
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1
  });
};
