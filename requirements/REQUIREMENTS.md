# SPA test exercise

## GOAL TODO’S

The objective of the exercise is to display a list of tasks with two statuses: completed and incompleted. In addition, several filtering options are available.

## Functionality

### Emtpy todos

When there are no todo’s, `#main` and `#footer` should be hidden.

![image1](./docs-images/image1.png)

---

### New todo

New todo’s are entered in the input at the top of the app. The input element should be
focused when the page is loaded, preferably by using the `autofocus` input attribute. Pressing
Enter creates the todo, appends it to the todo list, and clears the input. Make sure to `.trim()`
the input and then check that it's not empty before creating a new todo.

![image2](./docs-images/image2.png)

---

### Mark all as complete

This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked
state after the "Clear completed" button is clicked. The "Mark all as complete" checkbox
should also be updated when single todo items are checked/unchecked. Eg. When all the todos
are checked it should also get checked.

![image3](./docs-images/image3.png)

---

### Item

A todo item has three possible interactions:

1.- Clicking the checkbox marks the todo as complete by updating its `completed` value and toggling the class completed on its parent `<li>`

![image4](./docs-images/image4.png)

2.- Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`

![image5](./docs-images/image5.png)

3.- Hovering over the todo shows the remove button (`.destroy`)

![image6](./docs-images/image6.png)

---

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

---

### Counter

Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a`<strong>` tag. Also make sure to pluralize the item word correctly: 0 items, 1 item, 2 items. Example: 2 items left

![image7](./docs-images/image7.png)

---

### Clear completed button

Removes completed todos when clicked. Should be hidden when there are no completed todos.

---

### Persistence

Your app should dynamically persist the todos to Vuex store. Editing mode should not be persisted.

---

### Routing

Routing is required for all implementations. The following routes should be implemented:

`#/ (all - default)`

`#/active`

`#/completed`

When the route changes, the todo list should be filtered on a model level and the `selected` class on the filter links should be toggled. When an item is updated while in a filtered state, it should be updated accordingly. E.g. if the filter is `Active` and the item is checked, it should be hidden. Make sure the active filter is persisted on reload.

---

### API Rest services (Optional)

Implement CRUD services for **create**, **update** and **delete** the todo’s actions above described. Http client such as axios is allowed. Before sending each request, it should create a mock server to simulate each endpoint and its corresponding response.


## Requisitos

La prueba debe realizarse bajo el paradigma SPA, usando VueJS para el desarrollo de los diferentes componentes que puedan identificarse y Vuex para el manejo del estado interno.

Se proporciona el CSS en un archivo único que deberá ser fraccionado para dotar a los componentes de los estilos que procedan en cada fuente **.vue**.

Se valorará positivamente:

• Una implementación en Typescript. Para facilitar la integración Vue / Vuex con
Typescript, se recomienda el uso de las librerías vue-property-decorator y vuexmodule-decorators

• El uso de funciones nativas javascript ES6.

• Una correcta jerarquización de las vistas / contenedores / componentes

• Incluir test unitarios

Deberá proporcionarse el código fuente del proyecto acompañado de un README.txt con las instrucciones de ejecución.