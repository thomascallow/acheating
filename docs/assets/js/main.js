/* A.C. Heating Services Ltd — site behaviour. Settings live in config.js. */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  // Site root, worked out from this script's address, so photo paths in
  // config.js work the same from every page folder.
  var BASE = ((document.currentScript && document.currentScript.src) || "").replace(/assets\/js\/main\.js.*$/, "");
  var resolve = function (src) { return /^(https?:|\/|data:)/.test(src) ? src : BASE + src; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Mobile navigation ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#primary-nav");
  if (toggle && nav) {
    var close = function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); };
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { close(); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 1280) close(); });
  }

  /* ---------- Contact details from config ---------- */
  if (C.phoneDisplay) {
    $$("[data-phone]").forEach(function (a) {
      a.setAttribute("href", C.phoneHref);
      if (a.hasAttribute("data-phone-text")) a.textContent = a.getAttribute("data-phone-text").replace("{phone}", C.phoneDisplay);
      if (a.hasAttribute("aria-label")) a.setAttribute("aria-label", "Call " + C.phoneDisplay);
    });
  }
  $$("[data-email]").forEach(function (a) {
    var which = a.getAttribute("data-email");
    var addr = which === "careers" ? C.careersEmail : C.enquiryEmail;
    if (!addr) return;
    var subject = a.getAttribute("data-subject");
    a.setAttribute("href", "mailto:" + addr + (subject ? "?subject=" + encodeURIComponent(subject) : ""));
    if (a.hasAttribute("data-email-text")) a.textContent = addr;
  });

  /* ---------- NICEIC profile link (only when a confirmed URL is set) ---------- */
  $$("[data-niceic-link]").forEach(function (el) {
    if (C.niceicProfileUrl) {
      var a = el.querySelector("a");
      if (a) a.setAttribute("href", C.niceicProfileUrl);
      el.hidden = false;
    }
  });

  /* ---------- Image placeholders ---------- */
  var camera = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var images = C.images || {};
  $$("[data-img]").forEach(function (fig) {
    var key = fig.getAttribute("data-img");
    var item = images[key];
    if (item && item.src) {
      var img = new Image();
      img.src = resolve(item.src);
      img.alt = item.alt || "";
      img.decoding = "async";
      if (!fig.hasAttribute("data-eager")) img.loading = "lazy";
      fig.innerHTML = "";
      fig.appendChild(img);
      fig.classList.add("has-image");
      fig.removeAttribute("aria-label");
      fig.removeAttribute("role");
    } else {
      var label = (item && item.label) || key;
      var span = document.createElement("span");
      span.className = "ph-label";
      span.innerHTML = camera + "<span>Photo placeholder: " + label.replace(/</g, "&lt;") + "</span>";
      fig.appendChild(span);
      fig.setAttribute("role", "img");
      fig.setAttribute("aria-label", "Photograph to be added: " + label);
    }
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Gentle reveal ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = $$(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* =======================================================================
     ENQUIRY FORM
     ======================================================================= */
  var form = $("#enquiry-form");
  if (!form) return;

  var mode = (C.form && C.form.mode) || "mailto";
  var resultBox = $("#form-result");
  var summary = $("#error-summary");
  var ts = form.elements["_ts"];
  if (ts) ts.value = String(Date.now());

  // Mode-specific notes
  $$("[data-mode]").forEach(function (el) { el.hidden = el.getAttribute("data-mode") !== mode; });

  // Pre-select from links such as contact.html?type=business&service=maintenance
  var params = new URLSearchParams(window.location.search);
  var typeMap = { business: "Business / Commercial", property: "Property Manager", contractor: "Contractor", private: "Private Customer" };
  var serviceMap = {
    "commercial": "Commercial Electrical Installation", "domestic": "Domestic Electrical Work",
    "fire-install": "Fire Alarm Installation", "fire-maintenance": "Fire Alarm Maintenance",
    "eicr": "Electrical Inspection / EICR", "pat": "PAT Testing", "heating": "Electric Heating",
    "maintenance": "Commercial Maintenance Enquiry", "careers": "Careers / Recruitment"
  };
  if (typeMap[params.get("type")]) form.elements["customer_type"].value = typeMap[params.get("type")];
  if (serviceMap[params.get("service")]) form.elements["service"].value = serviceMap[params.get("service")];

  // Business details appear for commercial customer types
  var bizBlock = $("#business-details");
  var syncBiz = function () {
    var v = form.elements["customer_type"].value;
    if (bizBlock) bizBlock.hidden = !(v && v !== "Private Customer");
  };
  form.elements["customer_type"].addEventListener("change", syncBiz);
  syncBiz();

  // Validation rules
  var rules = [
    { name: "full_name", test: function (v) { return v.trim().length >= 2; }, msg: "Enter your full name" },
    { name: "email", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, msg: "Enter an email address in the format name@example.com" },
    { name: "phone", test: function (v) { return v.replace(/[^\d]/g, "").length >= 6; }, msg: "Enter a telephone number we can reach you on" },
    { name: "customer_type", test: function (v) { return !!v; }, msg: "Select the type of customer you are" },
    { name: "service", test: function (v) { return !!v; }, msg: "Select the service you need" },
    { name: "description", test: function (v) { return v.trim().length >= 10; }, msg: "Describe your requirements in a sentence or two" },
    { name: "privacy", test: function (v, el) { return el.checked; }, msg: "Confirm you have read the privacy notice" }
  ];

  var setError = function (el, msg) {
    var err = $("#" + el.id + "-error");
    if (msg) { el.setAttribute("aria-invalid", "true"); if (err) err.textContent = msg; }
    else { el.removeAttribute("aria-invalid"); if (err) err.textContent = ""; }
  };

  var validate = function () {
    var problems = [];
    rules.forEach(function (r) {
      var el = form.elements[r.name];
      var ok = r.test(el.value || "", el);
      setError(el, ok ? "" : r.msg);
      if (!ok) problems.push({ id: el.id, msg: r.msg });
    });
    return problems;
  };

  // Clear an error as soon as the field is corrected
  rules.forEach(function (r) {
    var el = form.elements[r.name];
    // Clear while typing (not on blur) so the layout never shifts under a click
    var ev = (el.type === "checkbox" || el.tagName === "SELECT") ? "change" : "input";
    el.addEventListener(ev, function () { if (el.getAttribute("aria-invalid") === "true" && r.test(el.value || "", el)) setError(el, ""); });
  });

  var showSummary = function (problems) {
    summary.innerHTML = '<h2 id="error-summary-title">Please check the form</h2><ul>' +
      problems.map(function (p) { return '<li><a href="#' + p.id + '">' + p.msg + "</a></li>"; }).join("") + "</ul>";
    summary.hidden = false;
    summary.focus();
  };

  var val = function (n) { var el = form.elements[n]; return el ? (el.value || "").trim() : ""; };
  var radio = function (n) { var r = form.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ""; };

  var buildText = function () {
    var lines = [
      "Name: " + val("full_name"),
      "Company: " + (val("company") || "-"),
      "Email: " + val("email"),
      "Telephone: " + val("phone"),
      "Customer type: " + val("customer_type"),
      "Service required: " + val("service"),
      "Property or project location: " + (val("location") || "-"),
      "Preferred contact method: " + (radio("contact_method") || "No preference")
    ];
    if (bizBlock && !bizBlock.hidden) {
      lines.push(
        "Property type: " + (val("property_type") || "-"),
        "Number of locations: " + (val("locations") || "-"),
        "Existing maintenance arrangement: " + (val("existing_arrangement") || "-")
      );
    }
    lines.push("", "Requirements:", val("description"));
    return lines.join("\n");
  };

  var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var showResult = function (kind, html) {
    resultBox.className = "form-result " + kind;
    resultBox.innerHTML = html;
    resultBox.hidden = false;
    resultBox.focus();
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    summary.hidden = true;
    resultBox.hidden = true;

    // Honeypot: real visitors never fill this
    if (val("website")) return;

    var problems = validate();
    if (problems.length) { showSummary(problems); return; }

    var subject = "Website enquiry: " + val("service") + " (" + val("full_name") + ")";
    var body = buildText();

    if (mode === "php") {
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending…";
      fetch(C.form.endpoint, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (data) {
          if (data && data.ok === true) {
            form.reset(); syncBiz();
            showResult("ok", "<h2>Enquiry sent</h2><p>Thank you. Your enquiry has been sent to our team. New business enquiries are handled Monday to Friday, 9am to 5pm.</p>");
          } else {
            showResult("bad", "<h2>Your enquiry wasn’t sent</h2><p>" + esc((data && data.message) || "Something went wrong on our side.") +
              ' Please call <a href="' + C.phoneHref + '">' + C.phoneDisplay + '</a> or email <a href="mailto:' + C.enquiryEmail + '">' + C.enquiryEmail + "</a>.</p>");
          }
        })
        .catch(function () {
          showResult("bad", '<h2>Your enquiry wasn’t sent</h2><p>We couldn’t reach the server. Please call <a href="' + C.phoneHref + '">' + C.phoneDisplay +
            '</a> or email <a href="mailto:' + C.enquiryEmail + '">' + C.enquiryEmail + "</a>.</p>");
        })
        .then(function () { btn.disabled = false; btn.textContent = "Send Enquiry"; });
      return;
    }

    // mailto mode: open the visitor's email app with the enquiry written out.
    var href = "mailto:" + C.enquiryEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = href;

    showResult("warn",
      "<h2>Your email app should now be open</h2>" +
      "<p>We’ve written your enquiry into a new email to <strong>" + esc(C.enquiryEmail) + "</strong>. " +
      "<strong>It isn’t sent until you press Send in your email app.</strong> You can attach photos or documents there too.</p>" +
      "<p>If no email opened, copy the enquiry below and email it to us, or call " +
      '<a href="' + C.phoneHref + '">' + C.phoneDisplay + "</a> (Monday to Friday, 9am to 5pm).</p>" +
      "<pre id=\"enquiry-copy\">" + esc("Subject: " + subject + "\n\n" + body) + "</pre>" +
      '<div class="btn-row" style="margin-top:0"><button type="button" class="btn btn-navy" id="copy-enquiry">Copy enquiry</button>' +
      '<a class="btn btn-outline" href="' + href.replace(/"/g, "&quot;") + '">Open email again</a></div>' +
      '<p class="form-note" id="copy-status" role="status" aria-live="polite"></p>'
    );

    var copyBtn = $("#copy-enquiry");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      var text = "Subject: " + subject + "\n\n" + body;
      var done = function () { $("#copy-status").textContent = "Enquiry copied. Paste it into an email to " + C.enquiryEmail + "."; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { $("#copy-status").textContent = "Select the text above and copy it."; });
      } else { $("#copy-status").textContent = "Select the text above and copy it."; }
    });
  });
})();
