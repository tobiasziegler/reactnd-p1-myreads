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

	static propTypes = {
		setShelf: PropTypes.func.isRequired,
		shelvedBooks: PropTypes.array.isRequired
	}

	/*
	 * Add shelf allocations to all of the books in the current search results.
	 * The search results returned by the API are generic and don't have a
	 * record of the shelves assigned within te current instance of the app.
	 * This function will iterate through the results, check whether a matching
	 * book is in the array of books assigned to shelves, and then assign the
	 * shelf value if there is a match, or 'none' if no match is found.
	 */
	matchBooks = (searchResults, shelvedBooks) => {
		return searchResults.map((result) => {
			const index = shelvedBooks.findIndex((book) => {
				return book.id === result.id
			})

			if (index !== -1) {
				result.shelf = shelvedBooks[index].shelf
			} else {
				result.shelf = 'none'
			}

			return result
		})
	}

	/**
	 * Update the query field and retrieve updated search results. If the query
	 * is non-empty, an API call will retrieve search results and update the
	 * state so the results will be displayed.
	 */
	updateQuery = (query) => {
		this.setState({ query: query.trim() })

		if (query) {
			BooksAPI.search(query).then((results) => {
				if (!results.error) {
					results = this.matchBooks(results, this.props.shelvedBooks)

					this.setState({books: results})
				} else {
					this.setState({books: []})
				}
			})
		} else {
			this.setState({books: []})
		}
	}

	/**
	 * Ensure that the shelf allocations are updated in the search results when
	 * this component is receiving new props (i.e., when the app state has
	 * updated).
	 */
	componentWillReceiveProps(nextProps) {
		const results = this.matchBooks(this.state.books, nextProps.shelvedBooks)

		this.setState({books: results})
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
