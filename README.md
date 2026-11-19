# A.C. Heating Services Ltd — website

A static website (HTML, CSS and a little JavaScript) for **https://www.acheating.gg**, set up for hosting on GitHub Pages. It has no database and needs no special software to run.

## Folder layout

```
index.html                    Home
electrical-services/          Electrical Services
fire-alarms/                  Fire Alarm Systems
maintenance/                  Commercial Maintenance
about/                        About Us
careers/                      Careers
contact/                      Contact (enquiry form)
privacy/                      Privacy Policy (DRAFT — review before launch)
recruitment-privacy/          Recruitment Privacy Notice (DRAFT — review before launch)
404.html                      "Page not found" page
drafts/components/            Unpublished testimonial, case study and charges blocks (hidden from search engines)
assets/css/styles.css         All styling
assets/js/config.js           SITE SETTINGS — contact details, careers email, form mode, photos, logos
assets/js/main.js             Menu, form and photo behaviour
assets/img/                   Put photographs and logo files here
CNAME                         Tells GitHub Pages the site's domain (www.acheating.gg) — don't delete
set-domain.py                 Changes the website address everywhere, if it ever changes
sitemap.xml, robots.txt       For search engines
```

Each page lives in its own folder, which gives clean addresses such as `/fire-alarms/`.

## Previewing on your computer

Because pages are in folders, double-clicking `index.html` opens the homepage but links between pages won't work properly. To preview the whole site, run this from the site folder and open http://localhost:8000:

```
python3 -m http.server 8000
```

Visual Studio Code's "Live Server" extension does the same job.

## Everyday changes

**Text.** Open the page's `index.html` in any text editor and change the wording between the tags. The header and footer appear on every page, so a change there needs making in each file (a "find and replace across files" in your editor does it in one step).

**Photographs.** Copy the photo into `assets/img/`, then in `assets/js/config.js` find its entry under `images` and fill in `src` (the file path) and `alt` (a short description of what the photo genuinely shows). The labelled placeholder is replaced automatically and the crop adjusts to fit, so layouts don't change. Suggested sizes: about 1600px wide for large images, 800px for portraits. Compress photos before uploading (for example with squoosh.app) and use JPEG or WebP.

**Logo.** The logo files are in `assets/img/`: `logo.svg` (header), `logo-white.svg` (for dark backgrounds, used in the footer) and `favicon.svg` (browser tab icon). They were redrawn as sharp vector graphics from the small GIF on the old website, so they stay crisp at any size and on high-resolution screens. If the original artwork from the logo's designer turns up, swap it in under the same file names.

**NICEIC mark.** `assets/img/niceic-approved-contractor.png` is a cleaned, enlarged copy of the logo from the old website. It's deliberately not redrawn, because certification marks shouldn't be altered. NICEIC supplies official artwork to registered contractors; when you have it, replace this file (same name) for the sharpest result.

**Phone and email.** Change them in `config.js`. They're also written into each page so the site works without JavaScript, so do a find-and-replace across files as well.

**Careers email.** Job applications currently go to acheating@cwgsy.net. If a dedicated careers mailbox is set up later, change `careersEmail` in `config.js` (the buttons update) and find-and-replace the address in `careers/index.html` and `recruitment-privacy/index.html`.

**Staff profiles.** Edit the cards in `about/index.html`. Each card has a `TO DO` note (hidden from visitors) saying what still needs verifying.

## The enquiry form

The form needs no server, form service or setup. When a visitor presses Send Enquiry, their own email app opens with the enquiry written out and addressed to acheating@cwgsy.net. The page tells them the enquiry is only sent once they press Send in their email app, and offers a copy-and-paste fallback if no email app opens (common on shared or work computers, or for people who only use webmail).

Because the email comes from the visitor's own account, it arrives in the inbox as a normal email you can reply to directly. The trade-off is that some visitors won't finish sending, which is why the phone number and email address sit beside the form.

If you later move to a host that runs PHP, or want enquiries sent directly from the website, a server-side sender or form service can be added.
## Adding a Projects page or Charges section later

Ready-made blocks are in `drafts/components/index.html`. Copy an existing page folder (for example `about/`) to `projects/`, replace the main content with case study blocks, and add the page to the navigation in every file, to the footer quick links and to `sitemap.xml`. Publish the Charges section only once rates and terms are approved.
