import React, { Component } from 'react';

export default class TableSpecs extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
           items: {},
           isFetching: true,
           error:null
       };
   }

componentDidMount() {
  fetch('http://localhost:4000/inorderspecs')
   .then(response => response.json())
   .then(result => this.setState({items:result, isFetching: false}))
   .catch(err => {
     console.error(err)
     this.setState({items:{}, isFetching: false, error: err})
   })
}

render() {
  const items = this.state.items;
  const isFetching = this.state.isFetching;
  const error = this.state.error;
  if (isFetching) return (<div>.....Loading....</div>);
  if (error) return (<div>{'Error: ${err.message}'}</div>);
    return (
    <div>
    {items.map(item => (
   <React.Fragment>
       <tr>{item.SNOMENNAME}</tr>
       <tr>{item.NRN} {item.SNOMEN}</tr>
  </React.Fragment>
))}
   </div>
  );
}
}
