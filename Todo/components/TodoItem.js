function TodoItem({ title, completed }, index, editIndex) {
  return `<li class="${completed && "completed"} ${
    editIndex === index && "editing"
  }">
  <div class="view">
    <input class="toggle" type="checkbox" ${completed && "checked"}
    onchange="dispatch('toggle', ${index})"
    />
    <label ondblclick="dispatch('setEditIndex', ${index})">${title}</label>
    <button class="destroy" onclick="dispatch('delete', ${index})"></button>
  </div>
  <input class="edit" value="${title}" 
  onkeyup="(event.keyCode === 13 && dispatch('edit', this.value.trim())) ||
  event.keyCode === 27 && dispatch('stopEdit')
  "
  onblur="dispatch('edit', this.value.trim())"
  />
</li>`;
}

export default TodoItem;
