import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: [],
        bookshelves: [
            {
                id: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                id: 'wantToRead',
                name: 'Want to Read'
            },
            {
                id: 'read',
                name: 'Read'
            }
        ]
    }

    /**
     * Update the shelf assigned to a book. This is first done on the server
     * via an API call, and then the local state is updated by filtering out
     * the old record for the book and inserting a new one.
     */
    setShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf

            this.setState((state) => ({
                books: state.books.filter((b) => b.id !== book.id).concat([book])
            }))
        })
    }

    /**
     * Retrieve the full list of books assigned to shelves from the server when
     * the app is first loaded.
     */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books })
        })
    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <SearchBooks
                        setShelf={this.setShelf}
                        shelvedBooks={this.state.books}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooks
                        books={this.state.books}
                        bookshelves={this.state.bookshelves}
                        setShelf={this.setShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
