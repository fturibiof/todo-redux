// const initialState = {
//   listActivities: {
//     id: '',
//     activity: '',
//     time: '',
//     done: '',
//   },
//   edit: false,
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
        },
      ];
    case 'DONE_TODO':
      const selected = state.filter(item => item.id === action.input.id)[0];
      console.log(selected.id);
      const list = state.map(item => ({
        ...item,
        done: item.id === selected.id ? true : item.done,
      }));
      return list;

    case 'DELETE_TODO':
      const newList = state.filter(item => item.id !== action.input.id);
      return newList;

    // case 'EDIT_TODO':
    //   const selected = state.filter(item => item.id === action.input.id);
    //   console.log(selected);
    //   return [...state, { edit: true }]; //ele cria outro item sem nada, so com o edit true

    default:
      return state;
  }
}
