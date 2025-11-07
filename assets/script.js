const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll("button");

const persInfos = document.querySelector(".persInfos");
const profInfos = document.querySelector(".profInfos");
const languages = document.querySelector('.languages');
const experiences = document.querySelector(".experiences");
const downloadCV = document.querySelector(".downloadCV");
let urlCounter = 0;

const userInformationCV = {
  fullname: '',
  title: '',
  photo: '',
  email: '',
  telephone: '',
  adresse: '',
  summary: '',
  urls: {
    linkedin: '',
    github: '',
    portfolio: '',
    other: ''
  },
  softskills: [],
  hardskills: [],
  languages: [],
  experience: [],
  education: [],
  certifications: [],
  projects: []
}

let currentStep = 1;

function addInput(containerId, placeholder = "Entrez votre texte") {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'input-group flex gap-2';
  div.innerHTML = `
    <input type="text" placeholder="${placeholder}"
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    <button type="button" onclick="this.parentElement.remove()" 
      class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">✕</button>
  `;
  container.appendChild(div);
}

function addLanguageField() {
  const container = document.getElementById('languagesContainer');
  const div = document.createElement('div');
  div.className = 'language-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
      <input type="text" placeholder="Ex: Français, Anglais, Arabe..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
      <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        <option value="">Sélectionnez un niveau</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Avancé">Avancé</option>
        <option value="Courant">Courant</option>
        <option value="Langue maternelle">Langue maternelle</option>
      </select>
    </div>
  `;
  container.appendChild(div);
}

function addExperienceField() {
  const container = document.getElementById('experienceContainer');
  const div = document.createElement('div');
  div.className = 'experience-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
      <input type="text" placeholder="Ex: Développeur Full Stack" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
      <input type="text" placeholder="Ex: ABC Technologies" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
      <input type="text" placeholder="Ex: Janvier 2020" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
      <input type="text" placeholder="Ex: Décembre 2022 ou Présent" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea placeholder="Décrivez vos responsabilités et réalisations..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
    </div>
  `;
  container.appendChild(div);
}

function addCertificationField() {
  const container = document.getElementById('certificationsContainer');
  const div = document.createElement('div');
  div.className = 'certification-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
      <input type="text" placeholder="Ex: AWS Certified" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Émetteur</label>
      <input type="text" placeholder="Ex: Amazon" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
      <input type="text" placeholder="2024" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
  `;
  container.appendChild(div);
}

function addProjectField() {
  const container = document.getElementById('projectsContainer');
  const div = document.createElement('div');
  div.className = 'project-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
      <input type="text" placeholder="Ex: Application E-commerce" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Lien (optionnel)</label>
      <input type="url" placeholder="https://mon-projet.com" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea placeholder="Décrivez le projet..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Technologies utilisées</label>
      <input type="text" placeholder="Ex: React, Node.js, MongoDB..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
  `;
  container.appendChild(div);
}

function addEducationField() {
  const container = document.getElementById('educationContainer');
  const div = document.createElement('div');
  div.className = 'education-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
      <input type="text" placeholder="Ex: Licence en Informatique" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
      <input type="text" placeholder="Ex: Université Mohammed V" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
      <input type="text" placeholder="Ex: 2018" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
      <input type="text" placeholder="Ex: 2021" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Détails (optionnel)</label>
      <textarea placeholder="Ex: Mention Bien, Spécialisation..." 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
    </div>
  `;
  container.appendChild(div);
}

const updateSteps = (e) => {
  if (e.target.id === "next") {
    collectCurrentStepData();
    if (currentStep < circles.length) currentStep++;
  } else if (e.target.id === "prev" && currentStep > 1) {
    currentStep--;
  }

  circles.forEach((circle, index) => {
    index < currentStep
      ? circle.classList.add("active")
      : circle.classList.remove("active");
  });

  progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;

  buttons.forEach((button) => {
    if (button.id === "prev") button.disabled = currentStep === 1;
    if (button.id === "next") button.disabled = currentStep === circles.length;
  });

  Steps();
};

const collectCurrentStepData = () => {
  switch (currentStep) {
    case 1:
      collectPersonalInfo();
      break;
    case 2:
      collectProfessionalInfo();
      break;
    case 3:
      collectLanguages();
      break;
    case 4:
      collectExperiences();
      break;
  }
  console.log('CV Data:', userInformationCV);
};

const collectPersonalInfo = () => {
  userInformationCV.fullname = document.getElementById('fullname')?.value || '';
  userInformationCV.title = document.getElementById('title')?.value || '';
  userInformationCV.email = document.getElementById('email')?.value || '';
  userInformationCV.telephone = document.getElementById('telephone')?.value || '';
  userInformationCV.adresse = document.getElementById('adresse')?.value || '';
  userInformationCV.summary = document.getElementById('summary')?.value || '';

  const photoInput = document.getElementById('photo');
  if (photoInput?.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userInformationCV.photo = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }

  const urlInputs = document.querySelectorAll('#additionalUrls input[type="url"]');
  urlInputs.forEach((input, index) => {
    if (input.value) {
      if (index === 0) userInformationCV.urls.linkedin = input.value;
      else if (index === 1) userInformationCV.urls.github = input.value;
      else if (index === 2) userInformationCV.urls.portfolio = input.value;
      else userInformationCV.urls.other = input.value;
    }
  });
};

const collectProfessionalInfo = () => {
  userInformationCV.hardskills = [];
  document.querySelectorAll('#hardskillsContainer input').forEach(input => {
    if (input.value) userInformationCV.hardskills.push(input.value);
  });

  userInformationCV.education = [];
  document.querySelectorAll('.education-group').forEach(group => {
    const inputs = group.querySelectorAll('input, textarea');
    userInformationCV.education.push({
      degree: inputs[0]?.value || '',
      institution: inputs[1]?.value || '',
      startYear: inputs[2]?.value || '',
      endYear: inputs[3]?.value || '',
      details: inputs[4]?.value || ''
    });
  });
};

const collectLanguages = () => {
  userInformationCV.softskills = [];
  document.querySelectorAll('#softskillsContainer input').forEach(input => {
    if (input.value) userInformationCV.softskills.push(input.value);
  });

  userInformationCV.languages = [];
  document.querySelectorAll('.language-group').forEach(group => {
    const input = group.querySelector('input');
    const select = group.querySelector('select');
    if (input?.value && select?.value) {
      userInformationCV.languages.push({
        language: input.value,
        level: select.value
      });
    }
  });
};

const collectExperiences = () => {
  userInformationCV.experience = [];
  document.querySelectorAll('.experience-group').forEach(group => {
    const inputs = group.querySelectorAll('input, textarea');
    userInformationCV.experience.push({
      position: inputs[0]?.value || '',
      company: inputs[1]?.value || '',
      startDate: inputs[2]?.value || '',
      endDate: inputs[3]?.value || '',
      description: inputs[4]?.value || ''
    });
  });

  userInformationCV.certifications = [];
  document.querySelectorAll('.certification-group').forEach(group => {
    const inputs = group.querySelectorAll('input');
    userInformationCV.certifications.push({
      title: inputs[0]?.value || '',
      issuer: inputs[1]?.value || '',
      year: inputs[2]?.value || ''
    });
  });

  userInformationCV.projects = [];
  document.querySelectorAll('.project-group').forEach(group => {
    const inputs = group.querySelectorAll('input, textarea');
    userInformationCV.projects.push({
      name: inputs[0]?.value || '',
      link: inputs[1]?.value || '',
      description: inputs[2]?.value || '',
      technologies: inputs[3]?.value.split(',').map(t => t.trim()).filter(t => t)
    });
  });
};

const Steps = () => {
  persInfos.style.display = "none";
  profInfos.style.display = "none";
  experiences.style.display = "none";
  languages.style.display = "none";
  downloadCV.style.display = 'none';

  switch (currentStep) {
    case 1:
      rendrePersonnelInfos();
      persInfos.style.display = "block";
      break;
    case 2:
      rendreProfessionnelInfos();
      profInfos.style.display = "block";
      break;
    case 3:
      rendreLanguages();
      languages.style.display = "block";
      break;
    case 4:
      rendreExperiences();
      experiences.style.display = "block";
      break;
    case 5:
      generateCV();
      downloadCV.style.display = "block";
    default:
      break;
  }
}

window.onload = () => {
  rendrePersonnelInfos();
  persInfos.style.display = "block";
}

const addUrlField = () => {
  urlCounter++;
  const additionalUrls = document.getElementById('additionalUrls');

  const urlFieldHtml = `
    <div class="url-field-group md:col-span-2">
      <label for="url-${urlCounter}" class="block text-sm font-medium text-gray-700 mb-1">Lien ${urlCounter}</label>
      <div class="flex gap-2">
        <input type="url" id="url-${urlCounter}" placeholder="https://votre-lien.com"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        <button type="button" class="remove-url-btn px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          ✕
        </button>
      </div>
    </div>
  `;

  additionalUrls.insertAdjacentHTML('beforeend', urlFieldHtml);

  const removeButtons = additionalUrls.querySelectorAll('.remove-url-btn');
  removeButtons[removeButtons.length - 1].addEventListener('click', function () {
    this.parentElement.parentElement.remove();
  });
};

const rendrePersonnelInfos = () => {
  persInfos.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Informations Personnelles</h2>

      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="fullname" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input type="text" id="fullname" placeholder="Entrez votre nom complet" value="${userInformationCV.fullname}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input type="text" id="title" placeholder="Entrez votre Titre" value="${userInformationCV.title}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>

        <div>
          <label for="photo" class="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
          <input type="file" id="photo" accept="image/*"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email" placeholder="Entrez votre email" value="${userInformationCV.email}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>

        <div class="md:col-span-2">
          <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="tel" id="telephone" placeholder="Entrez votre numéro" value="${userInformationCV.telephone}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>
        
        <div class="md:col-span-2">
          <label for="summary" class="block text-sm font-medium text-gray-700 mb-1">Sommaire</label>
          <textarea id="summary" placeholder="Décrivez-vous brièvement..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" rows="4">${userInformationCV.summary}</textarea>
        </div>

        <div class="md:col-span-2">
          <label for="adresse" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <input type="text" id="adresse" placeholder="Entrez votre adresse complète" value="${userInformationCV.adresse}"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>
        
        <h4 class="text-xl font-semibold text-gray-800 mb-2 md:col-span-2">URL Optionnel :</h4>
        
        <div id="additionalUrls" class="md:col-span-2 space-y-4"></div>
        
        <div class="md:col-span-2 text-center">
          <button type="button" id="addUrlBtn" onclick="addUrlField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter un lien
          </button>
        </div>
      </form>
    </div>
  `;
};

const rendreProfessionnelInfos = () => {
  profInfos.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Informations Professionnelles</h2>
      
      <form class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Hard Skills</h3>
          <div id="hardskillsContainer" class="space-y-3 mb-4"></div>
          <button type="button" onclick="addInput('hardskillsContainer', 'Ex: JavaScript, Python, React...')" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une compétence technique
          </button>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Éducation</h3>
          <div id="educationContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addEducationField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une formation
          </button>
        </div>
      </form>
    </div>
  `;
};

const rendreLanguages = () => {
  languages.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Langues & Soft Skills</h2>
      
      <form class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Soft Skills</h3>
          <div id="softskillsContainer" class="space-y-3 mb-4"></div>
          <button type="button" onclick="addInput('softskillsContainer', 'Ex: Communication, Leadership, Travail d\\'équipe...')" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une compétence interpersonnelle
          </button>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Langues</h3>
          <div id="languagesContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addLanguageField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une langue
          </button>
        </div>
      </form>
    </div>
  `;
};

const rendreExperiences = () => {
  experiences.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Expériences & Réalisations</h2>
      
      <form class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Expérience Professionnelle</h3>
          <div id="experienceContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addExperienceField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une expérience
          </button>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Certifications</h3>
          <div id="certificationsContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addCertificationField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter une certification
          </button>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Projets</h3>
          <div id="projectsContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addProjectField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <i class="fa-solid fa-plus"></i> Ajouter un projet
          </button>
        </div>
      </form>
    </div>
  `;
};





buttons.forEach((button) => button.addEventListener("click", updateSteps));