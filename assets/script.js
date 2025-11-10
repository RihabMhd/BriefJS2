
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll("button");
const persInfos = document.querySelector(".persInfos");
const profInfos = document.querySelector(".profInfos");
const languages = document.querySelector('.languages');
const experiences = document.querySelector(".experiences");
const templateSelection = document.querySelector(".templateSelection");
const downloadSection = document.querySelector(".downloadCV");

let urlCounter = 0;
let selectedTemplate = 'modern';
let quillEditor = null;

const userInformationCV = {
  fullname: '',
  title: '',
  photo: '',
  email: '',
  telephone: '',
  adresse: '',
  summary: '',
  urls: { linkedin: '', github: '', portfolio: '', other: '' },
  softskills: [],
  hardskills: [],
  languages: [],
  experience: [],
  education: [],
  certifications: [],
  projects: []
};

let currentStep = 1;

function addInput(containerId, placeholder = "Entrez votre texte") {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'input-group flex gap-2';
  div.innerHTML = `
        <input type="text" placeholder="${placeholder}"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <button type="button" onclick="this.parentElement.remove()" 
          class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
      `;
  container.appendChild(div);
}

function addLanguageField() {
  const container = document.getElementById('languagesContainer');
  const div = document.createElement('div');
  div.className = 'language-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
  div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" 
          class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
          <input type="text" placeholder="Ex: Français, Anglais..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
          <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
          class="absolute top-2 right-2 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
          <input type="text" placeholder="Ex: Développeur Full Stack" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
          <input type="text" placeholder="Ex: ABC Technologies" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
          <input type="text" placeholder="Ex: Janvier 2020" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
          <input type="text" placeholder="Ex: Décembre 2022 ou Présent" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea placeholder="Décrivez vos responsabilités..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3"></textarea>
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
          class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input type="text" placeholder="Ex: AWS Certified" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Émetteur</label>
          <input type="text" placeholder="Ex: Amazon" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
          <input type="text" placeholder="2024" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
          class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
          <input type="text" placeholder="Ex: Application E-commerce" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lien (optionnel)</label>
          <input type="url" placeholder="https://mon-projet.com" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea placeholder="Décrivez le projet..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Technologies utilisées</label>
          <input type="text" placeholder="Ex: React, Node.js..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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
          class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
          <input type="text" placeholder="Ex: Licence en Informatique" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
          <input type="text" placeholder="Ex: Université Mohammed V" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
          <input type="text" placeholder="Ex: 2018" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
          <input type="text" placeholder="Ex: 2021" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Détails (optionnel)</label>
          <textarea placeholder="Ex: Mention Bien..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2"></textarea>
        </div>
      `;
  container.appendChild(div);
}

function initQuillEditor() {
  if (quillEditor) {
    quillEditor = null;
  }
  
  setTimeout(() => {
    const editorContainer = document.getElementById('summaryEditor');
    if (editorContainer) {
      quillEditor = new Quill('#summaryEditor', {
        theme: 'snow',
        placeholder: 'Décrivez-vous brièvement...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      });
      
      if (userInformationCV.summary) {
        quillEditor.root.innerHTML = userInformationCV.summary;
      }
    }
  }, 100);
}

const collectPersonalInfo = () => {
  userInformationCV.fullname = document.getElementById('fullname')?.value || '';
  userInformationCV.title = document.getElementById('title')?.value || '';
  userInformationCV.email = document.getElementById('email')?.value || '';
  userInformationCV.telephone = document.getElementById('telephone')?.value || '';
  userInformationCV.adresse = document.getElementById('adresse')?.value || '';
  
  if (quillEditor) {
    userInformationCV.summary = quillEditor.root.innerHTML;
  }

  const photoInput = document.getElementById('photo');
  if (photoInput?.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userInformationCV.photo = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  }
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

const collectCurrentStepData = () => {
  switch (currentStep) {
    case 1: collectPersonalInfo(); break;
    case 2: collectProfessionalInfo(); break;
    case 3: collectLanguages(); break;
    case 4: collectExperiences(); break;
  }
};

const rendrePersonnelInfos = () => {
  persInfos.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Informations Personnelles</h2>
          <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input type="text" id="fullname" placeholder="Entrez votre nom complet" value="${userInformationCV.fullname}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input type="text" id="title" placeholder="Ex: Développeur Full Stack" value="${userInformationCV.title}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
              <input type="file" id="photo" accept="image/*"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" placeholder="email@exemple.com" value="${userInformationCV.email}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" id="telephone" placeholder="+212 6 00 00 00 00" value="${userInformationCV.telephone}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Sommaire</label>
              <div id="summaryEditor" style="height: 200px; background: white;"></div>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input type="text" id="adresse" placeholder="Ville, Pays" value="${userInformationCV.adresse}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </form>
        </div>
      `;
  
  initQuillEditor();
};

const rendreProfessionnelInfos = () => {
  profInfos.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Informations Professionnelles</h2>
          <form class="space-y-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Hard Skills</h3>
              <div id="hardskillsContainer" class="space-y-3 mb-4">
                <div class="input-group flex gap-2">
                  <input type="text" placeholder="Ex: JavaScript, Python..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                </div>
              </div>
              <button type="button" onclick="addInput('hardskillsContainer', 'Ex: JavaScript, Python...')" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter une compétence
              </button>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Éducation</h3>
              <div id="educationContainer" class="space-y-4 mb-4">
                <div class="education-group p-4 bg-gray-50 rounded-lg space-y-3 relative">
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
                    <input type="text" placeholder="Ex: Licence en Informatique" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input type="text" placeholder="Ex: Université Mohammed V" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
                    <input type="text" placeholder="Ex: 2018" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
                    <input type="text" placeholder="Ex: 2021" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Détails (optionnel)</label>
                    <textarea placeholder="Ex: Mention Bien..." 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2"></textarea>
                  </div>
                </div>
              </div>
              <button type="button" onclick="addEducationField()" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
              <div id="softskillsContainer" class="space-y-3 mb-4">
                <div class="input-group flex gap-2">
                  <input type="text" placeholder="Ex: Communication, Leadership..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
                </div>
              </div>
              <button type="button" onclick="addInput('softskillsContainer', 'Ex: Communication, Leadership...')" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter une compétence
              </button>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Langues</h3>
              <div id="languagesContainer" class="space-y-4 mb-4">
                <div class="language-group p-4 bg-gray-50 rounded-lg space-y-3 relative">
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                    <input type="text" placeholder="Ex: Français, Anglais..." 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Sélectionnez un niveau</option>
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                      <option value="Courant">Courant</option>
                      <option value="Langue maternelle">Langue maternelle</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" onclick="addLanguageField()" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
              <div id="experienceContainer" class="space-y-4 mb-4">
                <div class="experience-group p-4 bg-gray-50 rounded-lg space-y-3 relative">
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="absolute top-2 right-2 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                    <input type="text" placeholder="Ex: Développeur Full Stack" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                    <input type="text" placeholder="Ex: ABC Technologies" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                    <input type="text" placeholder="Ex: Janvier 2020" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                    <input type="text" placeholder="Ex: Décembre 2022 ou Présent" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea placeholder="Décrivez vos responsabilités..." 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3"></textarea>
                  </div>
                </div>
              </div>
              <button type="button" onclick="addExperienceField()" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter une expérience
              </button>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Certifications</h3>
              <div id="certificationsContainer" class="space-y-4 mb-4">
                <div class="certification-group p-4 bg-gray-50 rounded-lg space-y-3 relative">
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input type="text" placeholder="Ex: AWS Certified" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Émetteur</label>
                    <input type="text" placeholder="Ex: Amazon" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
                    <input type="text" placeholder="2024" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              <button type="button" onclick="addCertificationField()" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter une certification
              </button>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Projets</h3>
              <div id="projectsContainer" class="space-y-4 mb-4">
                <div class="project-group p-4 bg-gray-50 rounded-lg space-y-3 relative">
                  <button type="button" onclick="this.parentElement.remove()" 
                    class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
                    <input type="text" placeholder="Ex: Application E-commerce" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien (optionnel)</label>
                    <input type="url" placeholder="https://mon-projet.com" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea placeholder="Décrivez le projet..." 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Technologies utilisées</label>
                    <input type="text" placeholder="Ex: React, Node.js..." 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              <button type="button" onclick="addProjectField()" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter un projet
              </button>
            </div>
          </form>
        </div>
      `;
};

const rendreTemplateSelection = () => {
  templateSelection.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Choisissez Votre Template</h2>
          <div class="grid md:grid-cols-3 gap-6">
            ${generateTemplateCards()}
          </div>
          <div class="mt-8 text-center">
            <button id="previewBtn" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg font-semibold">
              <i class="fas fa-eye mr-2"></i> Prévisualiser le CV
            </button>
          </div>
        </div>
      `;
  
  setTimeout(() => {
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
      previewBtn.addEventListener('click', generateCV);
    }
  }, 100);
};

const generateTemplateCards = () => {
  const templates = [
    { id: 'modern', name: 'Modern Blue', desc: 'Design moderne avec accent bleu', icon: '🎨' },
    { id: 'elegant', name: 'Élégant Gris', desc: 'Style professionnel et épuré', icon: '💼' },
  ];

  return templates.map(t => `
        <div onclick="selectedTemplate='${t.id}'; document.querySelectorAll('.template-card').forEach(c => c.classList.remove('ring-4', 'ring-blue-500')); event.currentTarget.classList.add('ring-4', 'ring-blue-500');" 
          class="template-card cursor-pointer bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:shadow-xl transition-all ${t.id === 'modern' ? 'ring-4 ring-blue-500' : ''}">
          <div class="text-center mb-4">
            <div class="text-6xl mb-3">${t.icon}</div>
            <h3 class="text-xl font-bold text-gray-800">${t.name}</h3>
            <p class="text-sm text-gray-600 mt-2">${t.desc}</p>
          </div>
          <div class="flex justify-center">
            <span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Sélectionner</span>
          </div>
        </div>
      `).join('');
};



const generateElegantTemplate = () => {
  return `
    <div id="cv-preview" class="bg-white shadow-xl max-w-4xl mx-auto my-8 text-gray-800 flex flex-col md:flex-row" style="min-height: 1000px;">
      <!-- Sidebar -->
      <div class="w-full md:w-1/3 bg-gray-100 p-6 flex-shrink-0">
        ${userInformationCV.photo ? `<img src="${userInformationCV.photo}" alt="Photo" class="w-32 h-32 object-cover mb-6 border-4 border-gray-300 rounded-full mx-auto">` : ""}

        <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Contact</h2>
        <div class="space-y-2 text-sm mb-6 text-center md:text-left">
          ${userInformationCV.email ? `<p>📧 ${userInformationCV.email}</p>` : ""}
          ${userInformationCV.telephone ? `<p>📱 ${userInformationCV.telephone}</p>` : ""}
          ${userInformationCV.adresse ? `<p>📍 ${userInformationCV.adresse}</p>` : ""}
        </div>

        ${userInformationCV.hardskills.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Hard Skills</h2>
            <ul class="list-disc list-inside text-sm">
              ${userInformationCV.hardskills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ""}

        ${userInformationCV.softskills.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Soft Skills</h2>
            <ul class="list-disc list-inside text-sm">
              ${userInformationCV.softskills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ""}

        ${userInformationCV.languages.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Langues</h2>
            <ul class="list-disc list-inside text-sm">
              ${userInformationCV.languages.map(lang => `<li>${lang.language} - ${lang.level}</li>`).join('')}
            </ul>
          </div>
        ` : ""}
      </div>

      <!-- Main Content -->
      <div class="w-full md:w-2/3 p-6">
        ${userInformationCV.fullname ? `<h1 class="text-3xl font-bold text-gray-800 mb-2">${userInformationCV.fullname}</h1>` : ""}
        ${userInformationCV.title ? `<h2 class="text-xl text-gray-600 mb-6">${userInformationCV.title}</h2>` : ""}
        ${userInformationCV.summary ? `<div class="mb-6"><h2 class="text-lg font-bold text-gray-700 mb-2 uppercase border-b-2 border-gray-400 pb-1">Profil</h2>${userInformationCV.summary}</div>` : ""}

        ${userInformationCV.education.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Éducation</h2>
            ${userInformationCV.education.map(edu => `
              <div class="mb-2">
                <p class="font-semibold">${edu.degree} - ${edu.institution}</p>
                <p class="text-sm text-gray-600">${edu.startYear} - ${edu.endYear}</p>
                ${edu.details ? `<p class="text-sm text-gray-700">${edu.details}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        ${userInformationCV.experience.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Expérience</h2>
            ${userInformationCV.experience.map(exp => `
              <div class="mb-2">
                <p class="font-semibold">${exp.position} - ${exp.company}</p>
                <p class="text-sm text-gray-600">${exp.startDate} - ${exp.endDate}</p>
                ${exp.description ? `<p class="text-sm text-gray-700">${exp.description}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        ${userInformationCV.certifications.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Certifications</h2>
            <ul class="list-disc list-inside text-sm">
              ${userInformationCV.certifications.map(cert => `<li>${cert.title} - ${cert.issuer} (${cert.year})</li>`).join('')}
            </ul>
          </div>
        ` : ""}

        ${userInformationCV.projects.length > 0 ? `
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-700 mb-3 uppercase border-b-2 border-gray-400 pb-2">Projets</h2>
            ${userInformationCV.projects.map(proj => `
              <div class="mb-2">
                <p class="font-semibold">${proj.name}${proj.link ? ` - <a href="${proj.link}" class="text-blue-600 underline" target="_blank">Lien</a>` : ""}</p>
                ${proj.description ? `<p class="text-sm text-gray-700">${proj.description}</p>` : ""}
                ${proj.technologies.length > 0 ? `<p class="text-sm text-gray-600">Technologies: ${proj.technologies.join(', ')}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}
      </div>
    </div>
  `;
};



const generateModernTemplate = () => {
  return `
    <div id="cv-preview" class="bg-white shadow-2xl rounded-2xl p-12 max-w-4xl mx-auto my-8 text-gray-800 border border-gray-100">
      <div class="text-center mb-8 pb-8 border-b-2 border-blue-500">
        ${userInformationCV.photo ? `<img src="${userInformationCV.photo}" alt="Photo de profil" class="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-blue-500 shadow-lg">` : ""}
        <h1 class="text-4xl font-bold text-blue-700 mb-2">${userInformationCV.fullname || 'Votre Nom'}</h1>
        <p class="text-2xl text-gray-600 font-medium mb-4">${userInformationCV.title || 'Votre Titre'}</p>
        <div class="flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
          <p>📧 ${userInformationCV.email || ''}</p>
          <p>📱 ${userInformationCV.telephone || ''}</p>
          <p>📍 ${userInformationCV.adresse || ''}</p>
        </div>
      </div>

      ${userInformationCV.summary ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Résumé</h2>
        <div class="text-gray-700 leading-relaxed">${userInformationCV.summary}</div>
      </section>` : ''}

      <div class="grid md:grid-cols-2 gap-8 mb-8">
        ${userInformationCV.hardskills.length > 0 ? `
        <section>
          <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Compétences Techniques</h2>
          <div class="flex flex-wrap gap-2">
            ${userInformationCV.hardskills.map(skill => `<span class="px-4 py-2 bg-[#DBEAFE] text-[#1D4ED8] rounded-full text-sm font-medium">${skill}</span>`).join("")}
          </div>
        </section>` : ''}

        ${userInformationCV.softskills.length > 0 ? `
        <section>
          <h2 class="text-2xl font-bold text-green-600 mb-4 pb-2 border-b border-gray-200">Soft Skills</h2>
          <div class="flex flex-wrap gap-2">
            ${userInformationCV.softskills.map(skill => `<span class="px-4 py-2 bg-[#DCFCE7] text-[#15803D] rounded-full text-sm font-medium">${skill}</span>`).join("")}
          </div>
        </section>` : ''}
      </div>

      ${userInformationCV.languages.length > 0 ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Langues</h2>
        <ul class="grid md:grid-cols-3 gap-4">
          ${userInformationCV.languages.map(lang => `
            <li class="bg-[#F5F3FF] p-3 rounded-lg border border-[#EDE9FE]">
              <span class="font-semibold text-gray-800">${lang.language}</span>
              <span class="text-[#7C3AED] text-sm block mt-1">${lang.level}</span>
            </li>
          `).join("")}
        </ul>
      </section>` : ''}

      ${userInformationCV.experience.length > 0 ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Expériences Professionnelles</h2>
        <div class="space-y-6">
          ${userInformationCV.experience.map(exp => `
            <div class="relative pl-8 border-l-4 border-[#2563EB]">
              <div class="absolute w-4 h-4 bg-[#1D4ED8] rounded-full -left-2.5 top-1.5 ring-4 ring-white"></div>
              <div style="background: linear-gradient(to right, #F9FAFB, #FFFFFF);" class="p-5 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-gray-800 mb-1">${exp.position}</h3>
                <p class="text-[#2563EB] font-semibold text-lg mb-1">${exp.company}</p>
                <p class="text-sm text-gray-500 mb-3">${exp.startDate} → ${exp.endDate}</p>
                <p class="text-gray-700 leading-relaxed">${exp.description}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </section>` : ''}

      ${userInformationCV.education.length > 0 ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Éducation</h2>
        <div class="space-y-5">
          ${userInformationCV.education.map(edu => `
            <div style="background: linear-gradient(to right, #EFF6FF, #EEF2FF);" class="p-5 rounded-lg shadow-md border-l-4 border-[#6366F1]">
              <h3 class="text-xl font-bold text-gray-800 mb-1">${edu.degree}</h3>
              <p class="text-[#4F46E5] font-semibold text-lg mb-1">${edu.institution}</p>
              <p class="text-sm text-gray-500 mb-2">${edu.startYear} → ${edu.endYear}</p>
              <p class="text-gray-700 leading-relaxed">${edu.details}</p>
            </div>
          `).join("")}
        </div>
      </section>` : ''}

      ${userInformationCV.projects.length > 0 ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Projets</h2>
        <div class="space-y-5">
          ${userInformationCV.projects.map(proj => `
            <div style="background: linear-gradient(to right, #F5F3FF, #FCE7F3);" class="p-5 rounded-lg shadow-md border border-[#EDE9FE]">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-800">${proj.name}</h3>
                ${proj.link ? `<a href="${proj.link}" class="text-[#2563EB]" target="_blank">🔗</a>` : ""}
              </div>
              <p class="text-gray-700 leading-relaxed mb-3">${proj.description}</p>
              <div class="flex flex-wrap gap-2">
                ${proj.technologies.map(tech => `<span class="px-3 py-1 bg-white text-[#7C3AED] rounded-full text-xs font-medium border border-[#DDD6FE]">${tech}</span>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </section>` : ''}

      ${userInformationCV.certifications.length > 0 ? `
      <section class="mb-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 pb-2 border-b border-gray-200">Certifications</h2>
        <div class="grid md:grid-cols-2 gap-4">
          ${userInformationCV.certifications.map(cert => `
            <div class="bg-[#FEF3C7] p-4 rounded-lg border border-[#FCD34D]">
              <h3 class="font-bold text-gray-800">${cert.title}</h3>
              <p class="text-gray-600 text-sm">${cert.issuer}</p>
              <p class="text-gray-500 text-xs mt-1">${cert.year}</p>
            </div>
          `).join("")}
        </div>
      </section>` : ''}
    </div>
  `;
};

function generateCV() {
  collectCurrentStepData();

  let cvHTML = '';
  switch (selectedTemplate) {
    case 'elegant':
      cvHTML = generateElegantTemplate();
      break;
    default:
      cvHTML = generateModernTemplate();
  }

  cvHTML += `
    <div class="text-center mt-8 mb-8">
      <button id="downloadBtn" 
              class="text-white px-8 py-4 rounded-xl bg-black bg-opacity-80 text-[#f1f1f1] text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
        <i class="fas fa-download mr-2"></i> Télécharger le CV en PDF
      </button>
    </div>
  `;

  downloadSection.innerHTML = cvHTML;
  downloadSection.style.display = 'block';


    const downloadBtn = document.getElementById("downloadBtn");
    const cvpreview = document.getElementById('cv-preview');

    if (downloadBtn && cvpreview) {
      downloadBtn.addEventListener("click", () => {
        downloadBtn.disabled = true;

        const opt = {
          margin: 0.5,
          filename: `${userInformationCV.fullname || "mon_cv"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        };

        html2pdf().set(opt).from(cvpreview).save()
      });
    }
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

const Steps = () => {
  persInfos.style.display = "none";
  profInfos.style.display = "none";
  experiences.style.display = "none";
  languages.style.display = "none";
  templateSelection.style.display = "none";
  downloadSection.style.display = 'none';

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
      rendreTemplateSelection();
      templateSelection.style.display = "block";
      downloadSection.style.display = 'block';

      break;
    default:
      break;
  }
};





window.onload = () => {
  rendrePersonnelInfos();
  persInfos.style.display = "block";
};

buttons.forEach((button) => button.addEventListener("click", updateSteps));