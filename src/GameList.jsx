import React, { Component } from 'react'

export default class GameList extends Component {
  render() {
    return (
      <div>{this.props.games.map(e => <div key={e.id}>{e.name} id:{e.id}<br /></div>)}</div>
    )
  }
}
