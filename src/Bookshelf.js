import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		setShelf: PropTypes.func.isRequired
	}

	render() {
		const { books, id, name, setShelf } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{name}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.filter(
							book => id === book.shelf
						).map((book) => (
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

export default Bookshelf
