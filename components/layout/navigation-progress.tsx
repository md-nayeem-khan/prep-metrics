"use client";

import * as React from "react";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A sticky top progress bar that animates while the user navigates between
 * pages. It starts when an internal navigation is triggered (a same-origin
 * link click or a programmatic `router.push`/`replace`) and completes once the
 * new route commits — detected via `usePathname` / `useSearchParams` changing.
 */
function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const loadingRef = React.useRef(false);
  const trickleRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const doneTimers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = React.useCallback(() => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
    doneTimers.current.forEach(clearTimeout);
    doneTimers.current = [];
  }, []);

  const start = React.useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(8);
    // Trickle toward 90% so the bar keeps moving while the route loads.
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const inc = Math.max(0.5, (90 - p) * 0.08);
        return Math.min(90, p + inc);
      });
    }, 200);
  }, [clearTimers]);

  const done = React.useCallback(() => {
    if (!loadingRef.current) return;
    loadingRef.current = false;
    clearTimers();
    setProgress(100);
    // Hold at 100%, fade out, then reset width for the next navigation.
    doneTimers.current.push(
      setTimeout(() => {
        setVisible(false);
        doneTimers.current.push(setTimeout(() => setProgress(0), 200));
      }, 200),
    );
  }, [clearTimers]);

  // Complete the bar whenever the route (pathname or query) actually changes.
  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  React.useEffect(() => clearTimers, [clearTimers]);

  // Detect the start of a navigation from link clicks and history updates.
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (
        !anchor ||
        !href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      // Ignore external links and navigations that stay on the same URL.
      if (url.origin !== window.location.origin) return;
      if (url.href === window.location.href) return;
      start();
    };

    document.addEventListener("click", onClick, true);

    // Patch history so programmatic navigations (router.push/replace) also
    // trigger the bar. The originals are restored on cleanup.
    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;
    const wrap =
      (fn: typeof window.history.pushState) =>
      (...args: Parameters<typeof window.history.pushState>) => {
        const nextUrl = args[2];
        if (nextUrl != null) {
          const url = new URL(String(nextUrl), window.location.href);
          // Defer the state update: React patches history during its commit
          // (insertion-effect) phase, and scheduling updates synchronously
          // there triggers "useInsertionEffect must not schedule updates".
          if (url.href !== window.location.href) queueMicrotask(start);
        }
        return fn.apply(window.history, args);
      };
    window.history.pushState = wrap(origPush);
    window.history.replaceState = wrap(origReplace);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, [start]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full bg-primary shadow-[0_0_8px_var(--primary),0_0_4px_var(--primary)]"
        style={{ width: `${progress}%`, transition: "width 200ms ease" }}
      />
    </div>
  );
}

export function NavigationProgress() {
  // `useSearchParams` requires a Suspense boundary during static rendering.
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}
