import React, { Component } from 'react';
import elastic from 'elasticsearch';


export default class SearchResult extends Component {
  state = {
    client:  new elastic.Client({
      host: 'localhost:9200',
      // log: 'trace',
    }),
    results:[],
  }
  
  componentWillReceiveProps(){
    // console.log(this.props.search);
    this.searchResults(this.props.search);
  }

  async searchResults(search){
    const res = await this.state.client.search({
      index:'todolist',
      q: search,
    });
    this.setState({
      results: res.hits,
    });    
  }
  
  render() {
    return (
      <div>
        {this.state.results.hits !== undefined ? this.state.results.hits.map(hit =><li>{hit._source.activity}</li>): ""}
      </div>
    );
  }
}

