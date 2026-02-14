/* =========================
   Apartments Grbić — main.js
   - HR/EN language toggle (data-i18n)
   - Mobile nav toggle (accessible)
   - Reveal on scroll (IntersectionObserver)
   - Scroll progress bar
   - Contact form placeholder toast
========================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "ag_lang";
const langToggle = $("#langToggle");
const langLabel = $("#langLabel");

/* ---------- i18n dictionary (UPDATED to match your index.html) ---------- */
const dict = {
  hr: {
    nav_apartments: "Apartmani",
    nav_amenities: "Sadržaji",
    nav_gallery: "Galerija",
    nav_location: "Lokacija",
    nav_blog: "Blog",
    nav_faq: "FAQ",
    nav_contact: "Kontakt",

    hero_kicker: "Mlini • Dubrovnik",
    hero_title: "Najbolji odabir za ljetovanje",
    hero_lead: "Savršeno za parove, obitelji i sve koji žele čistu i mirnu bazu za istraživanje Dubrovnika",
    hero_cta_primary: "Provjeri dostupnost",
    hero_cta_secondary: "Pogledaj apartmane",

    apts_title: "Apartmani",
    apts_sub: "4 apartmana u Mlinima. Odaberi broj, pošalji upit i mi potvrđujemo dostupnost i cijenu.",
    badge_standard: "Standard",
    badge_view: "Balkon + pogled na more",

    apt1_title: "Apartman 1",
    apt1_desc: "Minimalno, čisto, praktično. Idealno kao baza za izlete.",

    apt2_title: "Apartman 2",
    apt2_desc: "Balkon s pogledom na more. Top vibe za ljeto.",

    apt3_title: "Apartman 3",
    apt3_desc: "Mirno, jednostavno, bez komplikacija.",

    apt4_title: "Apartman 4",
    apt4_desc: "Balkon s pogledom na more. Premium osjećaj bez pretjerivanja.",

    spec_parking: "Parking",
    spec_ac: "Klima",
    spec_wifi: "Wi-Fi",
    spec_balcony_view: "Balkon s pogledom na more",

    apt_cta: "Upit / rezervacija →",
    apts_note: "Cijena ovisi o datumu i broju noćenja. Pošalji upit i javimo Vam točnu ponudu.",

    amen_title: "Sadržaji",
    amen_sub: "Jednostavno, jasno i sve bitno za dobar boravak.",
    amen_wifi: "Besplatan Wi-Fi",
    amen_ac: "Klima uređaj",
    amen_parking: "Parking",
    amen_beach: "Blizu plaže",
    amen_quiet: "Mirna lokacija",
    amen_family: "Family friendly",
    amen_host: "Podrška domaćina",
    amen_balcony_note: "Balkon",

    rev_title: "Recenzije",
    rev_sub: "Iskustva gostiju i par kratkih dojmova.",

    rev_1_text: "Čisto, mirno i odlična lokacija. Sve jednostavno i bez stresa.",
    rev_1_name: "Jack",

    rev_2_text: "Balkon i pogled na more su top. Sve uredno i domaćin brz na odgovoru.",
    rev_2_name: "Ana",

    rev_3_text: "Parking je stvarno plus. Super baza za Dubrovnik i izlete.",
    rev_3_name: "Karlo",

    gal_title: "Galerija",

    loc_title: "Lokacija",
    loc_li1: "Dubrovnik: kratka vožnja / izlet",
    loc_li2: "Plaža: nekoliko minuta pješice",
    loc_li3: "Restorani i šetnica u blizini",
    loc_cta: "Pošalji upit",
    loc_sub: "Mirna lokacija izvan gužve, ali blizu svega.",
    loc_maps: "Google Maps",

    blog_title: "Blog",
    blog_sub: "Kratki vodiči i ideje za izlete oko Dubrovnika.",
    blog_1_title: "Izleti (Dubrovnik)",
    blog_1_desc: "Ideje za jednodnevne izlete.",
    blog_2_title: "Plaže (Mlini i okolica)",
    blog_2_desc: "Najljepša mjesta za kupanje i opuštanje.",
    blog_3_title: "Dolazak i parking",
    blog_3_desc: "Praktični savjeti za dolazak autom.",
    blog_read: "Pročitaj →",

    faq_title: "FAQ",
    faq_sub: "Najčešća pitanja prije dolaska:",
    faq_q1: "Koje je vrijeme check-in / check-out?",
    faq_a1: "Tipično check-in od 14:00, check-out do 10:00. Fleksibilno ako je moguće.",
    faq_q2: "Imate li parking?",
    faq_a2: "Da — parking je dostupan.",
    faq_q3: "Je li Wi-Fi uključen?",
    faq_a3: "Da — Wi-Fi je besplatan.",
    faq_q4: "Imaju li svi apartmani klimu?",
    faq_a4: "Da — svi apartmani imaju klima uređaj.",
    faq_q5: "Imaju li svi apartmani balkon?",
    faq_a5: "Balkon s pogledom na more imaju apartmani 2 i 4.",
    faq_q6: "Kako funkcionira rezervacija?",
    faq_a6: "Pošalješ upit s datumima i brojem osoba — mi potvrđujemo dostupnost i šaljemo ponudu.",

    contact_title: "Upit / Rezervacija",
    contact_sub: "Ispunite formu. Ostalo ostavite nama.",

    form_name: "Ime i prezime",
    form_email: "Email",
    form_checkin: "Dolazak",
    form_checkout: "Odlazak",
    form_guests: "Broj osoba",
    form_apartment: "Preferirani apartman",
    form_opt_1: "Apartman 1",
    form_opt_2: "Apartman 2",
    form_opt_3: "Apartman 3",
    form_opt_4: "Apartman 4",
    form_opt_any: "Svejedno",
    form_message: "Poruka (opcionalno)",
    form_submit: "Pošalji upit",

    contact_info_title: "Kontakt",
    contact_info_sub: "Možeš i direktno:",
    contact_phone: "Telefon",
    contact_email: "Email",
    contact_address: "Adresa",
    contact_address_val: "Mlini, Hrvatska",

    // IMPORTANT: you used contact_tbd on the phone anchor; keep the number here so JS doesn't overwrite it
    contact_tbd: "+385 98 96 000 88",

    contact_instagram: "Instagram",
    contact_tripadvisor: "Tripadvisor",
    contact_google: "Google Maps",
    contact_booking: "Booking",

    footer_tag: "Mlini • Dubrovnik",
    footer_privacy: "Privacy",
    footer_terms: "Terms",

    toast_ok: "Upit je zaprimljen (demo). Sljedeći korak: spajamo slanje ✅",
    toast_error: "Ups — provjeri obavezna polja."
  },

  en: {
    nav_apartments: "Apartments",
    nav_amenities: "Amenities",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_blog: "Blog",
    nav_faq: "FAQ",
    nav_contact: "Contact",

    hero_kicker: "Mlini • Dubrovnik",
    hero_title: "The best choice for your summer",
    hero_lead: "Perfect for couples, families, and anyone who wants a clean and quiet base to explore Dubrovnik",
    hero_cta_primary: "Check availability",
    hero_cta_secondary: "View apartments",

    apts_title: "Apartments",
    apts_sub: "4 apartments in Mlini. Choose a number, send an inquiry, and we’ll confirm availability and price.",
    badge_standard: "Standard",
    badge_view: "Balcony + sea view",

    apt1_title: "Apartment 1",
    apt1_desc: "Minimal, clean, practical. A great base for day trips.",

    apt2_title: "Apartment 2",
    apt2_desc: "Sea-view balcony. Perfect summer vibe.",

    apt3_title: "Apartment 3",
    apt3_desc: "Quiet, simple, no fuss.",

    apt4_title: "Apartment 4",
    apt4_desc: "Sea-view balcony. Premium feel without overdoing it.",

    spec_parking: "Parking",
    spec_ac: "Air conditioning",
    spec_wifi: "Wi-Fi",
    spec_balcony_view: "Balcony + sea view",

    apt_cta: "Inquiry / booking →",
    apts_note: "Prices depend on dates and length of stay. Send an inquiry and we’ll get back with an exact offer.",

    amen_title: "Amenities",
    amen_sub: "Simple and clear and everything you need for a great stay.",
    amen_wifi: "Free Wi-Fi",
    amen_ac: "Air conditioning",
    amen_parking: "Parking",
    amen_beach: "Near the beach",
    amen_quiet: "Quiet area",
    amen_family: "Family-friendly",
    amen_host: "Host support",
    amen_balcony_note: "Balcony",

    rev_title: "Reviews",
    rev_sub: "Guest experiences and a few short impressions.",

    rev_1_text: "Clean, quiet, and a great location. Everything simple and stress-free.",
    rev_1_name: "Jack",

    rev_2_text: "The balcony and sea view are amazing. Everything was tidy and the host responded quickly.",
    rev_2_name: "Ana",

    rev_3_text: "Parking is a big plus. A great base for Dubrovnik and day trips.",
    rev_3_name: "Karlo",

    gal_title: "Gallery",

    loc_title: "Location",
    loc_li1: "Dubrovnik: a short ride / day trip",
    loc_li2: "Beach: a few minutes on foot",
    loc_li3: "Restaurants and promenade nearby",
    loc_cta: "Send inquiry",
    loc_sub: "A peaceful location away from crowds, yet close to everything.",
    loc_maps: "Google Maps",

    blog_title: "Blog",
    blog_sub: "Short guides and ideas for trips around Dubrovnik.",
    blog_1_title: "Trips (Dubrovnik)",
    blog_1_desc: "Easy one-day trip ideas.",
    blog_2_title: "Beaches (Mlini & nearby)",
    blog_2_desc: "The best spots for swimming and chilling.",
    blog_3_title: "Arrival & parking",
    blog_3_desc: "Practical tips if you drive.",
    blog_read: "Read →",

    faq_title: "FAQ",
    faq_sub: "Most common questions before arrival:",
    faq_q1: "What are check-in / check-out times?",
    faq_a1: "Typically check-in from 14:00 and check-out until 10:00. Flexible when possible.",
    faq_q2: "Do you have parking?",
    faq_a2: "Yes — parking is available.",
    faq_q3: "Is Wi-Fi included?",
    faq_a3: "Yes — Wi-Fi is free.",
    faq_q4: "Do all apartments have A/C?",
    faq_a4: "Yes — all apartments have air conditioning.",
    faq_q5: "Do all apartments have a balcony?",
    faq_a5: "Sea-view balconies are available in Apartments 2 and 4.",
    faq_q6: "How does booking work?",
    faq_a6: "Send an inquiry with dates and number of guests — we’ll confirm availability and send an offer.",

    contact_title: "Inquiry / Booking",
    contact_sub: "Fill in the form. Leave the rest to us.",

    form_name: "Full name",
    form_email: "Email",
    form_checkin: "Check-in",
    form_checkout: "Check-out",
    form_guests: "Guests",
    form_apartment: "Preferred apartment",
    form_opt_1: "Apartment 1",
    form_opt_2: "Apartment 2",
    form_opt_3: "Apartment 3",
    form_opt_4: "Apartment 4",
    form_opt_any: "Any",
    form_message: "Message (optional)",
    form_submit: "Send inquiry",

    contact_info_title: "Contact",
    contact_info_sub: "Or reach us directly:",
    contact_phone: "Phone",
    contact_email: "Email",
    contact_address: "Address",
    contact_address_val: "Mlini, Croatia",

    // Keep phone number as-is (because your HTML uses this key on the phone element)
    contact_tbd: "+385 98 96 000 88",

    contact_instagram: "Instagram",
    contact_tripadvisor: "Tripadvisor",
    contact_google: "Google Maps",
    contact_booking: "Booking",

    footer_tag: "Mlini • Dubrovnik",
    footer_privacy: "Privacy",
    footer_terms: "Terms",

    toast_ok: "Inquiry received (demo). Next step: we’ll connect sending ✅",
    toast_error: "Oops — please fill required fields."
  }
};

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return (saved === "en" || saved === "hr") ? saved : "hr";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = dict?.[lang]?.[key];
    if (typeof value === "string") el.textContent = value;
  });

  document.documentElement.lang = lang;
}

/* ---------- Reveal animations ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = $(".nav__toggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$(".nav__link", menu).forEach(link => link.addEventListener("click", close));

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Scroll progress ---------- */
function initScrollProgress() {
  const bar = $(".scroll-progress");
  if (!bar) return;

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Contact form placeholder ---------- */
function initForm() {
  const form = $("#bookingForm");
  const toast = $("#toast");
  if (!form || !toast) return;

  function showToast(msg) {
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.style.display = "none";
    }, 3600);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const required = ["name", "email", "checkin", "checkout", "guests", "apartment"];
    const ok = required.every(k => String(fd.get(k) || "").trim().length > 0);

    if (!ok) {
      showToast(dict[getLang()].toast_error);
      return;
    }

    showToast(dict[getLang()].toast_ok);
    form.reset();
  });
}

/* ---------- Init ---------- */
setLang(getLang());

langToggle?.addEventListener("click", () => {
  const next = getLang() === "hr" ? "en" : "hr";
  setLang(next);
});

initReveal();
initNav();
initScrollProgress();
initForm();

function initStars() {
  document.querySelectorAll(".review[data-rating]").forEach(card => {
    const rating = parseFloat(card.dataset.rating || "0");
    const stars = card.querySelector(".stars");
    if (!stars) return;

    stars.style.setProperty("--rating", rating);
  });
}

initStars();

/* ===== Gallery Lightbox ===== */
function initGallery(){
  const lightbox = document.getElementById("lightbox");
  const imgPreview = lightbox?.querySelector("img");

  document.querySelectorAll(".gallery__item").forEach(img => {
    img.addEventListener("click", () => {
      if(!lightbox) return;
      imgPreview.src = img.src;
      lightbox.classList.add("active");
    });
  });

  lightbox?.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

initGallery();
