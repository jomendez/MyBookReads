import * as _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, search } from '../BooksAPI'
import { updateBookStatus } from '../utils/helpers'
import Book from './Book'
import LoaderIndicator from './LoaderIndicator'

export class Search extends Component {

    constructor(props) {
        super(props)
        this.updateBookStatus = updateBookStatus.bind(this)
    }

    state = {
        stagedBooks: [],
        books: [],
        query: '',
        loading: false
    }

    updateQuery = (query) => {
        if (query !== '') {
            this.setState({ query: query.trim() })
            this.handleSearchDebounced();
        } else {
            this.clearQuery();
            this.setState({ books: [] })
        }
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    componentDidMount() {
        getAll().then((stagedBooksId) => {
            const initialValue = {};
            const stagedBooks = stagedBooksId.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.id]: item.shelf,
                };
            }, initialValue);
            this.setState({ stagedBooks })
        })
    }


    componentWillMount = () => {
        this.handleSearchDebounced = _.debounce(() => {
            if (this.state.query !== '') {
                this.setState({ loading: true });
                search(this.state.query).then(books => {
                    books.forEach(book => {
                        if (this.state.stagedBooks && this.state.stagedBooks[book.id]) {
                            book.shelf = this.state.stagedBooks[book.id]
                        }
                    })
                    if (books && books.length > 0) {
                        this.setState({ books })
                    } else {
                        this.setState({ books: [] })
                    }
                    this.setState({ loading: false });
                }).catch(() => {
                    this.setState({ loading: false });
                    alert("An error ocurred")
                })
            }

        }, 1000);
    }

    render() {
        const { query } = this.state
        return (
            <>
                {this.state.loading && <LoaderIndicator />}
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
                                return <Book key={book.id} book={book} updateBookStatus={this.updateBookStatus} />
                            })
                            }
                            {this.state.books && 'No results'}
                        </ol>
                    </div>
                </div>
            </>
        )
    }
}

export default Search
