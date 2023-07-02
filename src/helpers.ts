import { API_URL, STORAGE_PREFIX } from './const'
import { IPeople, IResponseRoot } from './types'

async function basicFetch(url: string) {
	const cached = sessionStorage.getItem(url)
	if (cached) {
		return JSON.parse(cached)
	}

	const res = await fetch(url)
	const data = await res.json()

	if (!res.ok) {
		throw new Response(data.detail, { status: res.status })
	}

	sessionStorage.setItem(url, JSON.stringify(data))

	return data
}

export async function findPerson(name: string) {
	const url = `${API_URL}/people/?search=${name}`
	const data = await basicFetch(url)

	return data as IResponseRoot<IPeople>
}

export async function fetchPeople(page: string) {
	const url = `${API_URL}/people?page=${page || 1}`
	const data = await basicFetch(url)

	return data as IResponseRoot<IPeople>
}

export async function fetchPerson(id: string) {
	const url = `${API_URL}/people/${id}/`

	const cached = getLocalStoragePerson(url)
	if (cached) {
		return cached
	}

	const data = await basicFetch(url)

	return data as IPeople
}

export function getLocalStoragePerson(key: string) {
	const storageKey = getStorageKey(key)

	const cached = localStorage.getItem(storageKey)
	if (cached) {
		return JSON.parse(cached) as IPeople
	}

	for (const storageKey of Object.keys(sessionStorage)) {
		const value = JSON.parse(sessionStorage.getItem(storageKey))
		if (value.hasOwnProperty('results')) {
			const item = (value.results as IPeople[]).find(item => item.url === key)
			if (item) {
				return item
			}
		}
	}

	return null
}

export function updateLocalStoragePerson(data: IPeople, key: string) {
	const storageKey = getStorageKey(key)
	localStorage.setItem(storageKey, JSON.stringify(data))
}

// Since the API doesn't provide a way to get a person by id, we have to parse it from the url
export function getIdFromUrl(url: string) {
	const matches = url.match(/\d+/)
	if (matches && matches.length > 0) {
		const lastDigit = parseInt(matches[0])
		if (!isNaN(lastDigit)) {
			return lastDigit
		}
	}

	return null
}

function getStorageKey(key: string) {
	return `${STORAGE_PREFIX}.${key}`
}
