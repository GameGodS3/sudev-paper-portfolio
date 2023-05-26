import { gsap } from "gsap";

export const landingAnimation = () => {
  const tl = gsap.timeline();
  tl.from(".sub-intro", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 0.5,
    y: "100%",
  })
    .from(
      ".fullname",
      {
        opacity: 0,
        clipPath: "polygon(0% 0%, 5% 0%, 0.05% 100%, 0% 100%)",
        duration: 1,
        ease: "power1.out",
      },
      "landing-rotate"
    )
    .from(
      ".profile-pic",
      {
        opacity: 0,
        rotate: 10,
        ease: "power2.out",
        duration: 0.5,
      },
      "landing-rotate"
    )
    .from(
      ".sticky-note-parent",
      {
        opacity: 0,
        rotate: -10,
        delay: 0,
        ease: "power3.out",
        duration: 0.5,
        position: 0,
      },
      "landing-rotate"
    )
    .to(".fullname", { clipPath: "none", duration: 0.01 })
    .from(".Landing .button", {
      opacity: 0,
      y: 16,
    });

  return tl;
};
