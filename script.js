const CONTACT = {
  emailTo: "miriam@example.com",
  phoneE164: "+972500000000",
  phoneDisplay: "050-0000000",
  instagramUrl: "https://instagram.com/",
  mapsUrl: "https://maps.google.com/",
};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function buildMailtoUrl({ name, phone, message }) {
  const subject = "פנייה מהאתר — Miriam Rotenberg";
  const lines = [
    "היי מרים, אשמח לתיאום שיחה/פגישה לגבי פאה.",
    "",
    name ? `שם: ${name}` : null,
    phone ? `טלפון: ${phone}` : null,
    message ? `הודעה: ${message}` : null,
  ].filter(Boolean);

  const body = lines.join("\n");
  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:${CONTACT.emailTo}?${params.toString()}`;
}

function setupYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setupMobileNav() {
  const toggle = $(".nav-toggle");
  const nav = $(".nav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  $all(".nav a").forEach((a) => {
    a.addEventListener("click", () => closeNav());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

function setupLightbox() {
  const lightbox = $("#lightbox");
  if (!lightbox) return;
  const img = $(".lightbox-img", lightbox);
  const caption = $(".lightbox-caption", lightbox);
  const closeBtn = $(".lightbox-close", lightbox);

  function open({ src, alt, cap }) {
    if (!img) return;
    img.src = src;
    img.alt = alt || "";
    if (caption) caption.textContent = cap || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (img) img.src = "";
  }

  $all(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const full = btn.getAttribute("data-full");
      const image = $("img", btn);
      const cap = $(".gallery-caption", btn)?.textContent?.trim();
      if (!full || !image) return;
      open({ src: full, alt: image.alt, cap });
    });
  });

  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupContact() {
  const form = $("#contactForm");
  const callLink = $("#callLink");
  const emailQuick = $("#emailQuick");
  const igQuick = $("#instagramQuick");
  const mapsQuick = $("#mapsQuick");

  if (callLink) callLink.href = `tel:${CONTACT.phoneE164}`;

  if (emailQuick) {
    emailQuick.href = buildMailtoUrl({ name: "", phone: "", message: "" });
  }
  if (igQuick) {
    igQuick.href = CONTACT.instagramUrl;
    igQuick.target = "_blank";
  }
  if (mapsQuick) {
    mapsQuick.href = CONTACT.mapsUrl;
    mapsQuick.target = "_blank";
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const url = buildMailtoUrl({ name, phone, message });
    window.location.href = url;
  });
}

setupYear();
setupMobileNav();
setupLightbox();
setupContact();

