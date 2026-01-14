"use client";

type ToastProps = {
  message: string;
};

export const Toast = ({ message }: ToastProps) => (
  <div
    role="status"
    aria-live="polite"
    className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg"
  >
    {message}
  </div>
);
