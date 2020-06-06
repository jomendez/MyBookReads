import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class MoveTo extends Component {

    static propTypes = {
        book: PropTypes.object,
        currentlyReading: PropTypes.func.isRequired
    }
    state = {
        selectedValue: this.props.book.shelf || 'move'
    }

    onShelfChange(event) {
        this.props.currentlyReading(this.props.book, event);
        this.setState({ selectedValue: event.target.value })
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={(event) => this.onShelfChange(event)} value={this.state.selectedValue}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
