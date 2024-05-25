
// Obtener los elementos
var input = document.getElementById("tareas_ingresadas");
var boton = document.getElementById("boton_agregar");
var listaTareas = document.getElementById("lista_tareas");
var estadoTareas = document.getElementsByClassName("estado_tareas");

var arregloTareas = [... estadoTareas];

var tareasPendientes = 0;
var tareasCompletas = 0;

function agregarTareas() {
	var nuevaTarea = input.value;

	// Crear elementos
	var nuevoArticulo = document.createElement("li");
	nuevoArticulo.style.background = "white";

	var nuevoSpan = document.createElement("span");
	nuevoSpan.innerHTML = nuevaTarea;

	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.style.position = "absolute";
	checkbox.style.top = "0.4rem";
	checkbox.style.left = "9rem";

	var basurero = document.createElement("button");
	basurero.innerHTML = "Borrar";

	// Cambiar el estado de las tareas
	checkbox.addEventListener("change", () => {
		if (checkbox.checked) {

			tareasCompletas++;
			arregloTareas[1].innerHTML = `Tareas completadas: ${tareasCompletas}`;

		} else {
			tareasCompletas--;
			arregloTareas[1].innerHTML = `Tareas completadas: ${tareasCompletas}`;
		}
	});	

	// Borrar elemento
	basurero.addEventListener("click", () => {
		listaTareas.removeChild(nuevoArticulo);

		// Disminuir cantidad de tareas
		tareasPendientes--;
		arregloTareas[0].innerHTML = `Tareas pendientes: ${tareasPendientes}`;
	});

	// Agregar los elementos
	if(nuevaTarea != "") {

		nuevoArticulo.appendChild(checkbox);
		nuevoArticulo.appendChild(nuevoSpan);
		nuevoArticulo.appendChild(basurero);
		listaTareas.append(nuevoArticulo);

		// Aumentar cantidad de tareas
		tareasPendientes++;
		arregloTareas[0].innerHTML = `Tareas pendientes: ${tareasPendientes}`;
	}

	// Limpiar el valor del input
	input.value = "";
}

boton.addEventListener("click", agregarTareas);