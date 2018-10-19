import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import TodoList from './TodoList';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="jumbotron py-2 bg-primary text-white">
            <h1 className="text-center">Todo list</h1>
          </div>
          <div>
            <TodoList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
