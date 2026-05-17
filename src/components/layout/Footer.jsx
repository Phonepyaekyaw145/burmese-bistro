import { BRAND } from "../../data/siteData";

export default function Footer() {
  return (
    <footer
      className="border-t shrink-0 px-6 py-3 flex items-center justify-center"
      style={{ background: "var(--bg2)", borderColor: "var(--bo)" }}
    >
      <span className="text-[11px]" style={{ color: "var(--mt)" }}>
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </span>
    </footer>
  );
}
