/**
 * Core Accessibility & Performance Ingestion Module
 * Targets: Native Lazy Loading, WCAG 2.1 Compliant Alt Attributes, Intersection Observers
 */
class DOMPerformanceOptimizer {
    constructor() {
        this.imageCount = 0;
        this.fallbackTriggers = 0;
        this.init();
    }

    init() {
        // Run performance tuning once the Document Object Model is completely loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.executeOptimizationPipeline());
        } else {
            this.executeOptimizationPipeline();
        }
    }

    executeOptimizationPipeline() {
        const startPerformance = performance.now();

        // 1. Query all image tags present in the current layout configuration
        const images = document.querySelectorAll('img');
        this.imageCount = images.length;

        if (this.imageCount === 0) {
            this.logDiagnostic("No target image fields discovered on current routing pass.", "safe");
            return;
        }

        // 2. Set up fallback Intersection Observer configuration parameters
        const observerOptions = {
            root: null, // Relative to browser viewport bounds
            rootMargin: '200px 0px', // Pre-load assets 200px before they scroll into active view
            threshold: 0.01
        };

        const fallbackObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.swapLazySource(img);
                    observer.unobserve(img); // Cease tracking once asset is loaded safely
                }
            });
        }, observerOptions);

        // 3. Process every individual node element discovered
        images.forEach((img, index) => {
            // Skip prominent above-the-fold elements (Hero images should load instantly to preserve LCP)
            if (img.classList.contains('hero-img') || img.hasAttribute('data-instant')) {
                return;
            }

            // A. PERFORMANCE: Apply Native Lazy Loading
            img.setAttribute('loading', 'lazy');

            // B. ACCESSIBILITY: Validate and repair missing/empty alt tags to satisfy screen-readers
            this.enforceAccessibilityStandards(img, index);

            // C. COMPATIBILITY FALLBACK: Handle browsers lacking native lazy-load support
            if (!('loading' in HTMLImageElement.prototype)) {
                this.prepareFallbackLazyLoad(img, fallbackObserver);
            }
        });

        const loopDuration = performance.now() - startPerformance;
        this.updateTelemetryMetrics(loopDuration);
    }

    enforceAccessibilityStandards(img, index) {
        const currentAlt = img.getAttribute('alt');

        // If alt tag is missing or entirely blank space string structures
        if (currentAlt === null || currentAlt.trim() === "") {
            // Heuristic fallback: Use filename context or section tracking parent context identifiers
            const srcAttr = img.getAttribute('src') || '';
            const fileName = srcAttr.split('/').pop().split('.')[0] || `media-asset-${index}`;

            // Format clean title capitalization from kebab/snake cases for readable aria-voiceover tracks
            const descriptiveAltText = fileName
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase());

            img.setAttribute('alt', `${descriptiveAltText} illustration`);
            this.logDiagnostic(`Accessibility alert fixed: Missing 'alt' on node [${index}]. Set to: "${descriptiveAltText} illustration"`, "warn");
        }
    }

    prepareFallbackLazyLoad(img, observer) {
        const originalSrc = img.getAttribute('src');

        if (originalSrc && !img.hasAttribute('data-src')) {
            // Mutate real source target into a high-performance placeholder layout structure
            img.setAttribute('data-src', originalSrc);

            // Use an inline, transparent ultra-lightweight SVG vector box data-URI to block layout shifts (CLS protection)
            img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');

            observer.observe(img);
            this.fallbackTriggers++;
        }
    }

    swapLazySource(img) {
        if (img.hasAttribute('data-src')) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
        }
    }

    updateTelemetryMetrics(durationMs) {
        this.logDiagnostic(`--- Optimization Run Complete ---`, "accent");
        this.logDiagnostic(`Total Tracked Image Nodes Evaluated: ${this.imageCount}`, "accent");
        this.logDiagnostic(`Fallback Observers Attached: ${this.fallbackTriggers}`, "accent");
        this.logDiagnostic(`Pipeline Calculation Latency: ${durationMs.toFixed(3)} ms`, "safe");
    }

    logDiagnostic(message, type) {
        const styles = {
            safe: "color: #39ff14; font-weight: bold;",
            warn: "color: #ffaa00; font-style: italic;",
            accent: "color: #00f0ff;"
        };
        console.log(`%c[DOM_OPTIMIZER] ${message}`, styles[type] || "color: #ffffff;");
    }
}

// Instantiate processing modules globally
const optimizationEngine = new DOMPerformanceOptimizer();