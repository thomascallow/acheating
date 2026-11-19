#!/usr/bin/env python3
"""Set the website's domain everywhere it is used.

Usage:  python3 set-domain.py https://www.your-new-domain.gg

Updates canonical links, social preview URLs, structured data, sitemap.xml,
robots.txt, config.js and the CNAME file used by GitHub Pages.
Run it again any time the domain changes.
"""
import pathlib, re, sys

if len(sys.argv) != 2 or not re.match(r"^https://[a-z0-9.-]+\.[a-z]{2,}$", sys.argv[1].rstrip("/")):
    sys.exit("Usage: python3 set-domain.py https://www.your-new-domain.gg")

new = sys.argv[1].rstrip("/")
root = pathlib.Path(__file__).parent
cfg = root / "assets/js/config.js"
old = re.search(r'siteUrl:\s*"([^"]+)"', cfg.read_text(encoding="utf-8")).group(1)
host_old, host_new = old.split("//")[1].removeprefix("www."), new.split("//")[1].removeprefix("www.")

changed = 0
for f in list(root.rglob("*.html")) + [root / "sitemap.xml", root / "robots.txt", cfg]:
    if not f.exists():
        continue
    text = f.read_text(encoding="utf-8")
    updated = text.replace(old, new)
    if updated != text:
        f.write_text(updated, encoding="utf-8"); changed += 1
(root / "CNAME").write_text(new.split("//")[1] + "\n", encoding="utf-8")
print(f"Domain changed from {old} to {new} in {changed} files.")
