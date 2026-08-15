"use client";

import Image from "next/image";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import { PageWrapper, Section } from "@/components/layout";

const userScreenshots = [
  { src: "/assets/article-home-screen.jpeg", caption: "Home Screen" },
  { src: "/assets/article-detail-screen.jpeg", caption: "Reading View" },
  { src: "/assets/article-discussion-screen-for-user.jpeg", caption: "Article Discussion" },
  { src: "/assets/article-writing-screen.jpeg", caption: "Writing Form" },
  { src: "/assets/article-writing-screen-2.jpeg", caption: "Select Language" },
  { src: "/assets/podcast-form.jpeg", caption: "Podcast Form" },
  { src: "/assets/podcast-list-screen.jpeg", caption: "Podcast Listing" },
  { src: "/assets/podcast-play-screen.jpeg", caption: "Podcast Player" },
  { src: "/assets/podcast-play-screen-2.jpeg", caption: "Podcast Player" },
  { src: "/assets/podcast-recording.jpeg", caption: "Podcast Recorder" },
  { src: "/assets/podcast-upload.jpeg", caption: "Podcast Upload" },
  { src: "/assets/notification-screen.jpeg", caption: "Notification" },
  { src: "/assets/ultimate-health-about.jpeg", caption: "App Info" },
  { src: "/assets/terms_cond_page.jpeg", caption: "Terms And Condition" },
];

const adminScreenshots = [
  { src: "/assets/admin_dashboard.jpeg", caption: "Admin Dashboard" },
  { src: "/assets/admin_dashboard2.jpeg", caption: "Admin Dashboard Second" },
  { src: "/assets/article_view_unassign.jpeg", caption: "Article View Unassign" },
  { src: "/assets/article_view_unassign1.jpeg", caption: "Article View Unassign" },
  { src: "/assets/article_view_assign.jpeg", caption: "Article View Assign" },
  { src: "/assets/article_action.jpeg", caption: "Article Action" },
  { src: "/assets/podcast_action.jpeg", caption: "Podcast Action" },
  { src: "/assets/podcast_live.jpeg", caption: "Podcast Live State" },
  { src: "/assets/admin_insights.jpeg", caption: "Admin Insights" },
];

const allScreenshots = [...userScreenshots, ...adminScreenshots];

const SLIDER_SCROLL_AMOUNT = 324;
const CLONE_COUNT = 8; // needs to be >= viewport_width / itemWidth for clone zone to be reachable

// Infinite carousel: clone first/last CLONE_COUNT items on each side for seamless looping
const extendedUserScreenshots = [
  ...userScreenshots.slice(-CLONE_COUNT),
  ...userScreenshots,
  ...userScreenshots.slice(0, CLONE_COUNT),
];
const extendedAdminScreenshots = [
  ...adminScreenshots.slice(-CLONE_COUNT),
  ...adminScreenshots,
  ...adminScreenshots.slice(0, CLONE_COUNT),
];

// Infinite carousel using the clone trick:
// The rendered list is [...lastN clones, ...real items, ...firstN clones]
// moveSlider only triggers the smooth scroll; the scroll-event listeners below
// handle the silent reset once the animation actually finishes.
const moveSlider = (ref: RefObject<HTMLDivElement | null>, dir: number) => {
  const slider = ref.current;
  if (!slider) return;
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const currentScroll = slider.scrollLeft;
  const targetScroll = Math.max(
    0,
    Math.min(currentScroll + dir * SLIDER_SCROLL_AMOUNT, maxScrollLeft),
  );
  slider.scrollTo({ left: targetScroll, behavior: "smooth" });
};

/** Positions a slider on the first real item, skipping the leading clones. */
function useInitialSliderOffset(
  ref: RefObject<HTMLDivElement | null>,
  realCount: number,
  open: boolean,
) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const slider = ref.current;
      if (!slider) return;
      const itemWidth = slider.scrollWidth / (realCount + CLONE_COUNT * 2);
      slider.scrollLeft = CLONE_COUNT * itemWidth;
    }, 50);
    return () => clearTimeout(timer);
  }, [ref, realCount, open]);
}

/**
 * Scroll-event debounce: fires 150ms after scrolling stops (works for any scroll
 * duration). Silently resets position when the slider lands in the clone zone.
 */
function useInfiniteSliderReset(
  ref: RefObject<HTMLDivElement | null>,
  realCount: number,
  open: boolean,
) {
  useEffect(() => {
    const slider = ref.current;
    if (!slider || !open) return;
    let debounce: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        const totalItems = realCount + CLONE_COUNT * 2;
        const itemWidth = slider.scrollWidth / totalItems;
        const startOffset = CLONE_COUNT * itemWidth;
        const realScrollWidth = realCount * itemWidth;
        const scroll = slider.scrollLeft;
        if (scroll >= startOffset + realScrollWidth) {
          slider.scrollTo({ left: startOffset + (scroll - startOffset - realScrollWidth), behavior: "instant" as ScrollBehavior });
        } else if (scroll < startOffset) {
          slider.scrollTo({ left: startOffset + realScrollWidth + (scroll - startOffset), behavior: "instant" as ScrollBehavior });
        }
      }, 150);
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      slider.removeEventListener("scroll", onScroll);
      if (debounce) clearTimeout(debounce);
    };
  }, [ref, realCount, open]);
}

/**
 * "App Experience" section: two auto-advancing screenshot carousels plus the
 * full-screen preview. Interactive, so it stays a client component.
 */
export default function ScreenshotGallery() {
  const [userSliderOpen, setUserSliderOpen] = useState(true);
  const [adminSliderOpen, setAdminSliderOpen] = useState(false);
  const [screenshotModal, setScreenshotModal] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const userSliderRef = useRef<HTMLDivElement>(null);
  const adminSliderRef = useRef<HTMLDivElement>(null);
  const autoSlideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    autoSlideTimerRef.current = setInterval(() => {
      moveSlider(userSliderRef, 1);
      if (adminSliderOpen) moveSlider(adminSliderRef, 1);
    }, 3000);
  }, [adminSliderOpen]);

  const handleManualSlide = useCallback(
    (ref: RefObject<HTMLDivElement | null>, direction: number) => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
      moveSlider(ref, direction);
      setTimeout(startAutoSlide, 5000);
    },
    [startAutoSlide],
  );

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [startAutoSlide]);

  useInitialSliderOffset(userSliderRef, userScreenshots.length, userSliderOpen);
  useInitialSliderOffset(adminSliderRef, adminScreenshots.length, adminSliderOpen);
  useInfiniteSliderReset(userSliderRef, userScreenshots.length, userSliderOpen);
  useInfiniteSliderReset(adminSliderRef, adminScreenshots.length, adminSliderOpen);

  const navigateScreenshot = useCallback((dir: number) => {
    setCurrentScreenshot((prev) => {
      const next = prev + dir;
      if (next < 0) return allScreenshots.length - 1;
      if (next >= allScreenshots.length) return 0;
      return next;
    });
  }, []);

  const closeScreenshotModal = useCallback(() => {
    setScreenshotModal(false);
  }, []);

  useEffect(() => {
    if (!screenshotModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [screenshotModal]);

  useEffect(() => {
    if (!screenshotModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeScreenshotModal();
      if (e.key === "ArrowLeft") navigateScreenshot(-1);
      if (e.key === "ArrowRight") navigateScreenshot(1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screenshotModal, closeScreenshotModal, navigateScreenshot]);

  const openScreenshotModal = (src: string) => {
    const idx = allScreenshots.findIndex((s) => s.src === src);
    setCurrentScreenshot(idx >= 0 ? idx : 0);
    setScreenshotModal(true);
  };

  const handleScreenshotCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, src: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openScreenshotModal(src);
    }
  };

  const selectedScreenshot = allScreenshots[currentScreenshot] ?? allScreenshots[0];

  return (
    <>
      <Section id="screenshots">
        <PageWrapper>
          <h2>App Experience</h2>
          <p className="center">A closer look at what UltimateHealth offers, screen by screen</p>

          <div className="screenshot-details">
            <div className="screenshot-summary" onClick={() => setUserSliderOpen((o) => !o)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setUserSliderOpen((o) => !o); }}>
              <i className={`fas fa-caret-${userSliderOpen ? 'down' : 'right'}`} style={{ color: "var(--primary)", marginRight: "8px" }} aria-hidden="true" /> UltimateHealth App
            </div>
            {userSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={userSliderRef}>
                  {extendedUserScreenshots.map((s, i) => (
                    <div
                      key={`user-${i}`}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                      onKeyDown={(e) => handleScreenshotCardKeyDown(e, s.src)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${s.caption} screenshot`}
                    >
                    <div className="screenshot-image-frame">
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="screenshot-image"
                      />
                    </div>
                      <div className="screenshot-card-caption">{s.caption}</div>
                    </div>
                  ))}
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" type="button" aria-label="Previous UltimateHealth screenshot" onClick={() => handleManualSlide(userSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" type="button" aria-label="Next UltimateHealth screenshot" onClick={() => handleManualSlide(userSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>

          <div className="screenshot-details">
            <div className="screenshot-summary" onClick={() => setAdminSliderOpen((o) => !o)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setAdminSliderOpen((o) => !o); }}>
              <i className={`fas fa-caret-${adminSliderOpen ? 'down' : 'right'}`} style={{ color: "var(--primary)", marginRight: "8px" }} aria-hidden="true" /> UHealth Admin App
            </div>
            {adminSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={adminSliderRef}>
                  {extendedAdminScreenshots.map((s, i) => (
                    <div
                      key={`admin-${i}`}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                      onKeyDown={(e) => handleScreenshotCardKeyDown(e, s.src)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${s.caption} screenshot`}
                    >
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="screenshot-image"
                      />
                      <div className="screenshot-card-caption">{s.caption}</div>
                    </div>
                  ))}
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" type="button" aria-label="Previous UHealth Admin screenshot" onClick={() => handleManualSlide(adminSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" type="button" aria-label="Next UHealth Admin screenshot" onClick={() => handleManualSlide(adminSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>
        </PageWrapper>
      </Section>

      {screenshotModal && (
        <div className="screenshot-modal active" onClick={closeScreenshotModal}>
          <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="screenshot-modal-close" type="button" aria-label="Close screenshot preview" onClick={closeScreenshotModal}>×</button>
            <button className="screenshot-modal-nav screenshot-modal-prev" type="button" aria-label="Previous screenshot" onClick={() => navigateScreenshot(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <Image
              src={selectedScreenshot.src}
              alt={selectedScreenshot.caption}
              width={390}
              height={780}
              sizes="(max-width: 768px) 80vw, 390px"
              className="screenshot-modal-image"
            />
            <button className="screenshot-modal-nav screenshot-modal-next" type="button" aria-label="Next screenshot" onClick={() => navigateScreenshot(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="screenshot-caption">{selectedScreenshot.caption}</div>
          </div>
        </div>
      )}
    </>
  );
}
