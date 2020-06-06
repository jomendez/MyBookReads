import { update } from "../BooksAPI"

export function updateBookStatus(book, event) {

    const val = event.target.value
    update(book, val)
        .then(updatedBookIds => {
            const newStateBook = [...this.state.books]
            Object.keys(updatedBookIds).forEach(shelf => {
                updatedBookIds[shelf].forEach(id => {
                    const foundBook = newStateBook.find(b => b.id === id)
                    if (foundBook) {
                        foundBook.shelf = shelf
                    }
                })
            })
            if (val === "none") {
                const changedBook = newStateBook.find(x => x.id === book.id)
                if(changedBook){
                    changedBook.shelf = "none"
                }
            }
            this.setState({ state: newStateBook })
        })
}