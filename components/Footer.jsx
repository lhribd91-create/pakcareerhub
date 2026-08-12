import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white mt-20">
      <div className="bg-[var(--green)]">
        <div className="container-px max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-bold">Never Miss a Job Update</h3>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="rounded-lg px-4 py-2.5 w-full md:w-72 text-[var(--ink)] outline-none"
            />
            <button type="submit" className="bg-[var(--navy)] px-5 py-2.5 rounded-lg font-semibold whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="container-px max-w-7xl mx-auto py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--green)] text-white flex items-center justify-center text-sm">
              P
            </span>
            PakCareerHub
          </div>
          <p className="text-sm text-gray-300">
            Pakistan&apos;s most trusted job portal. Providing the latest updates on
            government jobs, private sector vacancies, admissions, and results
            across the country.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Jobs</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/jobs" className="hover:text-white">All Jobs</Link></li>
            <li><Link href="/jobs?type=government" className="hover:text-white">Government Jobs</Link></li>
            <li><Link href="/jobs?type=private" className="hover:text-white">Private Jobs</Link></li>
            <li><Link href="/jobs#departments" className="hover:text-white">By Department</Link></li>
            <li><Link href="/jobs#cities" className="hover:text-white">By City</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Top Agencies</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/agencies/fpsc" className="hover:text-white">FPSC Jobs</Link></li>
            <li><Link href="/agencies/ppsc" className="hover:text-white">PPSC Jobs</Link></li>
            <li><Link href="/agencies/nts" className="hover:text-white">NTS Jobs</Link></li>
            <li><Link href="/agencies/pts" className="hover:text-white">PTS Jobs</Link></li>
            <li><Link href="/agencies/spsc" className="hover:text-white">SPSC Jobs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/results" className="hover:text-white">Results</Link></li>
            <li><Link href="/rollnoslips" className="hover:text-white">Roll No Slips</Link></li>
            <li><Link href="/admissions" className="hover:text-white">Admissions</Link></li>
            <li><Link href="/mcqs" className="hover:text-white">MCQ Practice</Link></li>
            <li><Link href="/pastpapers" className="hover:text-white">Past Papers</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px max-w-7xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PakCareerHub. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
