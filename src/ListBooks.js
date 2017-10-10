import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		bookshelves: PropTypes.array.isRequired,
		setShelf: PropTypes.func.isRequired
	}

	render() {
		const { books, bookshelves, setShelf } = this.props

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{bookshelves.map((bookshelf) => (
							<Bookshelf
								key={bookshelf.id}
								books={books}
								id={bookshelf.id}
								name={bookshelf.name}
								setShelf={setShelf}
							/>
						))}
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

export default ListBooks
