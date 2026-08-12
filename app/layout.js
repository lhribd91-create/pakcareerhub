import "./globals.css";

export const metadata = {
  title: "PakCareerHub - Pakistan's Premier Job Portal",
  description:
    "The most trusted destination for FPSC, PPSC, NTS, and top private company jobs across Pakistan. Updated daily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
