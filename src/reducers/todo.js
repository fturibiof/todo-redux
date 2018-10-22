// const initialState = {
//   listActivities: {
//     id: '',
//     activity: '',
//     time: '',
//     done: '',
//   },
//   // edit: false,
// };

export default function todo(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Math.random(),
          activity: action.input.activity,
          time: action.input.time,
          done: action.input.done,
          edit: false,
        },
      ];
    case 'DONE_TODO':
      const selected = state.filter(item => item.id === action.input.id)[0];
      const list = state.map(item => ({
        ...item,
        done: item.id === selected.id ? true : item.done,
      }));
      return list;

    case 'DELETE_TODO':
      const newList = state.filter(item => item.id !== action.input.id);
      return newList;

    case 'EDIT_TODO_SELECT':
      //set edit to true
      const chosen = state.filter(item => item.id === action.input.id)[0];
      const listEditSelect = state.map(item => ({
        ...item,
        edit: item.id === chosen.id ? true : item.edit,
      }));
      // console.log(listEditSelect);
      return listEditSelect;

    case 'EDIT_TODO_CHANGE':
      //edit activity with edit:true
      const listEditChange = state.map(item => ({
        ...item,
        activity: item.id === action.input.id ? action.input.activity : item.activity,
        time: item.id === action.input.id ? action.input.time : item.time,
        edit: item.id === action.input.id ? false : item.edit,
      }));
      // console.log(action.input);
      
      return listEditChange;

    default:
      return state;
  }
}
