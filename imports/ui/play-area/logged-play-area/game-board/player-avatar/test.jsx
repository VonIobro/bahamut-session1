import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './test.scss';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [ 'hello', 'world', 'click', 'me' ]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleAdd() {
    const {items} = this.state;
    var newItems = items.concat([ prompt('Enter some text') ]);
    this.setState({items: newItems});
  }
  handleRemove(i) {
    const {items} = this.state;
    var newItems = items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }
  render() {
    const {items} = this.state;
    var itemNodes = items.map((item, i) => {
      return (
        <div key={item}
          onClick={() => this.handleRemove(i)}>
          {item}
        </div>
      );
    });
    return (
      <div>
        <button onClick={this.handleAdd}>
          Add Item</button>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {itemNodes}
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}
