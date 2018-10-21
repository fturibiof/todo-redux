export function addTodo(userInput) {
  // console.log(userInput);

  return {
    type: 'ADD_TODO',
    input: {
      activity: userInput.activity,
      time: userInput.time,
      done: false,
    },
  };
}

export function doneTodo(ID) {
  return {
    type: 'DONE_TODO',
    input: { id: ID },
  };
}

export function deleteTodo(ID) {
  return {
    type: 'DELETE_TODO',
    input: { id: ID },
  };
}

export function editTodo(ID) {
  return {
    type: 'EDIT_TODO',
    input: { id: ID },
  };
}
