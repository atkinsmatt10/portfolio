import Link from "next/link"
import { Weather } from "@/components/weather"
import { PageTransition, AnimatedSection } from "@/components/page-transition"
import { Mail, Linkedin, Github, Rss } from "lucide-react"

export default function Home() {
  return (
    <PageTransition className="min-h-screen bg-[#faf9f7] text-[#333333]">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <AnimatedSection delay={0.1}>
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">Matt Atkins</h1>
            <p className="text-xl md:text-2xl font-light">Building at the intersection of Hardware & Software</p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="border-t border-gray-200 my-8"></div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
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
            <p className="text-lg">
              Lives in Philadelphia PA <Weather />
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">Projects</h2>
            <div className="space-y-6">
              <div>
                <Link href="https://www.raycast.com/atkinsmatt101/mercury" className="font-medium text-lg hover:underline">
                  Mercury Raycast Extension
                </Link>
                <p className="mt-1 text-gray-700">
                  Quickly see your Mercury accounts and transactions directly in Raycast.
                </p>
              </div>
              <div>
                <Link href="https://www.nicolematt.com" className="font-medium text-lg hover:underline">
                  Wedding Website
                </Link>
                <p className="mt-1 text-gray-700">
                  Our personal wedding website detailing event information and memories.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl md:text-3xl">Writing</h2>
              <Link 
                href="/rss.xml" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="RSS Feed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rss size={20} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </Link>
            </div>
            <div className="space-y-6">
              <div>
                <Link href="/blog" className="font-medium text-lg hover:underline">
                  View all blog posts →
                </Link>
                <p className="mt-1 text-gray-700">
                Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Contact</h2>
            <p className="mb-4">Feel free to reach out:</p>
            <div className="flex space-x-4">
              <Link 
                href="mailto:atkinsmatt10@gmail.com" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/atkinsmatthew1/" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </Link>
              <Link 
                href="https://github.com/atkinsmatt10" 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </Link>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <footer className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            <div>© 2025 Matt Atkins</div>
            <div className="mt-1">Made with love in Philadelphia</div>
          </footer>
        </AnimatedSection>
      </main>
    </PageTransition>
  )
}
