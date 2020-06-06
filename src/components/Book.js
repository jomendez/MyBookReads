import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MoveTo from './MoveTo'

export default class Book extends Component {

    static propTypes = {
        book: PropTypes.object,
        currentlyReading: PropTypes.func.isRequired
    }

    render() {
        const { book, currentlyReading } = this.props

        if (book) {
            return (
                <div>
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <a href={book.infoLink}>
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}></div>
                                </a>
                                <MoveTo book={book} currentlyReading={currentlyReading} />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors && book.authors.length === 1 ? book.authors[0] :
                                book.authors ?
                                    book.authors.join(', ') :
                                    ''
                            }
                            </div>
                        </div>
                    </li>
                </div>
            )
        }
    }
}
