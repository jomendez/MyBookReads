import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import { update, search, getAll } from '../BooksAPI'
import * as _ from 'lodash'

export class Search extends Component {

    constructor(props) {
        super(props)
        this.currentlyReading = this.currentlyReading.bind(this)
    }

    state = {
        stagedBooks: [],
        books: [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.handleSearchDebounced();
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    componentDidMount() {
        getAll().then((stagedBooksId) => {
            const stagedBooks = stagedBooksId.map(b => {
                return { [b.id]: b.shelf }
            });
            this.setState({ stagedBooks })
        })
    }


    componentWillMount = () => {
        this.handleSearchDebounced = _.debounce(() => {
            if (this.state.query !== '') {
                search(this.state.query).then(books => {
                    console.log(books)
                    if (books && books.length > 0) {
                        this.setState({ books })
                    } else {
                        this.setState({ books: [] })
                    }
                })
            }

        }, 1000);
    }

    currentlyReading(book, event) {
        update(book, event.target.value)
            .then(updatedBookIds => {
                const newStateBook = [...this.state.books]
                Object.keys(updatedBookIds).forEach(shelf => {
                    updatedBookIds[shelf].forEach(id => {
                        const foundBooks = newStateBook.find(b => b.id === id)
                        if (foundBooks) {
                            foundBooks.shelf = shelf
                        }
                    })
                })
                this.setState({ state: newStateBook })
            })
    }

    render() {
        const { query, stagedBooks } = this.state
        console.log(stagedBooks)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books && this.state.books.map(book => {
                            return <Book key={book.id} book={book} currentlyReading={this.currentlyReading} />
                        })
                        }
                        {this.state.books && 'No results'}
                    </ol>
                </div>
            </div>

        )
    }
}

export default Search
