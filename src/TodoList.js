import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as todoActions from './actions/todo';
import ListItem from './ListItem';

class TodoList extends Component {
  state = {
    input: {
      id: '',
      activity: '',
      time: '',
    },
    edit: false,
  };

  componentDidMount() {
    this.props.getStorage();
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      input: { ...this.state.input, [name]: value },
    });
  };

  addNewTodo = async e => {
    e.preventDefault();
    await this.props.addTodo(this.state.input);
    localStorage.setItem('activities', JSON.stringify(this.props.todo));
    this.setState({
      input: { id: '', activity: '', time: '' },
    });
  };

  handleDone = async id => {
    await this.props.doneTodo(id);
    localStorage.setItem('activities', JSON.stringify(this.props.todo));
  };

  handleDelete = async id => {
    //   console.log(id);
    await this.props.deleteTodo(id);
    localStorage.setItem('activities', JSON.stringify(this.props.todo));
  };

  handleEdit = async id => {
    await this.props.editTodoSelect(id);
    const itemToEdit = await this.props.todo.filter(item => item.edit === true)[0];
    console.log(itemToEdit);
    this.setState({
      input: {
        id: itemToEdit.id,
        activity: itemToEdit.activity,
        time: itemToEdit.time,
      },
      edit: true,
    });
    // console.log(this.state);
  };

  handleEditChange = async e => {
    await this.props.editTodoChange(this.state.input);
    localStorage.setItem('activities', JSON.stringify(this.props.todo));
    this.setState({
      input: { id: '', activity: '', time: '' },
      edit: false,
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Horário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <ListItem
              item={this.props.todo}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onDone={this.handleDone}
            />
          </tbody>
        </table>
        <input className="mr-3" placeholder="Atividade" type="text" name="activity" value={this.state.input.activity} onChange={this.handleInput} />
        <input className="mr-3" placeholder="Horário" type="text" name="time" value={this.state.input.time} onChange={this.handleInput} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.state.edit ? this.handleEditChange : this.addNewTodo}
        >
          {this.state.edit ? 'Editar' : 'Enviar'}
        </button>
      </div>
    );
  }
}
const mapState = state => ({
  todo: state.todo,
});
const mapActions = dispatch => bindActionCreators(todoActions, dispatch);

export default connect(
  mapState,
  mapActions,
)(TodoList);
