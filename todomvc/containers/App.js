import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import { createSelector } from 'reselect'


class App extends Component {
  render() {
    const { todos, visible, actions } = this.props
    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} visible={visible} actions={actions} />
      </div>
    )
  }
}

const visibleSelector = (state) => state.visible
const todosSelector = (state) => state.todos

export const visibleTodosSelector = createSelector(
    [visibleSelector, todosSelector],
    (visible, todos) => {
      return {
        todos,
        visible
      }
    }
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  console.log('mapStateToProps -> visible = ' + state.visible);
  return {
    todos: state.todos,
    visible: state.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  //mapStateToProps,
    visibleTodosSelector,
  mapDispatchToProps
)(App)
