document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION (USER MUST FILL THESE) ---
    const childFullName = "Muhammad Zayan Alfarizqi"; // Ganti dengan nama anak
    const childDOB = "10 Januari 2025"; // Ganti dengan tanggal lahir anak
    const fatherName = "Rizky Abdullah"; // Ganti dengan nama ayah
    const motherName = "Sarah Amalia"; // Ganti dengan nama ibu
    const eventDate = "Minggu, 20 Februari 2025";
    const eventTime = "10:00";
    const venueName = "Kediaman Keluarga";
    const venueAddress = "Jl. Kebahagiaan No. 123, Kota Berkah";
    const mapsURL = "https://maps.app.goo.gl/example"; // Ganti dengan link Google Maps yang valid
    const rsvpWhatsAppNumber = "6281234567890"; // Ganti dengan nomor WA untuk RSVP/Doa (format internasional tanpa + atau 0)
    // --- END CONFIGURATION ---


    // --- Initial Content Population ---
    const childNameHeroEl = document.getElementById('child-name-hero');
    const parentsNamesEl = document.querySelector('.parents-names');
    const childNameMainEl = document.getElementById('child-name-main');
    const childDobEl = document.getElementById('child-dob');
    const eventDateEl = document.getElementById('event-date');
    const eventTimeEl = document.getElementById('event-time');
    const eventVenueEl = document.getElementById('event-venue');
    const eventAddressEl = document.getElementById('event-address');
    const mapsLinkEl = document.getElementById('maps-link');
    const doaViaWhatsAppLink = document.querySelector('.btn-whatsapp-doa');
    const footerNamesEl = document.querySelector('.footer-names');


    if (childNameHeroEl) childNameHeroEl.textContent = childFullName;
    if (parentsNamesEl) parentsNamesEl.innerHTML = `Putra dari Bapak ${fatherName} & Ibu ${motherName}`; // Ganti "Putra" jika putri
    if (childNameMainEl) childNameMainEl.textContent = childFullName;
    if (childDobEl) childDobEl.innerHTML = `Lahir pada: ${childDOB}`;
    if (eventDateEl) eventDateEl.textContent = eventDate;
    if (eventTimeEl) eventTimeEl.textContent = `Pukul: ${eventTime} WIB - Selesai`;
    if (eventVenueEl) eventVenueEl.textContent = venueName;
    if (eventAddressEl) eventAddressEl.textContent = venueAddress;
    if (mapsLinkEl) mapsLinkEl.href = mapsURL;
    if (footerNamesEl) footerNamesEl.textContent = `Keluarga Besar Bapak ${fatherName} & Ibu ${motherName}`;

    if (doaViaWhatsAppLink) {
        const defaultDoaText = encodeURIComponent(`Saya ingin mengucapkan selamat dan mengirimkan doa untuk acara syukuran Ananda ${childFullName}. Semoga Ananda menjadi anak yang sholeh/sholehah, berbakti kepada orang tua, dan membawa keberkahan bagi keluarga. Aamiin.`);
        doaViaWhatsAppLink.href = `https://wa.me/${rsvpWhatsAppNumber}?text=${defaultDoaText}`;
    }


    // --- Loader ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 300); // Short delay
    });

    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeElements.forEach(el => observer.observe(el));
    } else { // Fallback for older browsers
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // --- Guest Name from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameFromUrl = urlParams.get('to');
    const guestNameDisplayEl = document.getElementById('guest-name-display');

    if (guestNameDisplayEl) {
        if (guestNameFromUrl) {
            guestNameDisplayEl.textContent = `Yth. ${decodeURIComponent(guestNameFromUrl)}`;
        } else {
            guestNameDisplayEl.textContent = `Yth. Bapak/Ibu/Saudara/i`; // Default
        }
    }

    // --- WhatsApp Share ---
    const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener('click', () => {
            const guestToShare = guestNameFromUrl ? decodeURIComponent(guestNameFromUrl) : "Bapak/Ibu/Saudara/i";
            const message = `Assalamu'alaikum Wr. Wb.\n\nTanpa mengurangi rasa hormat, kami mengundang ${guestToShare} untuk menghadiri acara tasyakuran Aqiqah/Khitanan putra/putri kami, ${childFullName}.\n\nInformasi lengkap undangan dapat dilihat di:\n${window.location.href.split('?')[0]}\n\nMerupakan suatu kehormatan bagi kami apabila ${guestToShare} berkenan hadir.\nTerima kasih.\nWassalamu'alaikum Wr. Wb.`;
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- Footer Current Year ---
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Placeholder for Wish Form (if re-enabled) ---
    // const wishForm = document.getElementById('wish-form');
    // if (wishForm) {
    //     wishForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         alert('Terima kasih atas doa dan ucapannya! (Fitur ini memerlukan backend untuk penyimpanan)');
    //         wishForm.reset();
    //     });
    // }
});