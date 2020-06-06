import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from '../BooksAPI'
import Book from './Book'

export const SHELF = {
    CURRENTLY_READING: "currentlyReading",
    WANT_TO_READ: "wantToRead",
    READ: "read",
}

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.currentlyReading = this.currentlyReading.bind(this)
    }

    state = {
        books: []
    }

    componentDidMount() {
        getAll().then((books) => {
            this.setState({ books })
        })
    }

    currentlyReading(book, event) {
        update(book, event.target.value)
            .then(data => {
                console.log(data)
                const newStateBook = [...this.state.books]
                Object.keys(data).forEach(e => {
                    data[e].forEach(x => {
                        newStateBook.find(b => b.id === x).shelf = e
                    })
                })
                this.setState({ state: newStateBook })
            })
    }

    render() {
        return (
            <div className="app">

                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.books.map(book => {
                                            if (book.shelf === SHELF.CURRENTLY_READING) {
                                                return (
                                                    <Book key={book.key} book={book} currentlyReading={this.currentlyReading} />
                                                )
                                            }
                                            return null
                                        }
                                        )}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.books.map(book => {
                                            if (book.shelf === SHELF.WANT_TO_READ) {
                                                return (
                                                    <Book book={book} currentlyReading={this.currentlyReading} />
                                                )
                                            }
                                            return null
                                        }
                                        )}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.books.map(book => {
                                            if (book.shelf === SHELF.READ) {
                                                return (
                                                    <Book book={book} currentlyReading={this.currentlyReading} />
                                                )
                                            }
                                            return null
                                        }
                                        )}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
