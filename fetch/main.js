const URL = "http://localhost:3000/posts";

let html;
const renderCourses = (courses) => {
  html = courses.map((course) => {
    return `
    <div class="course-item-${course.id}">
      <h4>${course.title}</h4>
      <li>${course.description}</li>
      <button id="button${course.id}" onclick=handleDelete(${course.id})>Delete</button>
      <button class="edit-button-button${course.id}" onclick=handleEdit(${course.id})>Edit</button>
    </div>  
    `;
  });
  document.querySelector("ul").innerHTML = html.join("");
};

const app = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((courses) => renderCourses(courses));
};

const handleEdit = (id) => {
  const editDescription = document.querySelector(
    `.course-item-${id} li`
  ).innerText;
  const editTitle = document.querySelector(`.course-item-${id} h4`).innerText;
  document.querySelector('input[name="title"]').value = editTitle;
  document.querySelector('input[name="description"]').value = editDescription;
  document.getElementById("add").innerText = "Edit";
  document.getElementById("add").onclick = handleEditAPI(id);
};

const handleEditAPI = (id) => () => {
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const postBody = {
    title: title,
    description: description,
  };
  fetch(URL + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  }).then(() => {
    //   document.getElementById("add").onclick = handleOnClick;
    //   document.querySelector('input[name="title"]').value = '';
    // document.querySelector('input[name="description"]').value = '';
    // document.getElementById("add").innerText = "Add";
    app();
  });
};

const handleDelete = (id) => {
  fetch(URL + "/" + id, {
    method: "DELETE",
  }).then(() => document.querySelector(`.course-item-${id}`).remove());
};

const handleOnClick = () => {
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const postBody = {
    title: title,
    description: description,
  };
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  }).then(() => {
    app();
    document.querySelector('input[name="title"]').value = "";
    document.querySelector('input[name="description"]').value = "";
  });
};

document.getElementById("add").onclick = handleOnClick;

app();
