/* =========================
   Apartments Grbić — main.js (CLEAN + STABLE)
   - HR/EN language toggle (data-i18n)
   - Works on index + subpages (blog/privacy/terms)
   - Mobile nav toggle (accessible)
   - Reveal on scroll (IntersectionObserver)
   - Scroll progress bar
   - Contact form placeholder toast
   - Reviews stars
   - Gallery lightbox
========================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "ag_lang";
const langToggle = $("#langToggle");
const langLabel = $("#langLabel");

/* ---------- i18n dictionary ---------- */
const dict = {
  hr: {
    // NAV (index)
    nav_apartments: "Apartmani",
    nav_amenities: "O nama",
    nav_gallery: "Galerija",
    nav_location: "Lokacija",
    nav_blog: "Blog",
    nav_contact: "Kontakt",

    // HERO (index)
    hero_kicker: "Mlini • Dubrovnik",
    hero_title: "Najbolji odabir za ljetovanje",
    hero_lead:
      "Savršeno za parove i obitelji koji žele mirnu bazu za istraživanje Dubrovnika.<br>Ljetni termini se brzo popunjavaju. Pošaljite upit na vrijeme.",
    hero_cta_primary: "Provjeri dostupnost",
    hero_cta_secondary: "Pogledaj apartmane",
    hero_guests: "👥 4000+ zadovoljnih gostiju",

    // APARTMENTS (index)
    apts_title: "Apartmani",
    badge_standard: "Standard",
    badge_view: "Balkon + pogled na more",

    apt1_title: "Apartman 1",
    apt1_desc:
      "Jednostavan, uredan i funkcionalan apartman. Savršen kao mirna baza za istraživanje Dubrovnika i okolice.",

    apt2_title: "Apartman 2",
    apt2_desc:
      "Moderan i udoban apartman s balkonom i pogledom na more. Idealan za opuštene ljetne dane i večeri.",

    apt3_title: "Apartman 3",
    apt3_desc:
      "Miran, jednostavan i praktičan prostor. Odličan izbor za goste koji traže privatnost i opušten boravak.",

    apt4_title: "Apartman 4",
    apt4_desc:
      "Prostran i svijetao apartman s balkonom i pogledom na more. Za goste koji žele dodatnu udobnost i poseban doživljaj.",

    spec_parking: "Parking",
    spec_ac: "Klima",
    spec_wifi: "Wi-Fi",
    spec_balcony_view: "Balkon s pogledom na more",

    apt_cta: "Upit / rezervacija →",
    apts_note: "* Cijena ovisi o datumu i broju noćenja. Pošalji upit i javimo Vam točnu ponudu.",

    // ABOUT (index)
    about_title: "Vaš domaćin",
    about_text:
      "Ana Grbić je domaćin s više od 20 godina iskustva u iznajmljivanju i preko 4000 zadovoljnih gostiju. Kao majka troje djece, posebnu pažnju posvećuje čistoći, sigurnosti i ugodnom boravku. Tu je za preporuke, pomoć i sve što Vam treba tijekom odmora.",
    about_cta: "Pošalji upit",
    about_cta_2: "Pogledaj recenzije",

    // AMENITIES (index)
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

    // REVIEWS (index)
    rev_title: "Recenzije",
    rev_sub: "Iskustva gostiju i par kratkih dojmova.",
    rev_1_text: "Čisto, mirno i odlična lokacija. Sve jednostavno i bez stresa.",
    rev_1_name: "Jack",
    rev_2_text: "Balkon i pogled na more su top. Sve uredno i domaćin brz na odgovoru.",
    rev_2_name: "Ana",
    rev_3_text: "Parking je stvarno plus. Super baza za Dubrovnik i izlete.",
    rev_3_name: "Karlo",

    // GALLERY (index)
    gal_title: "Galerija",

    // LOCATION (index)
    loc_title: "Lokacija",
    loc_sub: "Mirna lokacija izvan gužve, ali blizu svega.",
    loc_li1: "Dubrovnik: kratka vožnja od 10 minuta",
    loc_li2: "Uber do Dubrovnika (max 20€)",
    loc_li3: "Autobusna karta u jednom smjeru (3€)",
    loc_li4: "Plaža: nekoliko minuta pješice",
    loc_li5: "Restorani i šetnica u blizini",
    loc_cta: "Pošalji upit",
    loc_maps: "Google Maps",

    // BLOG TEASER (index)
    blog_title: "Blog",
    blog_sub: "Kratki vodiči i ideje za izlete oko Dubrovnika.",
    blog_1_title: "Izleti (Dubrovnik)",
    blog_1_desc: "Ideje za jednodnevne izlete.",
    blog_2_title: "Plaže (Mlini i okolica)",
    blog_2_desc: "Najljepša mjesta za kupanje i opuštanje.",
    blog_3_title: "Dolazak i parking",
    blog_3_desc: "Praktični savjeti za dolazak autom.",
    blog_read: "Pročitaj →",

    // FAQ (index)
    faq_title: "FAQ",
    faq_sub: "Najčešća pitanja prije dolaska:",
    faq_q1: "Koje je vrijeme check-in / check-out?",
    faq_a1: "Tipično check-in od 14:00, check-out do 10:00. Fleksibilno ako je moguće.",
    faq_q2: "Imate li parking?",
    faq_a2: "Da, parking je dostupan.",
    faq_q3: "Je li Wi-Fi uključen?",
    faq_a3: "Da, Wi-Fi je besplatan.",
    faq_q4: "Imaju li svi apartmani klimu?",
    faq_a4: "Da, svi apartmani imaju klima uređaj.",
    faq_q5: "Imaju li svi apartmani balkon?",
    faq_a5: "Balkon s pogledom na more imaju apartmani 2 i 4.",
    faq_q6: "Kako funkcionira rezervacija?",
    faq_a6: "Pošalješ upit s datumima i brojem osoba, a mi potvrđujemo dostupnost i šaljemo ponudu.",

    // CONTACT (index)
    contact_title: "Upit / Rezervacija",
    contact_sub: "Ispunite formu i ostalo ostavite nama.",
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
    contact_tbd: "+385 98 96 000 88",

    contact_instagram: "Instagram",
    contact_tripadvisor: "Tripadvisor",
    contact_google: "Google Maps",
    contact_booking: "Booking",

    footer_tag: "Mlini • Dubrovnik",
    footer_privacy: "Privacy",
    footer_terms: "Terms",

    toast_ok: "Upit je zaprimljen (demo). Sljedeći korak: spajamo slanje ✅",
    toast_error: "Ups — provjeri obavezna polja.",

    // SUBPAGES (blog/privacy/terms)
    page_back: "← Natrag",
    blog_page_h1: "Blog",
    privacy_h1: "Pravila privatnosti",
    privacy_sub:
      "Ova pravila objašnjavaju kako obrađujemo osobne podatke kada koristite našu web stranicu i šaljete upite.",
    terms_h1: "Uvjeti korištenja",
    terms_sub: "Korištenjem ove web stranice prihvaćate sljedeće uvjete korištenja."
  },

  en: {
    // NAV (index)
    nav_apartments: "Apartments",
    nav_amenities: "About Us",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_blog: "Blog",
    nav_contact: "Contact",

    // HERO (index)
    hero_kicker: "Mlini • Dubrovnik",
    hero_title: "The best choice for your summer",
    hero_lead:
      "Perfect for couples and families looking for a peaceful base near Dubrovnik.<br>Summer dates fill up quickly. Check availability early.",
    hero_cta_primary: "Check availability",
    hero_cta_secondary: "View apartments",
    hero_guests: "👥 4000+ satisfied guests",

    // APARTMENTS (index)
    apts_title: "Apartments",
    badge_standard: "Standard",
    badge_view: "Balcony + sea view",

    apt1_title: "Apartment 1",
    apt1_desc:
      "Simple, clean, and functional. A peaceful base for exploring Dubrovnik and the surrounding area.",

    apt2_title: "Apartment 2",
    apt2_desc:
      "Modern and comfortable, with a balcony and sea view. Perfect for relaxed summer days and evenings.",

    apt3_title: "Apartment 3",
    apt3_desc:
      "Quiet, simple, and practical. Great choice for guests seeking privacy and a relaxing stay.",

    apt4_title: "Apartment 4",
    apt4_desc:
      "Spacious and bright, with a balcony and sea view. Ideal for guests looking for extra comfort and a special stay.",

    spec_parking: "Parking",
    spec_ac: "Air conditioning",
    spec_wifi: "Wi-Fi",
    spec_balcony_view: "Balcony + sea view",

    apt_cta: "Inquiry / booking →",
    apts_note: "* Prices depend on dates and length of stay. Send an inquiry and we’ll get back with an exact offer.",

    // ABOUT (index)
    about_title: "Your host",
    about_text:
      "Ana Grbić has over 20 years of experience hosting and more than 4000 satisfied guests. As a mother of three, she focuses on cleanliness, safety, and a comfortable stay. She is always available for recommendations, help, and anything you may need during your holiday.",
    about_cta: "Send inquiry",
    about_cta_2: "View reviews",

    // AMENITIES (index)
    amen_title: "Amenities",
    amen_sub: "Simple and clear — everything you need for a great stay.",
    amen_wifi: "Free Wi-Fi",
    amen_ac: "Air conditioning",
    amen_parking: "Parking",
    amen_beach: "Near the beach",
    amen_quiet: "Quiet area",
    amen_family: "Family-friendly",
    amen_host: "Host support",
    amen_balcony_note: "Balcony",

    // REVIEWS (index)
    rev_title: "Reviews",
    rev_sub: "Guest experiences and a few short impressions.",
    rev_1_text: "Clean, quiet, and a great location. Everything simple and stress-free.",
    rev_1_name: "Jack",
    rev_2_text: "The balcony and sea view are amazing. Everything was tidy and the host responded quickly.",
    rev_2_name: "Ana",
    rev_3_text: "Parking is a big plus. A great base for Dubrovnik and day trips.",
    rev_3_name: "Karlo",

    // GALLERY (index)
    gal_title: "Gallery",

    // LOCATION (index)
    loc_title: "Location",
    loc_sub: "A peaceful location away from crowds, yet close to everything.",
    loc_li1: "Dubrovnik: a short 10-minute drive",
    loc_li2: "Uber to Dubrovnik (max €20)",
    loc_li3: "One-way bus ticket (€3)",
    loc_li4: "Beach: a few minutes on foot",
    loc_li5: "Restaurants and promenade nearby",
    loc_cta: "Send inquiry",
    loc_maps: "Google Maps",

    // BLOG TEASER (index)
    blog_title: "Blog",
    blog_sub: "Short guides and ideas for trips around Dubrovnik.",
    blog_1_title: "Trips (Dubrovnik)",
    blog_1_desc: "Easy one-day trip ideas.",
    blog_2_title: "Beaches (Mlini & nearby)",
    blog_2_desc: "The best spots for swimming and chilling.",
    blog_3_title: "Arrival & parking",
    blog_3_desc: "Practical tips if you drive.",
    blog_read: "Read →",

    // FAQ (index)
    faq_title: "FAQ",
    faq_sub: "Most common questions before arrival:",
    faq_q1: "What are check-in / check-out times?",
    faq_a1: "Typically check-in from 14:00 and check-out until 10:00. Flexible when possible.",
    faq_q2: "Do you have parking?",
    faq_a2: "Yes, parking is available.",
    faq_q3: "Is Wi-Fi included?",
    faq_a3: "Yes, Wi-Fi is free.",
    faq_q4: "Do all apartments have A/C?",
    faq_a4: "Yes, all apartments have air conditioning.",
    faq_q5: "Do all apartments have a balcony?",
    faq_a5: "Sea-view balconies are available in Apartments 2 and 4.",
    faq_q6: "How does booking work?",
    faq_a6: "Send an inquiry with dates and number of guests and we’ll confirm availability and send an offer.",

    // CONTACT (index)
    contact_title: "Inquiry / Booking",
    contact_sub: "Fill in the form and leave the rest to us.",
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
    contact_tbd: "+385 98 96 000 88",

    contact_instagram: "Instagram",
    contact_tripadvisor: "Tripadvisor",
    contact_google: "Google Maps",
    contact_booking: "Booking",

    footer_tag: "Mlini • Dubrovnik",
    footer_privacy: "Privacy",
    footer_terms: "Terms",

    toast_ok: "Inquiry received (demo). Next step: we’ll connect sending ✅",
    toast_error: "Oops — please fill required fields.",

    // SUBPAGES
    page_back: "← Back",
    blog_page_h1: "Blog",
    privacy_h1: "Privacy Policy",
    privacy_sub: "This policy explains how we process personal data when you use our website and send inquiries.",
    terms_h1: "Terms of Use",
    terms_sub: "By using this website, you agree to the following terms.",

    // SUBPAGES — FULL HTML BODIES (EN)
    blog_card1: `
      <h3 class="h3">Top 7 day trips around Dubrovnik</h3>
      <p class="muted">
        Dubrovnik is one of the most famous destinations in the world, but the surrounding area offers many hidden gems.
        If you stay in Mlini, you have a perfect, peaceful base to explore without stress.
      </p>
      <ul class="spec">
        <li><strong>Dubrovnik Old Town</strong> — city walls, restaurants, and a unique atmosphere.</li>
        <li><strong>Lokrum</strong> — nature, peace, and swimming (about 10 minutes by boat).</li>
        <li><strong>Cavtat</strong> — a romantic seaside town, perfect for an evening walk.</li>
        <li><strong>Elafiti Islands</strong> — a relaxed boat trip with crystal-clear sea.</li>
        <li><strong>Konavle</strong> — nature, wine, and authentic villages.</li>
        <li><strong>Pelješac</strong> — famous for wine and fresh seafood.</li>
        <li><strong>Mostar</strong> — a popular full-day trip option.</li>
      </ul>
      <p class="muted">
        As hosts, we’re happy to recommend trips based on your interests — family-friendly, active, romantic, or foodie-style.
      </p>
    `,
    blog_card2: `
      <h3 class="h3">Beaches in Mlini and nearby</h3>
      <p class="muted">
        Mlini is known for calm, clean beaches — a great alternative to the bigger crowds in Dubrovnik.
        Perfect for families, couples, and anyone looking for a relaxed holiday.
      </p>
      <ul class="spec">
        <li><strong>Mlini Beach</strong> — main beach with restaurants and natural shade.</li>
        <li><strong>Srebreno Beach</strong> — well-kept pebble beach, great for kids.</li>
        <li><strong>Kupari</strong> — a unique historic area with beautiful sea views.</li>
        <li><strong>Cavtat</strong> — lovely coves and a romantic atmosphere.</li>
      </ul>
      <p class="muted">
        Most beaches are just a few minutes on foot from the apartments — easy and stress-free.
      </p>
    `,
    blog_card3: `
      <h3 class="h3">How to arrive & where to park</h3>
      <p class="muted">
        Mlini is located between Dubrovnik and Cavtat, about 15 minutes from Dubrovnik Airport.
        It’s ideal because you avoid city traffic while staying close to everything.
      </p>
      <ul class="spec">
        <li><strong>By plane</strong> — Dubrovnik Airport is about a 15-minute drive.</li>
        <li><strong>By car</strong> — easy access without city congestion.</li>
        <li><strong>Uber & taxi</strong> — fast and practical to Dubrovnik.</li>
        <li><strong>Bus</strong> — regular line to Dubrovnik and Cavtat.</li>
      </ul>
      <p class="muted">
        Guest parking is available — a big advantage since parking in Dubrovnik can be difficult.
      </p>
    `,
    privacy_body: `
      <h2 class="h3">1) Who processes the data</h2>
      <p class="muted">
        Data controller: <strong>Apartments Grbić (Ana Grbić)</strong><br>
        Location: Mlini, Croatia<br>
        Email: <strong>apt.grbic.mlini@gmail.com</strong><br>
        Phone: <strong>+385 98 96 000 88</strong>
      </p>

      <h2 class="h3" style="margin-top:16px;">2) What data we collect</h2>
      <p class="muted">We only collect what’s necessary to reply and organize your stay:</p>
      <ul class="spec spec--big">
        <li>full name</li>
        <li>email address</li>
        <li>dates, number of guests, preferred apartment</li>
        <li>message (optional)</li>
      </ul>

      <h2 class="h3" style="margin-top:16px;">3) Contact form</h2>
      <p class="muted">
        The contact form is currently in demo mode (it does not send data automatically).
        If we enable it later, data will be used only to reply and arrange the booking.
      </p>

      <h2 class="h3" style="margin-top:16px;">4) Purpose & legal basis</h2>
      <ul class="spec spec--big">
        <li><strong>Replying to inquiries / booking:</strong> actions at your request and/or legitimate interest.</li>
        <li><strong>Website functionality:</strong> legitimate interest (security and maintenance).</li>
      </ul>

      <h2 class="h3" style="margin-top:16px;">5) Analytics & marketing tools</h2>
      <p class="muted">
        We currently do not use Google Analytics, Meta Pixel, or similar tools.
        If introduced in the future, this policy will be updated.
      </p>

      <h2 class="h3" style="margin-top:16px;">6) Cookies</h2>
      <p class="muted">
        This site may use only essential cookies set by your browser or hosting for basic functionality.
      </p>

      <h2 class="h3" style="margin-top:16px;">7) Sharing data</h2>
      <p class="muted">
        We do not sell your data and do not share it with third parties unless necessary to respond
        or required by law.
      </p>

      <h2 class="h3" style="margin-top:16px;">8) Retention</h2>
      <p class="muted">
        We keep data as long as needed for communication and organizing your stay, plus a reasonable period for records.
      </p>

      <h2 class="h3" style="margin-top:16px;">9) Your rights</h2>
      <p class="muted">
        You may request access, correction, deletion, restriction, or object to processing.
        Contact <strong>apt.grbic.mlini@gmail.com</strong>.
      </p>

      <h2 class="h3" style="margin-top:16px;">10) Contact</h2>
      <p class="muted">
        For privacy questions email <strong>apt.grbic.mlini@gmail.com</strong>.
      </p>

      <p class="tiny muted" style="margin-top:16px;">
        Last updated: <strong>15.02.2026.</strong>
      </p>
    `,
    terms_body: `
      <h2 class="h3">1) General</h2>
      <p class="muted">
        This website provides information about <strong>Apartments Grbić</strong> (Mlini, Croatia).
        We try to keep information accurate, but changes may occur without notice.
      </p>

      <h2 class="h3" style="margin-top:16px;">2) Inquiries & bookings</h2>
      <p class="muted">
        Sending an inquiry does not automatically confirm a booking.
        A booking is valid only after availability is confirmed and agreed with the host.
      </p>

      <h2 class="h3" style="margin-top:16px;">3) Photos & content</h2>
      <p class="muted">
        Photos and descriptions are informational. Small differences may occur due to season, lighting, renovations, etc.
      </p>

      <h2 class="h3" style="margin-top:16px;">4) External links</h2>
      <p class="muted">
        The site may include links to external services (Google Maps, Booking, Tripadvisor, Instagram).
        We are not responsible for their content or privacy policies.
      </p>

      <h2 class="h3" style="margin-top:16px;">5) Intellectual property</h2>
      <p class="muted">
        Content (texts, design, logo, photos) is protected. Copying without permission is not allowed
        except for personal, non-commercial use.
      </p>

      <h2 class="h3" style="margin-top:16px;">6) Limitation of liability</h2>
      <p class="muted">
        We are not liable for damages arising from using or being unable to use the site
        (outages, errors, technical issues). Use at your own risk.
      </p>

      <h2 class="h3" style="margin-top:16px;">7) Changes</h2>
      <p class="muted">
        We may update these terms. The updated version will be published on this page.
      </p>

      <h2 class="h3" style="margin-top:16px;">8) Contact</h2>
      <p class="muted">
        Apartments Grbić (Ana Grbić)<br>
        Email: <strong>apt.grbic.mlini@gmail.com</strong><br>
        Phone: <strong>+385 98 96 000 88</strong>
      </p>

      <p class="tiny muted" style="margin-top:16px;">
        Last updated: <strong>15.02.2026.</strong>
      </p>
    `
  }
};

/* ---------- Cache ORIGINAL HR HTML for “big blocks” so HR always restores correctly ---------- */
const originalHTML = {};
function cacheOriginalHTML(keys) {
  keys.forEach((key) => {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el && typeof originalHTML[key] !== "string") {
      originalHTML[key] = el.innerHTML;
    }
  });
}
// Blog cards + privacy/terms bodies (HR lives in HTML)
cacheOriginalHTML(["blog_card1", "blog_card2", "blog_card3", "privacy_body", "terms_body"]);

/* ---------- Language helpers ---------- */
function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return saved === "en" || saved === "hr" ? saved : "en";
}

function applyValue(el, value) {
  if (typeof value !== "string") return;

  // We allow HTML translations (blog cards / long bodies)
  if (value.includes("<")) el.innerHTML = value;
  else el.textContent = value;
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  if (langLabel) langLabel.textContent = lang.toUpperCase();
  document.documentElement.lang = lang;

  // 1) Apply normal i18n keys
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = dict?.[lang]?.[key];

    // For HR on large blocks, we restore original HTML instead of dict.hr
    if (lang === "hr" && originalHTML[key]) {
      el.innerHTML = originalHTML[key];
      return;
    }

    // For EN on large blocks, use dict.en html
    if (lang === "en" && typeof value === "string") {
      applyValue(el, value);
      return;
    }

    // For regular keys (both hr/en)
    if (typeof value === "string") {
      applyValue(el, value);
      return;
    }

    // If missing key: do nothing (keeps whatever is in HTML)
  });
}

/* ---------- Reveal animations ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
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

  $$(".nav__link", menu).forEach((link) => link.addEventListener("click", close));

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
    const ok = required.every((k) => String(fd.get(k) || "").trim().length > 0);

    if (!ok) {
      showToast(dict[getLang()].toast_error);
      return;
    }

    showToast(dict[getLang()].toast_ok);
    form.reset();
  });
}

/* ---------- Reviews stars ---------- */
function initStars() {
  document.querySelectorAll(".review[data-rating]").forEach((card) => {
    const rating = parseFloat(card.dataset.rating || "0");
    const stars = card.querySelector(".stars");
    if (!stars) return;
    stars.style.setProperty("--rating", rating);
  });
}

/* ---------- Gallery lightbox ---------- */
function initGallery() {
  const lightbox = document.getElementById("lightbox");
  const imgPreview = lightbox?.querySelector("img");
  if (!lightbox || !imgPreview) return;

  document.querySelectorAll(".gallery__item").forEach((img) => {
    img.addEventListener("click", () => {
      imgPreview.src = img.src;
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  document.querySelectorAll(".thumbCarousel__img").forEach((img) => {
  img.addEventListener("click", () => {
    imgPreview.src = img.src;
    lightbox.classList.add("active");
  });
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
initStars();
initGallery();

function initThumbCarousels(){
  const carousels = document.querySelectorAll(".thumbCarousel");
  if (!carousels.length) return;

  carousels.forEach((c) => {
    const track = c.querySelector(".thumbCarousel__track");
    const imgs = [...c.querySelectorAll(".thumbCarousel__img")];
    const prev = c.querySelector(".thumbCarousel__btn--prev");
    const next = c.querySelector(".thumbCarousel__btn--next");
    const dotsWrap = c.querySelector(".thumbCarousel__dots");

    if (!track || imgs.length === 0) return;

    // build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = imgs.map((_, i) =>
        `<span class="thumbCarousel__dot ${i === 0 ? "is-active" : ""}"></span>`
      ).join("");
    }
    const dots = dotsWrap ? [...dotsWrap.querySelectorAll(".thumbCarousel__dot")] : [];

    const slideTo = (index) => {
      const w = track.clientWidth;
      track.scrollTo({ left: w * index, behavior: "smooth" });
    };

    const getIndex = () => {
      const w = track.clientWidth || 1;
      return Math.round(track.scrollLeft / w);
    };

    window.addEventListener("resize", () => {
      // keep the current slide aligned after resize
      slideTo(getIndex());
    }, { passive: true });


    const setActiveDot = () => {
      const i = Math.max(0, Math.min(imgs.length - 1, getIndex()));
      dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
      if (prev) prev.disabled = (i === 0);
      if (next) next.disabled = (i === imgs.length - 1);
    };

    prev?.addEventListener("click", () => slideTo(Math.max(0, getIndex() - 1)));
    next?.addEventListener("click", () => slideTo(Math.min(imgs.length - 1, getIndex() + 1)));

    // keyboard support on focused track
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") slideTo(Math.max(0, getIndex() - 1));
      if (e.key === "ArrowRight") slideTo(Math.min(imgs.length - 1, getIndex() + 1));
    });

    // keep dots in sync while scrolling/swiping
    let raf = null;
    track.addEventListener("scroll", () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setActiveDot);
    }, { passive: true });

    // initial state
    setActiveDot();
  });
}

window.addEventListener("load", initThumbCarousels);
