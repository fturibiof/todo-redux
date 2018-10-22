import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
  countDone = () => {
    let counter = 0;
    this.props.todo.forEach(element => {
      if (element.done) counter = counter + 1;
    });
    return counter;
  };
  render() {
    return (
      <div className="my-1">
        <h3>
          Você tem {this.props.todo.length - this.countDone()}{' '}
          {this.props.todo.length - this.countDone() > 1 ? 'atividades pendentes' : 'atividade pendente'}  e {this.countDone()}{' '}
          {this.countDone() > 1 ? 'atividades concluídas' : 'atividade concluída'}
        </h3>
      </div>
    );
  }
}

const mapState = state => ({
  todo: state.todo,
});

export default connect(mapState)(Counter);
