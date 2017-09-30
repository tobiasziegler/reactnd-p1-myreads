import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}

	render() {
		const { books, id, name } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{name}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}>
								<Book
									coverURL={book.imageLinks.thumbnail}
									title={book.title}
									authors={book.authors}
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
