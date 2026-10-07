import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 pt-24 text-center">
      <h1 className="font-hand text-7xl">uh oh!</h1>
      <p className="mt-4 text-lg">This page wandered off. Maybe the pet ate it.</p>
      <Link href="/" className="pill pill-filled mt-8 py-2.5!">
        Back home
      </Link>
    </main>
  );
}
