const SITE_AUTOR='Ruben Quisberth';
const API_BASE= 'https://jsonplaceholder.typicode.com';
const POKE_API= 'https://pokeapi.co/api/v2';
const COUNTRY_API= 'https://restcountries.com/v3.1';

let currentFilter = 'all';
let pokemonPage = 1;
let pojectsData=[];

const greet = (name) => `¡Hola desde el portafolio de ${name}! 🚀`;
console.log(greet(SITE_AUTOR));

const formatPrice = (amount) => `$${Number(amount).toLocaleString('es-BO')}`;

const devProfile = {
  name:     'Hebert Cussi',
  role:     'Full Stack Developer',
  location: 'La Paz, Bolivia',
  skills:   ['JavaScript', 'React', 'Node.js', 'Python'],
};

const { name, role, skills } = devProfile;           
const [mainSkill, ...otherSkills] = skills;         

console.log(`${name} – ${role}`);
console.log('Skill principal:', mainSkill);            
console.log('Otras skills:', otherSkills);             
const frontEnd  = ['React', 'Angular', 'TypeScript'];
const backEnd   = ['Node.js', 'Express', 'Django'];
const allTechs  = [...frontEnd, ...backEnd];           
console.log('Stack completo:', allTechs);

const updatedProfile = { ...devProfile, available: true };
console.log('Perfil actualizado:', updatedProfile);

class Project {
    #id;
    constructor({id,title, description, techs,emoji,category}) {
        this.#id=id;
        this.title=title;
        this.description=description;
        this.techs=techs;
        this.emoji=emoji;
        this.category=category;
    }
    get id(){
        return this.#id;
    }
    toHTML() {
    const badges = this.techs
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join('');

    return `
      <article class="project-card" data-id="${this.#id}" data-category="${this.category}">
        <div class="project-img" aria-hidden="true">${this.emoji}</div>
        <div class="project-info">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <footer class="project-tags">${badges}</footer>
        </div>
      </article>`;
  }
}

const localProjects = [
  new Project({
    id: 1, category: 'frontend', emoji: '📱',
    title: 'App de Tareas',
    description: 'Aplicación web con drag & drop, almacenamiento local y modo oscuro.',
    techs: ['React', 'CSS Modules', 'Flexbox'],
  }),
  new Project({
    id: 2, category: 'frontend', emoji: '🌿',
    title: 'EcoShop',
    description: 'E-commerce sostenible con sistema de filtros y carrito de compras.',
    techs: ['HTML5', 'CSS Grid', 'JavaScript'],
  }),
  new Project({
    id: 3, category: 'fullstack', emoji: '📊',
    title: 'Dashboard Analytics',
    description: 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.',
    techs: ['Node.js', 'PostgreSQL', 'Chart.js'],
  }),
  new Project({
    id: 4, category: 'backend', emoji: '🔧',
    title: 'REST API – Inventario',
    description: 'API REST completa con autenticación JWT y documentación Swagger.',
    techs: ['Express', 'MySQL', 'JWT'],
  }),
  new Project({
    id: 5, category: 'fullstack', emoji: '🌍',
    title: 'GeoWeather App',
    description: 'Consulta clima en tiempo real usando la API de OpenWeather y países.',
    techs: ['React', 'Fetch API', 'OpenWeather'],
  }),
];

console.log(localProjects);

const filterProjects = (category) => 
    category === 'all' 
    ? localProjects 
    : localProjects.filter(p => p.category === category);

const getTitles = () => localProjects.map(p => p.title);    
const countByProjects = localProjects.reduce((acc,p)=>{
    acc[p.category]=(acc[p.category]||0)+1;
    return acc;
},{});

const findProject=(id)=> localProjects.find(p=>p.id===id);

console.log('Titulos',getTitles());
console.log('Por Categoria',countByProjects);

const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const pokeSection = document.getElementById('poke-section');
const pokeGrid = document.getElementById('poke-grid');
const pokeBtnNext = document.getElementById('poke-next');
const countryInput   = document.getElementById('country-search');
const countryResult  = document.getElementById('country-result');

if (pokeBtnNext) {
  pokeBtnNext.addEventListener('click', () => {
    pokemonPage++;
    const offset = (pokemonPage - 1) * 6;
    fetchPokemons(offset);
  });
}
function renderProjects(category = 'all') {
  if (!projectsGrid) return;

  const filtered = filterProjects(category);

  projectsGrid.innerHTML = filtered
    .map(p => p.toHTML())
    .join('');

  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  const counter = document.getElementById('project-count');
  if (counter) counter.textContent = `${filtered.length} proyectos`;
}

renderProjects('all');


filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentFilter = e.currentTarget.dataset.filter;
    renderProjects(currentFilter);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();                              
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


function saveFormDraft(data) {
  localStorage.setItem('form-draft', JSON.stringify(data));  
}
function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) resolve({ ok: true, email });
              else reject(new Error(`Email inválido: ${email}`));
        }, 500);
    });
}

validateEmail('hebert@ejemplo.com')
  .then(({ email }) => console.log(`✅ Email válido: ${email}`))
  .catch(err => console.error('❌', err.message));

/**manejo de errores en fetch */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  return await res.json();              
}

 async function fetchProjects() {
    const loader= document.getElementById('project-loader');
    if(loader) loader.classList.remove('hidden');
    try {
        const posts = await fetchJSON(`${API_BASE}/posts?_limit=5`);
        console.log(posts);
        const extra=posts.map(({id,title,boby})=> new Project({
            id: id+100,
            category: 'api',
            emoji: '🔗',
            title: title.slice(0,40)+'...',
            description: boby(0,80) +'...',
            techs: ['API', 'Fetch', 'Async/Await']
        }));
        projectsData=[...localProjects,...extra];
        showToast('Proyectos cargados desde API');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        showToast('Error al cargar proyectos', 'error');        
    } finally{
        if(loader) loader.classList.add('hidden');
    }
 }

 async function fetchPokemons(offset = 0) {
  if (!pokeGrid) return;

  pokeGrid.innerHTML = '<p class="loading-text">Cargando Pokémon...</p>';

  try {
    const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);

    const details = await Promise.all(
      data.results.map(p => fetchJSON(p.url))       
    );

    pokeGrid.innerHTML = details.map(({ name, id, sprites, types }) => {
      const type = types[0].type.name;
      const img  = sprites.other['official-artwork'].front_default
                || sprites.front_default;
      return `
        <div class="poke-card poke--${type}">
          <img src="${img}" alt="${name}" loading="lazy" />
          <p class="poke-name">${name}</p>
          <span class="poke-type">${type}</span>
        </div>`;
    }).join('');

  } catch (err) {
    pokeGrid.innerHTML = `<p class="error-text">Error: ${err.message}</p>`;
  }
}

async function fetchCountry(query) {
  if (!countryResult || !query.trim()) return;

  countryResult.innerHTML = '<p>Buscando país...</p>';

  try {
    const countries = await fetchJSON(
      `${COUNTRY_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,region`
    );

    countryResult.innerHTML = countries.slice(0, 5).map(country => {
      const {
        name: { common },
        capital = ['N/A'],
        population,
        flags: { svg },
        region
      } = country;

      return `
        <div class="country-card">
          <img src="${svg}" alt="Bandera de ${common}" class="country-flag" />
          <div class="country-info">
            <h4>${common}</h4>
            <p>🏛 Capital: <strong>${capital[0]}</strong></p>
            <p>🌍 Región: <strong>${region}</strong></p>
            <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
    console.error(error);
  }
}

let searchTimer;
if (countryInput) {
  countryInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchCountry(e.target.value), 600);
  });
}

async function loadDashboardData(){
    try {
        const [posts, users, todos] = await Promise.all([
            fetchJSON(`${API_BASE}/posts?_limit=5`),
            fetchJSON(`${API_BASE}/users?_limit=5`),
            fetchJSON(`${API_BASE}/todos?_limit=5`)
        ]);
        console.log('Posts:', posts);
        console.log('Users:', users);
        console.log('Todos:', todos);

        showToast('Datos del dashboard cargados');     
    } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        showToast('Error al cargar datos del dashboard', 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (pokeSection) fetchPokemons(0);

} );