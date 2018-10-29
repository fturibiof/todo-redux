import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import elastic from 'elasticsearch';

import * as todoActions from './actions/todo';
import ListItem from './ListItem';
import SearchResult from './SearchResult';

class TodoList extends Component {
  state = {
    input: {
      id: '',
      activity: '',
      time: '',
      place: 'SP',
    },
    edit: false,
    client: new elastic.Client({
      host: 'localhost:9200',
      log: 'trace',
    }),
    search: '',
  };

  async componentDidMount() {
    const res = await this.state.client.search({
      index: 'todolist',
    });
    this.props.getStorage(res.hits.hits);
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      input: { ...this.state.input, [name]: value },
    });
  };
  handleInputSearch = e => {
    const value = e.target.value;
    this.setState({
      search: value,
    });
  };

  addNewTodo = async e => {
    e.preventDefault();
    await this.props.addTodo(this.state.input);
    // console.log(this.props.todo);
    const results = await this.state.client.search({
      index: 'todolist',
    });
    const ids = results.hits !== undefined ? await results.hits.hits.map(item => item._source.id) : 0;
    console.log(ids);
    
    const idInput = ids === 0 ? 1 : Math.max(...ids) + 1;
    let latlon;
    switch(this.state.input.place){
      case("SP"):
      latlon = "-23.5721,-46.5870";
      break;
      case("NY"):
      latlon = "40.730610,-73.935242";
      break;
      case("SF"):
      latlon = "37.773972,-122.431297";
      break;
      default:

    }
    await this.state.client.create({
      index: 'todolist',
      type: '_doc',
      id: idInput,
      body: {
        id: idInput,
        activity: this.state.input.activity,
        time: this.state.input.time,
        place: this.state.input.place,
        location: latlon,
        done:false,
      },
    });
    // localStorage.setItem('activities', JSON.stringify(this.props.todo));
    this.setState({
      input: { id: '', activity: '', time: '' },
    });
  };

  handleDone = async idDone => {
    await this.props.doneTodo(idDone);
    await this.state.client.updateByQuery({
      index: 'todolist',
      body: {
        query: {
          match: { id: idDone },
        },
        script: { inline: 'ctx._source.done=true' },
      },
    });
    // localStorage.setItem('activities', JSON.stringify(this.props.todo));
  };

  handleDelete = async id => {
    console.log(id);
    await this.props.deleteTodo(id);
    await this.state.client.deleteByQuery({
      index: 'todolist',
      body: {
        query: {
          term: { id: id },
        },
      },
    });
    // localStorage.setItem('activities', JSON.stringify(this.props.todo));
  };

  handleEdit = async id => {
    await this.props.editTodoSelect(id);
    const itemToEdit = await this.props.todo.filter(item => item.edit === true)[0];
    this.setState({
      input: {
        id: itemToEdit.id,
        activity: itemToEdit.activity,
        time: itemToEdit.time,
        place: itemToEdit.place,
      },
      edit: true,
    });
    // console.log(this.state);
  };

  handleEditChange = async e => {
    await this.props.editTodoChange(this.state.input);
    const activity = this.state.input.activity;
    const time = this.state.input.time;
    const place = this.state.input.place;
    await this.state.client.updateByQuery({
      index: 'todolist',
      body: {
        query: {
          match: { id: this.state.input.id },
        },
        script: {
          inline: 'ctx._source.activity=' + activity,
        },
      },
    });

    // localStorage.setItem('activities', JSON.stringify(this.props.todo));
    this.setState({
      input: { id: '', activity: '', time: '' },
      edit: false,
    });
  };

  handleSearch() {}

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Horário</th>
              <th>Local</th>
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
        <div className="row mb-2">
          <div className="col-3">
            <label>Atividade</label>
            <input
              className="mr-3"
              placeholder="Atividade"
              type="text"
              name="activity"
              value={this.state.input.activity}
              onChange={this.handleInput}
            />
          </div>
          <div className="col-3">
            <label>Data e hora</label>
            <input
              className="mr-3"
              placeholder="Horário"
              type="datetime-local"
              name="time"
              value={this.state.input.time}
              onChange={this.handleInput}
            />
          </div>
          <div className="col-3">
            <label>Local</label>
            <br />
            <select name="place" value={this.state.input.place} onChange={this.handleInput}>
              <option value="SP">São Paulo</option>
              <option value="NY">New York</option>
              <option value="SF">San Francisco</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={this.state.edit ? this.handleEditChange : this.addNewTodo}
        >
          {this.state.edit ? 'Editar' : 'Enviar'}
        </button>
        <hr />
        <div>
          <label>Buscar</label>
          <br />
          <input placeholder="Buscar" value={this.state.search} onChange={this.handleInputSearch} />
          {/* <button type='submit' onClick={this.handleSearch}>Buscar</button> */}
          <ul>
            <SearchResult search={this.state.search} />
          </ul>
        </div>
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
