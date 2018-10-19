export default function todo(state = [], action){

    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id:Math.random(),
                activity:action.input.activity,
                time:action.input.time,
                done:action.input.done,
            }]
            
    
        default:
        return state;
            
    }

};