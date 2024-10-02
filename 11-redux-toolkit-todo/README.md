https://redux-toolkit.js.org/tutorials/quick-start


### Update todo - assignment
- `Lift the State:` Move the `input` state from `AddTodo` to the parent component that renders both AddTodo and `Todos` (assuming they are rendered in the same component). This will allow the `Todos` component to update the `input` when an edit button is clicked.

- `Update State on Edit:` When you click the edit button in the `Todos` component, the selected todo's text and `id` will be passed back to the parent, which will update the `input` in the `AddTodo` component.

- `Handle Update:` In the `AddTodo` component, check if the todo is being edited (based on whether an `id` is set). If editing, dispatch `updateTodo`, otherwise dispatch `addTodo`.