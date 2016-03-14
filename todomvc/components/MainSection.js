import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('m nextProps')
    console.log(nextProps)
    console.log('m nextState')
    console.log(nextState)
    return false;
  }
  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  handleDisplay() {
    this.props.actions.displayAll();
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderVisibleAll() {
    const { visible } = this.props
    console.log('visible = ' + visible.visible);
    let val = visible.visible + ''
    if(visible.visible) {
      return (
          <input type="button"
                 value={val}
                 onClick={this.handleDisplay.bind(this)}
              />
      )
    }
    else {
      return (
          <input type="button"
                 value={val}
                 onClick={this.handleDisplay.bind(this)}
              />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    console.log('mainsection render!');
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
        {this.renderVisibleAll()}
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  visible: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
