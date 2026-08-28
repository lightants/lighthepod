(function () {
  "use strict";

  var STORAGE_KEY = "lighthePod.intakeRequests";

  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  var form = document.getElementById("intake-form");
  if (!form) return;

  var success = document.getElementById("intake-success");
  var summaryEl = document.getElementById("intake-summary");
  var errorEl = document.getElementById("intake-error");
  var copyBtn = document.getElementById("copy-summary");
  var againBtn = document.getElementById("send-another");

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function emailOk(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function loadAll() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function save(entry) {
    var all = loadAll();
    all.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function serviceLabel(v) {
    if (v === "podcast-editing") return "Podcast Editing";
    if (v === "video-editing") return "Video Editing";
    if (v === "audio-enhancement") return "Audio Enhancement";
    if (v === "shorts-clips") return "Shorts/Clips";
    if (v === "publishing") return "Publishing";
    return v;
  }

  function formatSummary(entry) {
    return [
      "LighthePod — brief",
      "Reference: " + entry.id,
      "When: " + entry.createdAt,
      "",
      "Show / project: " + entry.showName,
      "Service: " + serviceLabel(entry.service),
      "Format: " + entry.format,
      "Name: " + entry.name,
      "Email: " + entry.email,
      "",
      "Link / notes:",
      entry.notes || "(none)",
      "",
      "Hire path: https://www.upwork.com/freelancers/clydeantes ($20/hr)"
    ].join("\n");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (errorEl) errorEl.textContent = "";

    var entry = {
      id: "LP-" + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      showName: val("show-name"),
      service: val("service"),
      format: val("format"),
      notes: val("notes"),
      name: val("contact-name"),
      email: val("email")
    };

    if (!entry.name || !entry.email || !entry.showName || !entry.service || !entry.format) {
      if (errorEl) errorEl.textContent = "Please complete every required field.";
      return;
    }
    if (!emailOk(entry.email)) {
      if (errorEl) errorEl.textContent = "Enter a working email for your own copy.";
      return;
    }

    save(entry);

    var text = formatSummary(entry);
    if (summaryEl) summaryEl.textContent = text;
    form.classList.add("is-hidden");
    if (success) {
      success.classList.add("is-visible");
      success.focus();
    }
  });

  if (copyBtn && summaryEl) {
    copyBtn.addEventListener("click", function () {
      var text = summaryEl.textContent || "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = "Copied";
          setTimeout(function () {
            copyBtn.textContent = "Copy summary";
          }, 1600);
        });
      }
    });
  }

  if (againBtn) {
    againBtn.addEventListener("click", function () {
      form.reset();
      form.classList.remove("is-hidden");
      if (success) success.classList.remove("is-visible");
      if (errorEl) errorEl.textContent = "";
      var first = document.getElementById("contact-name");
      if (first) first.focus();
    });
  }
})();
