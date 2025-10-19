
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this._nextId = 1;
    }

    
    getAllActivities() {
        return this.activities;
    }

    
    createActivity({ title, description, imgUrl }) {
        const id = this._nextId++;
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
        return newActivity;
    }


    deleteActivity(id) {
        const prevLength = this.activities.length;
        this.activities = this.activities.filter(activity => activity.id !== id);
        return this.activities.length !== prevLength; 
    }
}

const repo = new Repository();


repo.createActivity({
    title: "Diseño de red FTTH",
    description: "Planificación y despliegue de red de fibra óptica.",
    imgUrl: "img/fibra.jpg"
});
repo.createActivity({
    title: "Mantenimiento preventivo",
    description: "Revisión de troncales y reemplazo de conectores.",
    imgUrl: "img/mantenimiento.jpg"
});


function activityToHTML(activityInstance) {

    const { id, title, description, imgUrl } = activityInstance;


    const card = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const actions = document.createElement('div');
    const btnDelete = document.createElement('button');


    img.src = imgUrl || 'img/perfil.jpg'; 
    img.alt = title;
    img.style.width = '100%';
    img.style.height = '140px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px 8px 0 0';
    img.style.display = 'block';

    h3.innerText = title;
    p.innerText = description;


    btnDelete.innerText = 'Eliminar';
    btnDelete.setAttribute('data-id', id);
    btnDelete.type = 'button';
    card.classList.add('actividad-card');
    actions.classList.add('actividad-actions');
    btnDelete.classList.add('actividad-delete');


    const content = document.createElement('div');
    content.style.padding = '12px';
    content.appendChild(h3);
    content.appendChild(p);

    actions.style.display = 'flex';
    actions.style.justifyContent = 'flex-end';
    actions.style.padding = '8px 12px 12px';

    btnDelete.style.cursor = 'pointer';
    btnDelete.style.background = '#c0392b';
    btnDelete.style.color = '#fff';
    btnDelete.style.border = 'none';
    btnDelete.style.padding = '8px 10px';
    btnDelete.style.borderRadius = '6px';

    actions.appendChild(btnDelete);

    card.style.border = '1px solid #e0e0e0';
    card.style.borderRadius = '10px';
    card.style.overflow = 'hidden';
    card.style.background = '#fff';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';

 
    card.appendChild(img);
    card.appendChild(content);
    card.appendChild(actions);

 
    btnDelete.addEventListener('click', () => {
        const idToDelete = Number(btnDelete.getAttribute('data-id'));
        const deleted = repo.deleteActivity(idToDelete);
        if (deleted) {
            renderAllActivities(); 
        } else {
            
            alert('No se pudo eliminar la actividad (id no encontrada).');
        }
    });

    
    return card;
}


function renderAllActivities() {
    const container = document.getElementById('activities-container');
    if (!container) {
        console.warn('No se encontró el contenedor #activities-container');
        return;
    }

  
    container.innerHTML = '';


    const all = repo.getAllActivities();

   
    const elements = all.map(activityToHTML);


    elements.forEach(el => container.appendChild(el));
}

function handleAddActivity(event) {
  
    if (event) event.preventDefault();


    const titleInput = document.getElementById('title-input');
    const descInput = document.getElementById('description-input');
    const imgInput = document.getElementById('imgUrl-input');
    const messageSpan = document.getElementById('form-message');

 
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const imgUrl = imgInput.value.trim();

    if (!title || !description || !imgUrl) {
        messageSpan.innerText = 'Por favor completá todos los campos.';
    
        setTimeout(() => { messageSpan.innerText = ''; }, 3000);
        return;
    }


    repo.createActivity({ title, description, imgUrl });


    titleInput.value = '';
    descInput.value = '';
    imgInput.value = '';

   
    renderAllActivities();
}


function initActivitiesModule() {
    const form = document.getElementById('form-actividad');
    const btn = document.getElementById('btn-add-actividad');

    if (!form) {
        console.warn('No se encontró el form #form-actividad');
        return;
    }


    form.addEventListener('submit', handleAddActivity);


    renderAllActivities();
}


document.addEventListener('DOMContentLoaded', initActivitiesModule);


const repo = new Repository();

repo.createActivity(1, "Diseño de red FTTH", "Planificación y despliegue de red de fibra óptica.", "img/fibra.jpg");
repo.createActivity(2, "Empalmes y fusiones", "Empalme de fibras y medición con OTDR.", "img/empalme.jpg");
repo.createActivity(3, "Mantenimiento preventivo", "Revisión de troncales y reemplazo de conectores.", "img/mantenimiento.jpg");


console.log("📋 Actividades registradas:", repo.getAllActivities());


repo.deleteActivity(2);

console.log("🗑️ Después de eliminar:", repo.getAllActivities());
