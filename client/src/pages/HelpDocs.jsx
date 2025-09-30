import React from 'react'

export default function HelpDocs() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Help & Documentation</h2>
      <section className="mt-4">
        <h3 className="font-semibold">Getting Started</h3>
        <p className="text-sm text-slate-500">Create an account, browse shows in Discover, and add to your Watchlist.</p>
      </section>
      <section className="mt-4">
        <h3 className="font-semibold">Progress Tracking</h3>
        <p className="text-sm text-slate-500">Mark episodes watched from the show page or your watchlist. Use the admin panel to add shows.</p>
      </section>
      <section className="mt-4">
        <h3 className="font-semibold">Spoiler Protection</h3>
        <p className="text-sm text-slate-500">Enable spoiler hiding in your profile settings to mask spoilers in discussions (coming soon).</p>
      </section>
    </main>
  )
}
