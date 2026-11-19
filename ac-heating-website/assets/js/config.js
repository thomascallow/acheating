/* =========================================================================
   SITE SETTINGS — A.C. Heating Services Ltd
   -------------------------------------------------------------------------
   This is the one place to change contact details, the careers mailbox,
   how the enquiry form sends, the NICEIC profile link and every photograph.
   Save the file and refresh the browser to see changes.
   ========================================================================= */

window.SITE_CONFIG = {

  /* Website address. Change it with set-domain.py (see README) so that
     canonical links, the sitemap and social previews all update together. */
  siteUrl: "https://www.acheating.gg",

  /* Telephone shown across the site (click-to-call uses the international form). */
  phoneDisplay: "07781 100610",
  phoneHref: "tel:+447781100610",

  /* Where general enquiries go. */
  enquiryEmail: "acheating@cwgsy.net",

  /* Where job applications go (currently the general inbox). Change this
     if a dedicated careers mailbox is set up later; every careers button updates. */
  careersEmail: "acheating@cwgsy.net",

  /* Paste the company's official NICEIC directory URL here once confirmed.
     While it is empty, no link is shown. */
  niceicProfileUrl: "",

  /* Enquiry form delivery. "mailto" needs no server: on "Send Enquiry" the
     visitor's own email app opens with the enquiry written out and addressed
     to enquiryEmail. This is the right setting for GitHub Pages.
     ("php" is only for hosts that run PHP, with a server-side mail script.) */
  form: {
    mode: "mailto"
  },

  /* -----------------------------------------------------------------------
     PHOTOGRAPHS
     Add a file to assets/img/ and put its path in "src". Write "alt" to
     describe what the photo genuinely shows. Leave "src" empty to keep the
     labelled placeholder. Crops are automatic, so layouts stay the same.
     ----------------------------------------------------------------------- */
  images: {
    /* Home */
    "home-hero":        { src: "", alt: "", label: "Hero photograph: electrical work in progress or the A.C. Heating Services team" },
    "home-commercial":  { src: "", alt: "", label: "Commercial electrical installation" },
    "home-fire":        { src: "", alt: "", label: "Fire alarm panel or technician at work" },
    "home-testing":     { src: "", alt: "", label: "Electrical inspection and testing" },
    "home-team":        { src: "", alt: "", label: "Team or company photograph" },

    /* About */
    "about-team":       { src: "", alt: "", label: "Full team photograph" },
    "staff-joe":        { src: "", alt: "", label: "Portrait: Joe Bould" },
    "staff-nick":       { src: "", alt: "", label: "Portrait: Nick Stevenson" },
    "staff-simon":      { src: "", alt: "", label: "Portrait: Simon Herve" },
    "staff-callum":     { src: "", alt: "", label: "Portrait: Callum Smith" },
    "staff-accounts":   { src: "", alt: "", label: "Portrait: accounts team member (name to be confirmed)" },

    /* Electrical Services */
    "elec-commercial":  { src: "", alt: "", label: "Commercial installation" },
    "elec-testing":     { src: "", alt: "", label: "Electrical testing" },
    "elec-heating":     { src: "", alt: "", label: "Electric heating installation" },
    "elec-domestic":    { src: "", alt: "", label: "Domestic electrical work" },

    /* Fire Alarms */
    "fire-kentec":      { src: "", alt: "", label: "Kentec fire alarm control panel (genuine company photograph)" },
    "fire-install":     { src: "", alt: "", label: "Fire alarm installation" },
    "fire-servicing":   { src: "", alt: "", label: "Fire alarm inspection or servicing" },

    /* Careers */
    "careers-team":     { src: "", alt: "", label: "Team at work" },
    "careers-tech":     { src: "", alt: "", label: "Electrical technician" },

    /* Unpublished draft components */
    "case-placeholder": { src: "", alt: "", label: "Case study photograph (future use)" }
  }
};
