export function saveToLS(todos) {
  localStorage.setItem("TODOS", JSON.stringify(todos));
}

export function getFromLS() {
  return JSON.parse(localStorage.getItem("TODOS")) || [];
}
