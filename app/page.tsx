import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#333333]">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Matt Atkins</h1>
          <p className="text-xl md:text-2xl font-light">Building at the intersection of Hardware & Software</p>
        </header>

        <div className="border-t border-gray-200 my-8"></div>

        <section className="mb-10">
          <p className="text-lg mb-3">
            Principle PM @{" "}
            <Link href="https://smartrent.com" className="hover:underline">
              SmartRent
            </Link>
          </p>
          <p className="text-lg mb-3">
            Previously Product Manager at{" "}
            <Link href="https://www.xfinity.com/multifamily" className="hover:underline">
              Comcast
            </Link>
          </p>
          <p className="text-lg">Lives in Philadelphia PA.</p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Projects</h2>
          <div className="space-y-6">
            <div>
              <Link href="#" className="font-medium text-lg hover:underline">
                Mercury Raycast Extension
              </Link>
              <p className="mt-1 text-gray-700">
                Quickly see your Mercury accounts and transactions directly in Raycast.
              </p>
            </div>
            <div>
              <Link href="#" className="font-medium text-lg hover:underline">
                Wedding website
              </Link>
              <p className="mt-1 text-gray-700">
                Our personal wedding website detailing event information and memories.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Writing</h2>
          <div className="space-y-6">
            <div>
              <Link href="#" className="font-medium text-lg hover:underline">
                Product Development in IoT Ecosystems
              </Link>
              <p className="mt-1 text-gray-700">
                May 2025 — Exploring the challenges and opportunities in connected home products.
              </p>
            </div>
            <div>
              <Link href="#" className="font-medium text-lg hover:underline">
                Bridging Hardware and Software Teams
              </Link>
              <p className="mt-1 text-gray-700">
                January 2025 — A deep dive into cross-functional collaboration in tech products.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Contact</h2>
          <p className="mb-4">Feel free to reach out:</p>
          <div className="space-y-2">
            <div>
              <Link href="mailto:your-email@example.com" className="hover:underline">
                your-email@example.com
              </Link>
            </div>
            <div>
              <Link href="https://linkedin.com/in/username" className="hover:underline">
                LinkedIn
              </Link>
            </div>
            <div>
              <Link href="https://github.com/username" className="hover:underline">
                Github
              </Link>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">© 2025 Matt Atkins</footer>
      </main>
    </div>
  )
}
