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
    this.activities = this.activities.filter(a => a.id !== id);
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

function activityToHTML(activity) {
  const col = document.createElement('div');
  col.classList.add('col-md-4');

  const card = document.createElement('div');
  card.classList.add('card', 'h-100');

  const img = document.createElement('img');
  img.src = activity.imgUrl || 'img/perfil.jpg';
  img.classList.add('card-img-top');
  img.alt = activity.title;

  const body = document.createElement('div');
  body.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.innerText = activity.title;

  const desc = document.createElement('p');
  desc.classList.add('card-text');
  desc.innerText = activity.description;

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-danger', 'mt-2');
  btn.innerText = "Eliminar";
  btn.onclick = () => {
    repo.deleteActivity(activity.id);
    renderAllActivities();
  };

  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(btn);
  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

function renderAllActivities() {
  const container = document.getElementById('activities-container');
  container.innerHTML = '';
  repo.getAllActivities().forEach(a => container.appendChild(activityToHTML(a)));
}

function handleAddActivity(e) {
  e.preventDefault();
  const title = document.getElementById('title-input').value.trim();
  const desc = document.getElementById('description-input').value.trim();
  const img = document.getElementById('imgUrl-input').value.trim();
  const message = document.getElementById('form-message');

  if (!title || !desc || !img) {
    message.innerText = 'Por favor completá todos los campos.';
    setTimeout(() => message.innerText = '', 3000);
    return;
  }

  repo.createActivity({ title, description: desc, imgUrl: img });
  document.getElementById('form-actividad').reset();
  renderAllActivities();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAllActivities();
  document.getElementById('form-actividad').addEventListener('submit', handleAddActivity);
});