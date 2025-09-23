"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <main className="min-h-[60vh] grid place-items-center p-8 text-center">
          <div>
            <h1 className="text-3xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-gray-500">An unexpected error occurred.</p>
            <button onClick={reset} className="mt-6 inline-block rounded-md bg-black text-white px-4 py-2">Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}

