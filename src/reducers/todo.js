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
    case 'GET_STORAGE':
      // const storageList = JSON.parse(localStorage.getItem('activities')) || [];
      const getList = action.data.map(hit => ({
        id: hit._source.id,
        activity: hit._source.activity,
        time: hit._source.time,
        place: hit._source.place,
        done: hit._source.done,
      }));
      return getList;

    case 'ADD_TODO':
      const ids = state.map(item => item.id);
      const inputId = Math.max(...ids) + 1;
      return [
        ...state,
        {
          id: inputId,
          activity: action.input.activity,
          time: action.input.time,
          place: action.input.place,
          done: action.input.done,
          edit: false,
        },
      ];
    case 'DONE_TODO':
      const selected = state.filter(item => item.id === action.input.id)[0];
      // console.log(selected);
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
      return listEditSelect;

    case 'EDIT_TODO_CHANGE':
      //edit activity with edit:true
      const listEditChange = state.map(item => ({
        ...item,
        activity: item.id === action.input.id ? action.input.activity : item.activity,
        time: item.id === action.input.id ? action.input.time : item.time,
        place: item.id === action.input.id ? action.input.place : item.place,
        edit: item.id === action.input.id ? false : item.edit,
      }));
      return listEditChange;

    default:
      return state;
  }
}
