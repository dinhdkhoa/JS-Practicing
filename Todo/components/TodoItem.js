function TodoItem() {
  return ` <li>
  <div class="view">
    <input class="toggle" type="checkbox" />
    <label>Buy a unicorn</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Rule the web" />
</li>`;
}

export default TodoItem();
