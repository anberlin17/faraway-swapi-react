import { Avatar, List, Skeleton, Input, Typography, Spin } from 'antd'
import { Await, Link, useLoaderData, useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { getIdFromUrl, getLocalStoragePerson } from '../helpers'
import { Suspense } from 'react'
import { IPeople, IResponseRoot } from '../types'

const { Search } = Input
const { Text } = Typography

function CharactersList() {
	const { data } = useLoaderData() as { data: IResponseRoot<IPeople> }
	const [searchParams] = useSearchParams()
	const navigation = useNavigation()
	const navigate = useNavigate()

	const isLoading = navigation.state === 'loading'

	const onSearch = (value: string) => {
		navigate({ search: `?search=${value}` })
	}

	return (
		<Suspense fallback={<Spin size="large" style={{ placeSelf: 'center' }} />}>
			<Await resolve={data}>
				{(data: IResponseRoot<IPeople>) => (
					<>
						<Search
							placeholder="input search text"
							onSearch={onSearch}
							style={{ alignSelf: 'center', width: '20rem' }}
						/>
						{data.results.length === 0 && !isLoading ? (
							<Text style={{ textAlign: 'center', margin: '1rem 0' }}>No results</Text>
						) : (
							<List
								itemLayout="horizontal"
								pagination={{
									className: 'pagination',
									total: data.count,
									position: 'top',
									align: 'center',
									showSizeChanger: false,
									disabled: isLoading,
									defaultCurrent: Number(searchParams.get('page')) || 1,
									hideOnSinglePage: true,
									showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
									onChange: page => navigate({ search: `?page=${page}` }),
								}}
								dataSource={data.results}
								loading={data.results.length === 0}
								renderItem={item => {
									const person = getLocalStoragePerson(item.url) || item

									return (
										<List.Item>
											<Skeleton loading={isLoading} active avatar>
												<List.Item.Meta
													avatar={
														<Avatar style={{ verticalAlign: 'middle' }} size="large">
															{person.name[0]}
														</Avatar>
													}
													title={<Link to={`person/${getIdFromUrl(person.url)}`}>{person.name}</Link>}
													style={{ alignItems: 'center' }}
												/>
											</Skeleton>
										</List.Item>
									)
								}}
							/>
						)}
					</>
				)}
			</Await>
		</Suspense>
	)
}

export default CharactersList
