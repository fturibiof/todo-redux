import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import TodoList from './TodoList';
import Counter from './Counter';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="mx-3">
          <div className="jumbotron py-2 bg-primary text-white">
            <h1 className="text-center">Todo List</h1>
          </div>
          <div>
            <TodoList />
            <Counter/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
