// Funkcja do załadowania danych z pliku JSON
async function loadCVData(lang = 'pl') {
    const response = await fetch('/data/data.json');
    const data = await response.json();
    const cvData = data[lang];


    if (lang === "pl") {
        // Pasek boczny
        console.log("pl");
        document.getElementById('sidebar').innerHTML = `
            <img src="${cvData.picture}" alt="Zdjęcie profilowe" style="width:100%; border-radius: 2.5%;  
            margin-bottom: 5px;">
            <p>${cvData.firstName}</p>
            <p>${cvData.secoundName}</p>
            <p>${cvData.surname}</p>
            <p>Adres e-mail: <a href="mailto:${cvData.email}">${cvData.email}</a></p>
            <p>Telefon: <a href="tel:${cvData.mobile}">${cvData.mobile}</a></p>
            <h3>Umiejętności miękkie</h3>
            <ul>${cvData.softSkills.map(softSkills => `<li>${softSkills}</li>`).join('')}</ul>
            <h3>Umiejętności twarde</h3>
            <ul>${cvData.hardSkills.map(hardSkills => `<li>${hardSkills}</li>`).join('')}</ul>
            <h3>Języki</h3>
            <ul>${cvData.lang.map(l => `<li>${l.language} - ${l.level}</li>`).join('')}</ul>
        `;

        // Główna sekcja
        document.getElementById('main-content').innerHTML = `
            <div class="language-switch">
                <button id="lang-pl">Polski</button>
                <button id="lang-en">English</button>
            </div>
            <h1>Full Stack Developer</h1>
            <h2>Doświadczenie Zawodowe</h2>
            ${cvData.experience.map(job => `
                <h3>${job.company} - ${job.position}</h3>
                <p>${job.time}</p>
                <p>${job.description}</p>
            `).join('')}
        
            <h2>Wykształcenie</h2>
            <h3>${cvData.education.school}</h3>
            <p>Kierunek: ${cvData.education.fieldOfStudy}, ${cvData.education.time}</p>

            <h2>Projekty</h2>
            ${cvData.projects.map(project => `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            `).join('')}
        `;
    } else if (lang === "en") {
        // Pasek boczny
        document.getElementById('sidebar').innerHTML = `
            <img src="${cvData.picture}" alt="Picture" style="width:100%; border-radius: 2.5%;  
            margin-bottom: 5px;">
            <p>${cvData.firstName}</p>
            <p>${cvData.secoundName}</p>
            <p>${cvData.surname}</p>
            <p>E-mail address: <a href="mailto:${cvData.email}">${cvData.email}</a></p>
            <p>Phone number: <a href="tel:${cvData.mobile}">${cvData.mobile}</a></p>
            <h3>Soft Skills</h3>
            <ul>${cvData.softSkills.map(softSkills => `<li>${softSkills}</li>`).join('')}</ul>
            <h3>Hard Skills</h3>
            <ul>${cvData.hardSkills.map(hardSkills => `<li>${hardSkills}</li>`).join('')}</ul>
            <h3>Languages</h3>
            <ul>${cvData.lang.map(l => `<li>${l.language} - ${l.level}</li>`).join('')}</ul>
        `;

        // Główna sekcja
        document.getElementById('main-content').innerHTML = `
            <div class="language-switch">
                <button id="lang-pl">Polish</button>
                <button id="lang-en">English</button>
            </div>
            <h1>Full Stack Developer</h1>
            <h2>Experience</h2>
            ${cvData.experience.map(job => `
                <h3>${job.company} - ${job.position}</h3>
                <p>${job.time}</p>
                <p>${job.description}</p>
            `).join('')}
        
            <h2>Education</h2>
            <h3>${cvData.education.school}</h3>
            <p>Field of study: ${cvData.education.fieldOfStudy}, ${cvData.education.time}</p>

            <h2>Projects</h2>
            ${cvData.projects.map(project => `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            `).join('')}
        `;
    }


    // Eventy na przyciskach zmiany języka
    document.getElementById('lang-pl').addEventListener('click', () => loadCVData('pl'));
    document.getElementById('lang-en').addEventListener('click', () => loadCVData('en'));
}

// Domyślnie ładowanie wersji polskiej
loadCVData('pl');
