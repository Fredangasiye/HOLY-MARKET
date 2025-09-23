export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-gray-500">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-6 inline-block rounded-md bg-black text-white px-4 py-2">Go home</a>
      </div>
    </main>
  );
}

