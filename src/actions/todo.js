export function addTodo(userInput){
    // console.log(userInput);
    
    return{
        type:'ADD_TODO',
        input:{
            activity:userInput.activity,
            time:userInput.time,
            done:false,
        }
    }
}