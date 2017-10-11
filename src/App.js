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

    setShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books: books })
            })
        })
    }

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
