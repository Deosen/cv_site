async function loadCVData(lang = 'pl') {
    const response = await fetch('data/data.json');
    const data = await response.json();
    const cvData = data[lang];

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    sidebar.innerHTML = `
       <div class="sidebar-section">
            <h4>${lang === 'pl' ? 'Język' : 'Language'}</h4>
            <div class="language-switch">
                <button id="lang-pl">Polski</button>
                <button id="lang-en">English</button>
            </div>
        </div>
        <div class="sidebar-section">
            <h4>${lang === 'pl' ? 'Wygląd' : 'Theme'}</h4>
            <div class="theme-switch">
                <button data-theme="theme-indigo">Indigo</button>
                <button data-theme="theme-emerald">Emerald</button>
                <button data-theme="theme-amber">Amber</button>
            </div>
        </div>
        <img src="${cvData.picture}" alt="Zdjęcie profilowe">
        <h3><i class="fas fa-address-card"></i> ${lang === 'pl' ? 'Dane personalne' : 'Personal data'}</h3>
        <div class="personal-data">
            <p><i class="fas fa-user"></i> <strong>${cvData.firstName} ${cvData.secoundName} ${cvData.surname}</strong></p>
            <p><i class="fas fa-envelope"></i> <a href="mailto:${cvData.email}">${cvData.email}</a></p>
            <p><i class="fas fa-phone"></i> <a href="tel:${cvData.mobile}">${cvData.mobile}</a></p>
        </div>
        <h3><i class="fas fa-link"></i> ${lang === 'pl' ? 'Linki' : 'Links'}</h3>
        <div class="social-links">
            <a href="${cvData.fb}" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-square"></i></a>
            <a href="${cvData.github}" target="_blank" aria-label="Github"><i class="fab fa-github"></i></a>
            <a href="${cvData.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
            <a href="${cvData.website}" target="_blank" aria-label="Website"><i class="fa fa-globe"></i></a>
        </div>
        <h3><i class="fas fa-code"></i> ${lang === 'pl' ? 'Umiejętności miękkie' : 'Soft Skills'}</h3>
        <ul>${cvData.softSkills.map(s => `<li>${s}</li>`).join('')}</ul>

        <h3><i class="fas fa-tools"></i> ${lang === 'pl' ? 'Umiejętności twarde' : 'Hard Skills'}</h3>
        <ul>${cvData.hardSkills.map(s => `<li>${s}</li>`).join('')}</ul>

        <h3><i class="fas fa-language"></i> ${lang === 'pl' ? 'Języki' : 'Languages'}</h3>
        <ul>${cvData.lang.map(l => `<li>${l.language} - ${l.level}</li>`).join('')}</ul>   
    `;

    mainContent.innerHTML = `
        <h1>Full Stack Developer</h1>
        <h2>${lang === 'pl' ? 'O mnie' : 'About me'}</h2>
        <p>${cvData.about}</p>
        <h2>${lang === 'pl' ? 'Doświadczenie Zawodowe' : 'Experience'}</h2>
        ${cvData.experience.map(job => `
            <h3>${job.company} - ${job.position}</h3>
            <p>${job.time}</p>
            <p>${job.description}</p>
        `).join('')}

        <h2>${lang === 'pl' ? 'Wykształcenie' : 'Education'}</h2>
        ${cvData.education.map(ed => `
            <h3>${ed.school}</h3>
            <p>${lang === 'pl' ? 'Kierunek' : 'Field of study'}: ${ed.fieldOfStudy ?? '-'}</p>
            <p>${ed.time}</p>
            ${ed.degree ? `<p>${lang === 'pl' ? 'Poziom wykształcenia' : 'Degree'}: ${ed.degree}</p>` : ''}
            ${ed.specialization ? `<p>${lang === 'pl' ? 'Specjalizacja' : 'Specialization'}: ${ed.specialization}</p>` : ''}
            ${ed.additional ? `<p>${lang === 'pl' ? 'Dodatkowe informacje' : 'Additional information'}: ${ed.additional}</p>` : ''}
        `).join('')}

        <h2>${lang === 'pl' ? 'Projekty / Aktywności dodatkowe' : 'Projects / Additional activities'}</h2>
        ${cvData.projects.map(p => `
            <h3>${p.name}</h3>
            ${p.time ? `<p>${p.time}${p.location ? ' / ' + p.location : ''}</p>` : ''}
            ${p.description ? `<p>${p.description}</p>` : ''}
        `).join('')}
    `;

    document.getElementById('lang-pl').addEventListener('click', () => loadCVData('pl'));
    document.getElementById('lang-en').addEventListener('click', () => loadCVData('en'));

    document.querySelectorAll('.theme-switch button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.className = btn.dataset.theme;
        });
    });
}

loadCVData('pl');
