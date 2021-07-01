import React, { useState, useEffect } from 'react'
import Article from './components/Article'

function App() {
	const [articles, setArticles] = useState([])
	const [subreddit, setSubreddit] = useState('valorant')
	const [sorting, setSorting] = useState('hot')

	useEffect(() => {
		fetch(`https://www.reddit.com/r/${subreddit}/${sorting}.json`).then(
			(res) => {
				if (res.status !== 200) {
					console.log('ERROR')
					return
				}

				res.json().then((data) => {
					if (data != null) {
						setArticles(data.data.children)
					}
				})
			}
		)
	}, [subreddit, sorting])

	return (
		<div className='App'>
			<header className='App-header'>
				<input
					type='text'
					className='input'
					value={subreddit}
					onChange={(e) => setSubreddit(e.target.value)}
				/>
			</header>
			<h1>{sorting}</h1>
			<button onClick={() => setSorting('hot')}>Hot</button>
			<button onClick={() => setSorting('new')}>New</button>
			<button onClick={() => setSorting('rising')}>Rising</button>
			<button onClick={() => setSorting('controversial')}>Controversial</button>
			<button onClick={() => setSorting('top')}>Top</button>
			<div className='articles'>
				{articles != null
					? articles.map((article, index) => (
							<Article key={index} article={article.data} />
					  ))
					: ''}
			</div>
		</div>
	)
}

export default App
