// src/app/fonts.ts
import localFont from "next/font/local";

export const bgmXwideMedium = localFont({
  src: [{ path: "./fonts/fontspring_xwidemedium.woff2", style: "normal", weight: "500" }],
  display: "swap",
  variable: "--font-bgm-xwide-medium",
});

export const bgmFreigeist = localFont({
  src: [{ path: "./fonts/Fontspring-demo-freigeist-medium.woff2", style: "normal", weight: "500" }],
  display: "swap",
  variable: "--font-bgm-freigeist",
});

export const bgmFreigeistLight = localFont({
  src: [{ path: "./fonts/Fontspring-demo-freigeist-light.woff2", style: "normal", weight: "300" }],
  display: "swap",
  variable: "--font-bgm-freigeist-light",
});

export const bgmFreigeistBlack = localFont({
  src: [{ path: "./fonts/Fontspring-demo-freigeist-xwideblack.woff2", style: "normal", weight: "900" }],
  display: "swap",
  variable: "--font-bgm-freigeist-black",
});

export const bgmFreigeistXwideLight = localFont({
  src: [{ path: "./fonts/Fontspring-demo-freigeist-xwidelight.woff2", style: "normal", weight: "300" }],
  display: "swap",
  variable: "--font-bgm-freigeist-xwidelight",
});

export const normsPro = localFont({
  src: [{ path: "./fonts/tt-norms-pro-trail-normal.woff2", style: "normal", weight: "400" }],
  display: "swap",
  variable: "--font-norms-pro",
});

export const benzinExtraBold = localFont({
  src: [{ path: "./fonts/benzin-extraBold.woff2", style: "normal", weight: "800" }],
  display: "swap",
  variable: "--font-benzin-extrabold",
});

export const benzinMedium = localFont({
  src: [{ path: "./fonts/benzin-medium.woff2", style: "normal", weight: "500" }],
  display: "swap",
  variable: "--font-benzin-medium",
});
