import type { FC } from "react";

/**
 * Standardized in-article clinical safety disclaimer callout box.
 * Satisfies Google YMYL (Your Money or Your Life) health guidelines by ensuring
 * readers are explicitly advised to seek individualized professional medical consultation.
 */
export const ClinicalMedicalDisclaimer: FC = () => {
  return (
    <aside
      role="note"
      aria-label="Medical Disclaimer"
      className="my-10 rounded-2xl border border-amber-200/80 bg-amber-50/70 dark:bg-amber-950/20 dark:border-amber-800/40 p-5 sm:p-6 flex gap-4 text-left shadow-sm"
    >
      <div
        className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 text-xl select-none"
        aria-hidden="true"
      >
        🛡️
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-1">
          Medical Disclaimer & Clinical Education Notice
        </h4>
        <p className="text-xs md:text-sm text-amber-800/90 dark:text-amber-300/80 leading-relaxed m-0">
          The health and medical information published on UltimateHealth is for general educational and informational purposes only. It is not a substitute for professional medical advice, clinical diagnosis, or individualized treatment plans. Always consult your physician or a qualified healthcare specialist regarding any medical symptoms or conditions.
        </p>
      </div>
    </aside>
  );
};

export default ClinicalMedicalDisclaimer;
