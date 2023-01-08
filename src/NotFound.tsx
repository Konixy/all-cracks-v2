import React from 'react';
import config from './config';

export default function NotFound() {
  document.title = `404${config.titleSufix}`;
  return (
    <div className="relative flex h-full w-full flex-auto flex-col items-center justify-center px-4 pt-[20%] text-center sm:flex-row">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:mr-6 sm:border-r sm:border-slate-900/10 sm:pr-6 sm:text-3xl sm:dark:border-slate-300/10">
        404
      </h1>
      <h2 className="mt-2 text-lg text-slate-700 dark:text-slate-400 sm:mt-0">Cette page n&apos;éxiste pas.</h2>
    </div>
  );
}
