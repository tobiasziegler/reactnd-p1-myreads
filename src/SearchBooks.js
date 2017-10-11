import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
	state = {
		query: '',
		books: []
	}

	static PropTypes = {
		setShelf: PropTypes.func.isRequired,
		shelvedBooks: PropTypes.array.isRequired
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })

		if (query) {
			BooksAPI.search(query).then((results) => {
				// Match books already on shelves and add the shelf values
				results = results.map((result) => {
					const index = this.props.shelvedBooks.findIndex((book) => {
						return book.id === result.id
					})

					if (index !== -1) {
						result.shelf = this.props.shelvedBooks[index].shelf
					} else {
						result.shelf = 'none'
					}

					return result
				})

				this.setState({books: results})
			})
		}
	}

	render() {
		const { books } = this.state
		const { setShelf } = this.props

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<Book
									book={book}
									setShelf={setShelf}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>

		)
	}
}

export default SearchBooks
