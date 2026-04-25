import SmoothScroller from "@/components/SmoothScoller";

export default function RootLayout({ children }) {
  return (
    <>
      <SmoothScroller>{children}</SmoothScroller>
    </>
  );
}
