import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import siteCss from "../site.css?url";
import body from "../site-body.html?raw";
import script from "../site-script.js.txt?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eeshika Jakka" },
      { name: "description", content: "Eeshika Jakka. Goalkeeper, science kid, future engineer." },
      { property: "og:title", content: "Eeshika Jakka" },
      { property: "og:description", content: "Goalkeeper, science kid, future engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,800;1,9..144,800&family=Space+Grotesk:wght@500;700&family=Space+Mono:wght@700&family=Syne:wght@700;800&display=swap" },
      { rel: "stylesheet", href: siteCss },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // React StrictMode runs effects twice in dev, which wired the page up twice (6 dogs, 2 treat buttons).
    // Wire it once per mounted page.
    const el = ref.current;
    if (!el || el.dataset["ejReady"]) return;
    el.dataset["ejReady"] = "1";
    (window as unknown as { __EJ_DEV__?: boolean }).__EJ_DEV__ = import.meta.env.DEV;
    new Function(script)();
  }, []);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: body }} />;
}
