export function addTodo(userInput) {
  // console.log(userInput);

  return {
    type: 'ADD_TODO',
    input: {
      activity: userInput.activity,
      time: userInput.time,
      done: false,
      edit:false,
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

export function editTodoSelect(ID) {
  return {
    type: 'EDIT_TODO_SELECT',
    input: { id: ID },
  };
}

export function editTodoChange(userInput){
  return  { 
  type: 'EDIT_TODO_CHANGE',
  input: {
    id: userInput.id,
    activity: userInput.activity,
    time: userInput.time,
  },
};

}
