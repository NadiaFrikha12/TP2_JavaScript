let tasks = [];
console.log("Bienvenue");

// Sélections DOM
const input = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const taskUl = document.getElementById("tasks");
const searchInput = document.getElementById("search-task");
const clearAllBtn = document.getElementById("clear-all");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const doneCount = document.getElementById("done-count");

// Charger depuis localStorage
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

// Sauvegarde
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ajouter tâche
function ajouterTache() {
  const text = input.value.trim();
  if (text === "") return;

  const newTask = { texte: text, terminee: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = "";
}

// Supprimer tâche
function supprimerTache(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Terminer tâche
function terminerTache(index) {
  tasks[index].terminee = !tasks[index].terminee;
  saveTasks();
  renderTasks();
}

// Affichage
function renderTasks(filter = "") {
  taskUl.innerHTML = "";

  tasks
    .filter(t => t.texte.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = task.texte;
      span.classList.add("task-text");
      if (task.terminee) span.classList.add("completed");

      // Bouton terminer
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Terminer";
      doneBtn.classList.add("done-btn");
      doneBtn.onclick = () => terminerTache(index);

      // Bouton supprimer
      const delBtn = document.createElement("button");
      delBtn.textContent = "Supprimer";
      delBtn.classList.add("delete-btn");
      delBtn.onclick = () => supprimerTache(index);

      li.appendChild(span);
      li.appendChild(doneBtn);
      li.appendChild(delBtn);
      taskUl.appendChild(li);
    });

  // Compteurs
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.filter(t => !t.terminee).length;
  doneCount.textContent = tasks.filter(t => t.terminee).length;
}

// Événements
addBtn.addEventListener("click", ajouterTache);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") ajouterTache();
});
searchInput.addEventListener("input", e => renderTasks(e.target.value));
clearAllBtn.addEventListener("click", () => {
  if (confirm("Supprimer toutes les tâches ?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});
