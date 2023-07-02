import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom'
import PersonInfo from './routes/PersonInfo'
import ErrorPage from './routes/ErrorPage'
import CharactersList from './routes/PeopleList'
import Root from './routes/Root'
import { fetchPeople, fetchPerson, findPerson } from './helpers'
import './index.scss'

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: '/',
					index: true,
					element: <CharactersList />,
					loader: ({ request }) => {
						const url = new URL(request.url)

						if (url.searchParams.has('search')) {
							return defer({
								data: findPerson(url.searchParams.get('search')),
							})
						} else {
							return defer({
								data: fetchPeople(url.searchParams.get('page')),
							})
						}
					},
				},
				{
					path: 'person/:id',
					element: <PersonInfo />,
					loader: ({ params }) => fetchPerson(params.id),
				},
			],
		},
	],
	{ basename: '/faraway-swapi-react' }
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
