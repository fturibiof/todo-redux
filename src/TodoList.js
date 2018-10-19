import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoActions from './actions/todo';
import ListItem from './ListItem';

class TodoList extends Component {
  state = {
    input: {
      activity: '',
      time: '',
    },
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      input: {...this.state.input, [name]: value },
    });
    this.setState();
  };

  addNewTodo = () => {
    console.log(this.state.input);
      
    this.props.addTodo(this.state.input);
    this.setState({
      input: { activity: '', time: '' },
    });
  };
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Horario</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <ListItem />
          </tbody>
          <input type="text" name="activity" value={this.state.input.activity} onChange={this.handleInput} />
          <input type="text" name="time" value={this.state.input.time} onChange={this.handleInput} />
          <button className="btn btn-primary" type="submit" onClick={this.addNewTodo}>
            Enviar
          </button>
        </table>
      </div>
    );
  }
}

const mapActions = dispatch => bindActionCreators(todoActions, dispatch);

export default connect(
  null,
  mapActions,
)(TodoList);
