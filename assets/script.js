//-----------------Variable de progress Bar--------------------------------
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll("button");


//---------------Variable de l'affichage des formulaires--------------------
const persInfos = document.querySelector(".persInfos");
const profInfos = document.querySelector(".profInfos");
const languages = document.querySelector('.languages');
const experiences = document.querySelector(".experiences");
const templateSelection = document.querySelector(".templateSelection");
const downloadSection = document.querySelector(".downloadCV");


//---------------Counteur de urls/steps--------------------
let urlCounter = 0;
let currentStep = 1;


//---------------selecteur de template--------------------
let selectedTemplate = 'modern';


//---------------Quill JS--------------------
let quillEditor = null;







//---------------Objet userInformation--------------------
const userInformationCV = {
  fullname: '',
  title: '',
  photo: '',
  email: '',
  telephone: '',
  adresse: '',
  summary: '',
  softskills: [],
  hardskills: [],
  languages: [],
  experience: [],
  education: [],
  certifications: [],
  projects: []
};





//---------------Function pour l'ajout d un input dans le formulaire de personnel information--------------------
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
};
//---------------function pour l'ajout d un language champs dans la formulaire de language--------------------
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
//---------------function pour l'ajout d une experience champs dans la formulaire de profesionnel--------------------
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
//--------------function pour l'ajout d une certificat champs dans la formulaire de profesionnel--------------------
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
//--------------function pour l'ajout d une certificat champs dans la formulaire de profesionnel--------------------
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
//--------------function pour l'ajout d un education champs dans la formulaire de profesionnel--------------------
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








//--------------Quill JS-------------------
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
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
//-----------------function pour le collect des donnees---------------
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
  const preview = document.getElementById('preview');

  photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        userInformationCV.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      userInformationCV.photo = null;
    }
  });

};
//-----------------function pour le collect des donnees---------------
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
//-----------------function pour le collect des donnees---------------
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
//-----------------function pour le collect des donnees---------------
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
//-----------------function pour le collect des donnees---------------
const collectCurrentStepData = () => {
  switch (currentStep) {
    case 1:
      collectPersonalInfo();
      saveToLocalStorage();
      break;
    case 2:
      collectProfessionalInfo();
      saveToLocalStorage();
      break;
    case 3:
      collectLanguages();
      saveToLocalStorage();
      break;
    case 4:
      collectExperiences();
      saveToLocalStorage();
      break;
  }
};








//-----------------function pour l'affichage des donnees---------------
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
              <img id="preview" src="${userInformationCV.photo || ''}" alt="Your image will appear here" class="mt-2 max-h-40">
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

  const photoInput = document.getElementById('photo');
  const preview = document.getElementById('preview');

  photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        userInformationCV.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      userInformationCV.photo = null;
    }
  });

  initQuillEditor();
};
//-----------------function pour l'affichage des donnees---------------
const rendreProfessionnelInfos = () => {
  profInfos.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Informations Professionnelles</h2>
      <form class="space-y-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
          <div id="hardskillsContainer" class="space-y-3 mb-4"></div>
          <button type="button" onclick="addInput('hardskillsContainer', 'Ex: JavaScript, Python...')" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <i class="fa-solid fa-plus"></i> Ajouter une compétence
          </button>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Éducation</h3>
          <div id="educationContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addEducationField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <i class="fa-solid fa-plus"></i> Ajouter une formation
          </button>
        </div>
      </form>
    </div>
  `;

  const hardskillsContainer = document.getElementById('hardskillsContainer');
  hardskillsContainer.innerHTML = '';

  userInformationCV.hardskills.forEach(skill => {
    const div = document.createElement('div');
    div.className = 'input-group flex gap-2';
    div.innerHTML = `
      <input type="text" value="${skill}" 
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      <button type="button" onclick="this.parentElement.remove()" 
        class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
    `;
    hardskillsContainer.appendChild(div);
  });

  const educationContainer = document.getElementById('educationContainer');
  educationContainer.innerHTML = '';

  userInformationCV.education.forEach(edu => {
    const div = document.createElement('div');
    div.className = 'education-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
    div.innerHTML = `
      <button type="button" onclick="this.parentElement.remove()" 
        class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
        <input type="text" value="${edu.degree || ''}" placeholder="Ex: Licence en Informatique" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
        <input type="text" value="${edu.institution || ''}" placeholder="Ex: Université Mohammed V" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
        <input type="text" value="${edu.startYear || ''}" placeholder="Ex: 2018" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
        <input type="text" value="${edu.endYear || ''}" placeholder="Ex: 2021" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Détails (optionnel)</label>
        <textarea placeholder="Ex: Mention Bien..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="2">${edu.details || ''}</textarea>
      </div>
    `;
    educationContainer.appendChild(div);
  });
};
//-----------------function pour l'affichage des donnees---------------
const rendreLanguages = () => {
  languages.innerHTML = `
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Langues & Soft Skills</h2>
          <form class="space-y-8">
            <div>

              <h3 class="text-xl font-semibold text-gray-800 mb-4">Soft Skills</h3>

              <div id="softskillsContainer" class="space-y-3 mb-4">
              </div>

              <button type="button" onclick="addInput('softskillsContainer', 'Ex: Communication, Leadership...')" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fa-solid fa-plus"></i> Ajouter une compétence
              </button>


            </div>
            <div>

              <h3 class="text-xl font-semibold text-gray-800 mb-4">Langues</h3>

              <div id="languagesContainer" class="space-y-4 mb-4">
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
  const softskillsContainer = document.getElementById('softskillsContainer');
  softskillsContainer.innerHTML = '';
  userInformationCV.softskills.forEach(skill => {
    const div = document.createElement('div');
    div.className = 'input-group flex gap-2';
    div.innerHTML = `
    <input type="text" value="${skill}" 
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    <button type="button" onclick="this.parentElement.remove()" 
      class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">✕</button>
  `;
    softskillsContainer.appendChild(div);
  });

  const languagesContainer = document.getElementById('languagesContainer');
  languagesContainer.innerHTML = '';
  userInformationCV.languages.forEach(lang => {
    const div = document.createElement('div');
    div.className = 'language-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
    div.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" 
      class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">✕</button>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
      <input type="text" value="${lang.language}" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
      <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">Sélectionnez un niveau</option>
        <option value="Débutant" ${lang.level === 'Débutant' ? 'selected' : ''}>Débutant</option>
        <option value="Intermédiaire" ${lang.level === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
        <option value="Avancé" ${lang.level === 'Avancé' ? 'selected' : ''}>Avancé</option>
        <option value="Courant" ${lang.level === 'Courant' ? 'selected' : ''}>Courant</option>
        <option value="Langue maternelle" ${lang.level === 'Langue maternelle' ? 'selected' : ''}>Langue maternelle</option>
      </select>
    </div>
  `;
    languagesContainer.appendChild(div);
  });

};
//-----------------function pour l'affichage des donnees---------------
const rendreExperiences = () => {
  experiences.innerHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Expériences & Réalisations</h2>
      <form class="space-y-8">

        <!-- Expériences professionnelles -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Expérience Professionnelle</h3>
          <div id="experienceContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addExperienceField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <i class="fa-solid fa-plus"></i> Ajouter une expérience
          </button>
        </div>

        <!-- Certifications -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Certifications</h3>
          <div id="certificationsContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addCertificationField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <i class="fa-solid fa-plus"></i> Ajouter une certification
          </button>
        </div>

        <!-- Projets -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Projets</h3>
          <div id="projectsContainer" class="space-y-4 mb-4"></div>
          <button type="button" onclick="addProjectField()" 
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <i class="fa-solid fa-plus"></i> Ajouter un projet
          </button>
        </div>

      </form>
    </div>
  `;

  const experienceContainer = document.getElementById('experienceContainer');
  experienceContainer.innerHTML = '';

  userInformationCV.experience.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'experience-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
    div.innerHTML = `
      <button type="button" onclick="this.parentElement.remove()" 
        class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
        <input type="text" value="${exp.position || ''}" placeholder="Ex: Développeur Full Stack"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
        <input type="text" value="${exp.company || ''}" placeholder="Ex: ABC Technologies"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
          <input type="text" value="${exp.startDate || ''}" placeholder="Ex: Janvier 2020"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
          <input type="text" value="${exp.endDate || ''}" placeholder="Ex: Décembre 2022 ou Présent"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea placeholder="Décrivez vos responsabilités..." rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">${exp.description || ''}</textarea>
      </div>
    `;
    experienceContainer.appendChild(div);
  });

  const certificationsContainer = document.getElementById('certificationsContainer');
  certificationsContainer.innerHTML = '';

  userInformationCV.certifications.forEach(cert => {
    const div = document.createElement('div');
    div.className = 'certification-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
    div.innerHTML = `
      <button type="button" onclick="this.parentElement.remove()" 
        class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input type="text" value="${cert.title || ''}" placeholder="Ex: AWS Certified"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Émetteur</label>
        <input type="text" value="${cert.issuer || ''}" placeholder="Ex: Amazon"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
        <input type="text" value="${cert.year || ''}" placeholder="2024"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
    `;
    certificationsContainer.appendChild(div);
  });

  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '';

  userInformationCV.projects.forEach(proj => {
    const div = document.createElement('div');
    div.className = 'project-group p-4 bg-gray-50 rounded-lg space-y-3 relative';
    div.innerHTML = `
      <button type="button" onclick="this.parentElement.remove()" 
        class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">✕</button>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
        <input type="text" value="${proj.name || ''}" placeholder="Ex: Application E-commerce"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Lien (optionnel)</label>
        <input type="url" value="${proj.link || ''}" placeholder="https://mon-projet.com"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea placeholder="Décrivez le projet..." rows="2"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">${proj.description || ''}</textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Technologies utilisées</label>
        <input type="text" value="${proj.technologies || ''}" placeholder="Ex: React, Node.js..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
    `;
    projectsContainer.appendChild(div);
  });
};

//-----------------function pour l'affichage des donnees---------------
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







//-----------------function pour l'affichage des donnees---------------
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
//-----------------function pour l'affichage des donnees---------------
const generateElegantTemplate = () => {
  return `
    <div id="cv-preview" style="background-color: #ffffff; max-width: 210mm; margin: 0 auto; color: #2c3e50; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6;">
      <!-- Header -->
      <div style="background-color: #1a1a2e; color: white; padding: 40px 50px; text-align: center;">
        ${userInformationCV.photo ? `<img src="${userInformationCV.photo}" alt="Photo" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 4px solid white; margin-bottom: 20px;">` : ""}
        ${userInformationCV.fullname ? `<h1 style="font-size: 32px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: 1px;">${userInformationCV.fullname}</h1>` : ""}
        ${userInformationCV.title ? `<p style="font-size: 18px; margin: 0; opacity: 0.95; font-weight: 300;">${userInformationCV.title}</p>` : ""}
      </div>

      <!-- Contact Bar -->
      <div style="background-color: #ecf0f1; padding: 15px 50px; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; font-size: 14px; color: #2c3e50;">
        ${userInformationCV.email ? `<span>✉ ${userInformationCV.email}</span>` : ""}
        ${userInformationCV.telephone ? `<span>☎ ${userInformationCV.telephone}</span>` : ""}
        ${userInformationCV.adresse ? `<span>⌂ ${userInformationCV.adresse}</span>` : ""}
      </div>

      <div style="padding: 40px 50px;">
        <!-- Summary -->
        ${userInformationCV.summary ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Profil Professionnel</h2>
            <p style="font-size: 15px; color: #555; text-align: justify; margin: 0;">${userInformationCV.summary}</p>
          </div>
        ` : ""}

        <!-- Experience -->
        ${userInformationCV.experience.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Expérience Professionnelle</h2>
            ${userInformationCV.experience.map(exp => `
              <div style="margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                  <h3 style="font-size: 17px; font-weight: 600; color: #2c3e50; margin: 0;">${exp.position}</h3>
                  <span style="font-size: 13px; color: #7f8c8d; font-style: italic;">${exp.startDate} - ${exp.endDate}</span>
                </div>
                <p style="font-size: 15px; color: #3498db; margin: 0 0 8px 0; font-weight: 500;">${exp.company}</p>
                ${exp.description ? `<p style="font-size: 14px; color: #555; margin: 0; text-align: justify;">${exp.description}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        <!-- Education -->
        ${userInformationCV.education.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Formation</h2>
            ${userInformationCV.education.map(edu => `
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                  <h3 style="font-size: 17px; font-weight: 600; color: #2c3e50; margin: 0;">${edu.degree}</h3>
                  <span style="font-size: 13px; color: #7f8c8d; font-style: italic;">${edu.startYear} - ${edu.endYear}</span>
                </div>
                <p style="font-size: 15px; color: #3498db; margin: 0 0 5px 0; font-weight: 500;">${edu.institution}</p>
                ${edu.details ? `<p style="font-size: 14px; color: #555; margin: 0;">${edu.details}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        <!-- Skills Section -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 35px;">
          ${userInformationCV.hardskills.length > 0 ? `
            <div>
              <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Compétences Techniques</h2>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${userInformationCV.hardskills.map(skill => `<li style="margin-bottom: 8px;">${skill}</li>`).join('')}
              </ul>
            </div>
          ` : ""}

          ${userInformationCV.softskills.length > 0 ? `
            <div>
              <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Compétences Transversales</h2>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${userInformationCV.softskills.map(skill => `<li style="margin-bottom: 8px;">${skill}</li>`).join('')}
              </ul>
            </div>
          ` : ""}
        </div>

        <!-- Languages & Certifications -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 35px;">
          ${userInformationCV.languages.length > 0 ? `
            <div>
              <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Langues</h2>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${userInformationCV.languages.map(lang => `<li style="margin-bottom: 8px;"><strong>${lang.language}:</strong> ${lang.level}</li>`).join('')}
              </ul>
            </div>
          ` : ""}

          ${userInformationCV.certifications.length > 0 ? `
            <div>
              <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Certifications</h2>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555;">
                ${userInformationCV.certifications.map(cert => `<li style="margin-bottom: 8px;"><strong>${cert.title}</strong> - ${cert.issuer} (${cert.year})</li>`).join('')}
              </ul>
            </div>
          ` : ""}
        </div>

        <!-- Projects -->
        ${userInformationCV.projects.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #2c3e50; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 3px solid #3498db; text-transform: uppercase; letter-spacing: 0.5px;">Projets Notables</h2>
            ${userInformationCV.projects.map(proj => `
              <div style="margin-bottom: 20px;">
                <h3 style="font-size: 17px; font-weight: 600; color: #2c3e50; margin: 0 0 5px 0;">${proj.name}${proj.link ? ` <a href="${proj.link}" style="color: #3498db; text-decoration: none; font-size: 14px;" target="_blank">↗</a>` : ""}</h3>
                ${proj.description ? `<p style="font-size: 14px; color: #555; margin: 0 0 8px 0;">${proj.description}</p>` : ""}
                ${proj.technologies.length > 0 ? `<p style="font-size: 13px; color: #7f8c8d; margin: 0;"><em>Technologies: ${proj.technologies.join(', ')}</em></p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}
      </div>
    </div>
  `;
};
//-----------------function pour l'affichage des donnees---------------
const generateModernTemplate = () => {
  return `
    <div id="cv-preview" style="background-color: #ffffff; max-width: 210mm; margin: 0 auto; color: #333; font-family: 'Calibri', 'Arial', sans-serif; display: flex; min-height: 297mm;">
      <!-- Left Sidebar -->
      <div style="width: 35%; background-color: #1a1a2e; color: white; padding: 40px 30px;">
        ${userInformationCV.photo ? `<img src="${userInformationCV.photo}" alt="Photo" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%; border: 5px solid #16213e; margin: 0 auto 30px; display: block;">` : ""}

        <!-- Contact -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #0f3460; text-transform: uppercase; letter-spacing: 1px;">Contact</h2>
          <div style="font-size: 13px; line-height: 2;">
            ${userInformationCV.email ? `<p style="margin: 0 0 12px 0; word-break: break-all;"><strong>Email:</strong><br>${userInformationCV.email}</p>` : ""}
            ${userInformationCV.telephone ? `<p style="margin: 0 0 12px 0;"><strong>Téléphone:</strong><br>${userInformationCV.telephone}</p>` : ""}
            ${userInformationCV.adresse ? `<p style="margin: 0;"><strong>Adresse:</strong><br>${userInformationCV.adresse}</p>` : ""}
          </div>
        </div>

        <!-- Languages -->
        ${userInformationCV.languages.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #0f3460; text-transform: uppercase; letter-spacing: 1px;">Langues</h2>
            ${userInformationCV.languages.map(lang => `
              <div style="margin-bottom: 15px;">
                <p style="margin: 0 0 5px 0; font-weight: 600; font-size: 14px;">${lang.language}</p>
                <p style="margin: 0; font-size: 13px; opacity: 0.9;">${lang.level}</p>
              </div>
            `).join('')}
          </div>
        ` : ""}

        <!-- Hard Skills -->
        ${userInformationCV.hardskills.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #0f3460; text-transform: uppercase; letter-spacing: 1px;">Compétences</h2>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
              ${userInformationCV.hardskills.map(skill => `<li style="margin-bottom: 8px;">${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ""}

        <!-- Soft Skills -->
        ${userInformationCV.softskills.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #0f3460; text-transform: uppercase; letter-spacing: 1px;">Qualités</h2>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
              ${userInformationCV.softskills.map(skill => `<li style="margin-bottom: 8px;">${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ""}

        <!-- Certifications -->
        ${userInformationCV.certifications.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #0f3460; text-transform: uppercase; letter-spacing: 1px;">Certifications</h2>
            ${userInformationCV.certifications.map(cert => `
              <div style="margin-bottom: 15px; font-size: 13px;">
                <p style="margin: 0 0 3px 0; font-weight: 600;">${cert.title}</p>
                <p style="margin: 0; opacity: 0.9;">${cert.issuer} (${cert.year})</p>
              </div>
            `).join('')}
          </div>
        ` : ""}
      </div>

      <!-- Right Content -->
      <div style="width: 65%; padding: 40px 50px; background-color: #ffffff;">
        <!-- Header -->
        <div style="margin-bottom: 35px;">
          ${userInformationCV.fullname ? `<h1 style="font-size: 36px; font-weight: 700; color: #1a1a2e; margin: 0 0 10px 0; letter-spacing: -0.5px;">${userInformationCV.fullname}</h1>` : ""}
          ${userInformationCV.title ? `<p style="font-size: 20px; color: #0f3460; margin: 0; font-weight: 500;">${userInformationCV.title}</p>` : ""}
        </div>

        <!-- Summary -->
        ${userInformationCV.summary ? `
          <div style="margin-bottom: 35px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #0f3460;">
            <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">À Propos</h2>
            <p style="font-size: 14px; color: #555; line-height: 1.7; margin: 0; text-align: justify;">${userInformationCV.summary}</p>
          </div>
        ` : ""}

        <!-- Experience -->
        ${userInformationCV.experience.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 22px; font-weight: 700; color: #1a1a2e; margin: 0 0 25px 0; padding-bottom: 10px; border-bottom: 3px solid #0f3460; text-transform: uppercase; letter-spacing: 0.5px;">Expérience</h2>
            ${userInformationCV.experience.map(exp => `
              <div style="margin-bottom: 30px; position: relative; padding-left: 25px;">
                <div style="position: absolute; left: 0; top: 8px; width: 10px; height: 10px; background-color: #0f3460; border-radius: 50%;"></div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                  <h3 style="font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0;">${exp.position}</h3>
                  <span style="font-size: 13px; color: #888; white-space: nowrap; margin-left: 15px;">${exp.startDate} - ${exp.endDate}</span>
                </div>
                <p style="font-size: 16px; color: #0f3460; margin: 0 0 10px 0; font-weight: 500;">${exp.company}</p>
                ${exp.description ? `<p style="font-size: 14px; color: #555; line-height: 1.7; margin: 0; text-align: justify;">${exp.description}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        <!-- Education -->
        ${userInformationCV.education.length > 0 ? `
          <div style="margin-bottom: 35px;">
            <h2 style="font-size: 22px; font-weight: 700; color: #1a1a2e; margin: 0 0 25px 0; padding-bottom: 10px; border-bottom: 3px solid #0f3460; text-transform: uppercase; letter-spacing: 0.5px;">Formation</h2>
            ${userInformationCV.education.map(edu => `
              <div style="margin-bottom: 25px; position: relative; padding-left: 25px;">
                <div style="position: absolute; left: 0; top: 8px; width: 10px; height: 10px; background-color: #0f3460; border-radius: 50%;"></div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                  <h3 style="font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0;">${edu.degree}</h3>
                  <span style="font-size: 13px; color: #888; white-space: nowrap; margin-left: 15px;">${edu.startYear} - ${edu.endYear}</span>
                </div>
                <p style="font-size: 16px; color: #0f3460; margin: 0 0 8px 0; font-weight: 500;">${edu.institution}</p>
                ${edu.details ? `<p style="font-size: 14px; color: #555; margin: 0;">${edu.details}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}

        <!-- Projects -->
        ${userInformationCV.projects.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 22px; font-weight: 700; color: #1a1a2e; margin: 0 0 25px 0; padding-bottom: 10px; border-bottom: 3px solid #0f3460; text-transform: uppercase; letter-spacing: 0.5px;">Projets</h2>
            ${userInformationCV.projects.map(proj => `
              <div style="margin-bottom: 25px;">
                <h3 style="font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px 0;">${proj.name}${proj.link ? ` <a href="${proj.link}" style="color: #0f3460; text-decoration: none; font-size: 14px;" target="_blank">→</a>` : ""}</h3>
                ${proj.description ? `<p style="font-size: 14px; color: #555; line-height: 1.7; margin: 0 0 10px 0;">${proj.description}</p>` : ""}
                ${proj.technologies.length > 0 ? `<p style="font-size: 13px; color: #888; margin: 0;"><strong>Technologies:</strong> ${proj.technologies.join(' • ')}</p>` : ""}
              </div>
            `).join('')}
          </div>
        ` : ""}
      </div>
    </div>
  `;
};
//-----------------function pour la generation de cv---------------
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
  <div style="text-align:center; margin: 2rem 0;display:flex; justify-content:space-between">
    <button id="downloadBtn"
        style="
          background-color: rgba(0, 0, 0, 0.8);
          color: #ffffff;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 700;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          border: none;
          transition: transform 0.3s ease;
        "
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
    >
      <i class="fas fa-download" style="margin-right: 8px;"></i> Télécharger le CV en PDF
    </button>
    <button id="ImprimerBtn"
        style="
          background-color: rgb(53, 53, 206);
          color:#ffffff ;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 700;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          border: none;
          transition: transform 0.3s ease;
        "
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
    >
      <i class="fas fa-download" style="margin-right: 8px;"></i> Imprimer le CV
    </button>
  </div>
`;

  downloadSection.innerHTML = cvHTML;
  downloadSection.style.display = 'block';

  const downloadBtn = document.getElementById("downloadBtn");
  const ImprimerBtn = document.getElementById("ImprimerBtn");
  const cvpreview = document.getElementById('cv-preview');

  if (downloadBtn && cvpreview) {
    downloadBtn.addEventListener("click", async () => {
      downloadBtn.disabled = true;
      const originalText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Génération en cours...';

      try {
        const dataUrl = await domtoimage.toPng(cvpreview, {
          quality: 1,
          bgcolor: '#ffffff',
          width: cvpreview.offsetWidth * 2,
          height: cvpreview.offsetHeight * 2,
          style: {
            transform: 'scale(2)',
            transformOrigin: 'top left'
          }
        });

        const img = new Image();

        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a3',
          compress: true
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (img.height * pageWidth) / img.width;

        const totalPages = Math.ceil(imgHeight / pageHeight);

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }

          const yOffset = -i * pageHeight;
          pdf.addImage(dataUrl, 'PNG', 0, yOffset, imgWidth, imgHeight, '', 'FAST');
        }

        pdf.save(`${userInformationCV.fullname || "mon_cv"}.pdf`);

        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;

      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');

        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;
      }
    });
    if (ImprimerBtn && cvpreview) {
      ImprimerBtn.addEventListener('click', () => {

        ImprimerBtn.disabled = true;
        const originalText = ImprimerBtn.innerHTML;
        ImprimerBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i> Préparation...';

        const printWindow = window.open("", "", "width=800,height=600");

        printWindow.document.write(`
              <html>
                <head>
                  <title>Impression CV</title>
                  <link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
                  <link rel="stylesheet" href="./assets/style.css">
                  <link rel="stylesheet" href="./assets/output.css">
                  <style>
                  @media print {
                      * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                      }
                    }
                    body { margin: 0; padding: 20px; }
                    #cv-preview { width: 100%; }
                  </style>
                </head>
                <body>
                  ${cvpreview.outerHTML}
                </body>
              </html>
            `);

        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          ImprimerBtn.disabled = false;
          ImprimerBtn.innerHTML = originalText;
        };
      });
    }


  }
}








//-----------------function pour l'update de steps---------------
const updateSteps = (e) => {
  if (e.target.id === "next") {
    let isValid = true;

    switch (currentStep) {
      case 1:
        isValid = validatePersonalInfo();
        break;
      case 2:
        isValid = validateProfessionalInfo();
        break;
      case 3:
        isValid = validateLanguages();
        break;
      case 4:
        isValid = validateExperiences();
        break;
    }

    if (!isValid) {
      return;
    }

    collectCurrentStepData();
    if (currentStep < circles.length) currentStep++;
  } else if (e.target.id === "prev" && currentStep > 1) {
    collectCurrentStepData();
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
//-----------------function pour l'affichage des donnes dans quel step---------------
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
      loadFromLocalStorage();
      persInfos.style.display = "block";
      break;
    case 2:
      rendreProfessionnelInfos();
      loadFromLocalStorage();
      profInfos.style.display = "block";
      break;
    case 3:
      rendreLanguages();
      loadFromLocalStorage();
      languages.style.display = "block";
      break;
    case 4:
      rendreExperiences();
      loadFromLocalStorage();
      experiences.style.display = "block";
      break;
    case 5:
      rendreTemplateSelection();
      loadFromLocalStorage();
      templateSelection.style.display = "block";
      downloadSection.style.display = 'block';

      break;
    default:
      break;
  }
};







//-----------------function pour la validation---------------
function validatePersonalInfo() {
  const fullName = document.getElementById("fullname")?.value.trim();
  const title = document.getElementById("title")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const tel = document.getElementById("telephone")?.value.trim();
  const adresse = document.getElementById("adresse")?.value.trim();

  if (!fullName || !title || !email || !tel || !adresse) {
    Swal.fire({
      icon: 'error',
      title: 'Champs manquants',
      text: 'Veuillez remplir tous les champs obligatoires.',
      draggable: true
    });
    return false;
  }

  if (!email.includes('@') || !email.includes('.')) {
    Swal.fire({
      icon: 'error',
      title: 'Email invalide',
      text: 'Veuillez entrer une adresse email valide.',
      draggable: true
    });
    return false;
  }

  return true;
}

//-----------------function pour la validation---------------
function validateProfessionalInfo() {
  const hardskills = document.querySelectorAll('#hardskillsContainer input');
  const educationGroups = document.querySelectorAll('.education-group');

  let hasHardskill = false;
  hardskills.forEach(input => {
    if (input.value.trim()) hasHardskill = true;
  });

  let hasEducation = false;
  educationGroups.forEach(group => {
    const degree = group.querySelector('input[placeholder*="Licence"]');
    if (degree?.value.trim()) hasEducation = true;
  });

  if (!hasHardskill) {
    Swal.fire({
      icon: 'error',
      title: 'Compétences techniques manquantes',
      text: 'Veuillez ajouter au moins une compétence technique.',
      draggable: true
    });
    return false;
  }

  if (!hasEducation) {
    Swal.fire({
      icon: 'error',
      title: 'Formation manquante',
      text: 'Veuillez ajouter au moins une formation.',
      draggable: true
    });
    return false;
  }

  return true;
}

//-----------------function pour la validation---------------
function validateLanguages() {
  const softskills = document.querySelectorAll('#softskillsContainer input');
  const languageGroups = document.querySelectorAll('.language-group');

  let hasSoftskill = false;
  softskills.forEach(input => {
    if (input.value.trim()) hasSoftskill = true;
  });

  let hasLanguage = false;
  languageGroups.forEach(group => {
    const langInput = group.querySelector('input');
    const levelSelect = group.querySelector('select');
    if (langInput?.value.trim() && levelSelect?.value) hasLanguage = true;
  });

  if (!hasSoftskill) {
    Swal.fire({
      icon: 'error',
      title: 'Soft skill manquante',
      text: 'Veuillez ajouter au moins une soft skill.',
      draggable: true
    });
    return false;
  }

  if (!hasLanguage) {
    Swal.fire({
      icon: 'error',
      title: 'Langue manquante',
      text: 'Veuillez ajouter au moins une langue avec son niveau.',
      draggable: true
    });
    return false;
  }

  return true;
}

//-----------------function pour la validation---------------
function validateExperiences() {
  const experienceGroups = document.querySelectorAll('.experience-group');

  let hasExperience = false;
  experienceGroups.forEach(group => {
    const position = group.querySelector('input[placeholder*="Développeur"]');
    if (position?.value.trim()) hasExperience = true;
  });

  if (!hasExperience) {
    Swal.fire({
      icon: 'error',
      title: 'Expérience manquante',
      text: 'Veuillez ajouter au moins une expérience professionnelle.',
      draggable: true
    });
    return false;
  }

  return true;
}




//---------localstorage-----------
function saveToLocalStorage() {
  localStorage.setItem("cvData", JSON.stringify(userInformationCV));
}
//---------localstorage-----------
function loadFromLocalStorage() {
  const saved = localStorage.getItem("cvData");
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(userInformationCV, parsed);
  }
}
//---------localstorage-----------
function removeFromLocalStorage() {
  localStorage.removeItem("cvData")
}



window.onload = () => {
  removeFromLocalStorage();
  rendrePersonnelInfos();
  persInfos.style.display = "block";
};

buttons.forEach((button) => button.addEventListener("click", updateSteps));