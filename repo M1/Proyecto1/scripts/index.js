const btnAgregar = document.getElementById('agregar');
const contenedor = document.getElementById('actividades');

btnAgregar.addEventListener('click', () => {
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const imagen = document.getElementById('imagen').value.trim();

  if (titulo === '' || descripcion === '') {
    alert('Por favor completa el título y la descripción.');
    return;
  }

  const card = document.createElement('div');
  card.className = 'col-md-6 col-lg-4';
  card.innerHTML = `
    <div class="card h-100 shadow-sm">
      ${imagen ? `<img src="${imagen}" class="card-img-top" alt="${titulo}">` : ''}
      <div class="card-body">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">${descripcion}</p>
        <button class="btn btn-danger w-100">Eliminar</button>
      </div>
    </div>
  `;

  card.querySelector('button').addEventListener('click', () => card.remove());
  contenedor.appendChild(card);

  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('imagen').value = '';
});
