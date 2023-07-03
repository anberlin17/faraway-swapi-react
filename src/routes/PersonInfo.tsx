import { Breadcrumb, Descriptions, Spin, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Await, useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import { Suspense, useRef } from 'react'
import { updateLocalStoragePerson } from '../helpers'
import { IPeople } from '../types'

const { Text } = Typography

function PersonInfo() {
	const { data: person } = useLoaderData() as { data: IPeople }
	const navigate = useNavigate()
	const prevValueRef = useRef('')
	const submit = useSubmit()

	function preserveValue(value: string) {
		return () => (prevValueRef.current = value)
	}

	function handleEdit(person: IPeople, propKey: keyof IPeople) {
		return (value: string) => {
			updateLocalStoragePerson(
				{
					...person,
					[propKey]: value || prevValueRef.current,
				},
				person.url
			)
			// force loader trigger to get updated data from useLoaderData
			submit({})
		}
	}

	return (
		<Suspense fallback={<Spin size="large" style={{ placeSelf: 'center' }} />}>
			<Await resolve={person}>
				{(person: IPeople) => (
					<>
						<Breadcrumb
							className="breadcrumb"
							items={[
								{
									title: <HomeOutlined onClick={() => navigate('/')} />,
								},
								{
									title: person.name,
								},
							]}
						/>
						<Descriptions bordered title="Character Info" size="small">
							<Descriptions.Item label="Name">
								<Text
									editable={{
										onChange: handleEdit(person, 'name'),
										onStart: preserveValue(person.name),
									}}
								>
									{person.name}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Gender">
								<Text
									editable={{
										onChange: handleEdit(person, 'gender'),
										onStart: preserveValue(person.gender),
									}}
								>
									{person.gender}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Birth year">
								<Text
									editable={{
										onChange: handleEdit(person, 'birth_year'),
										onStart: preserveValue(person.birth_year),
									}}
								>
									{person.birth_year}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Eye color">
								<Text
									editable={{
										onChange: handleEdit(person, 'eye_color'),
										onStart: preserveValue(person.eye_color),
									}}
								>
									{person.eye_color}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Hair color">
								<Text
									editable={{
										onChange: handleEdit(person, 'hair_color'),
										onStart: preserveValue(person.hair_color),
									}}
								>
									{person.hair_color}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Skin color">
								<Text
									editable={{
										onChange: handleEdit(person, 'skin_color'),
										onStart: preserveValue(person.skin_color),
									}}
								>
									{person.skin_color}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Height">
								<Text
									editable={{
										onChange: handleEdit(person, 'height'),
										onStart: preserveValue(person.height),
									}}
								>
									{person.height}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Mass">
								<Text
									editable={{
										onChange: handleEdit(person, 'mass'),
										onStart: preserveValue(person.mass),
									}}
								>
									{person.mass}
								</Text>
							</Descriptions.Item>
						</Descriptions>
					</>
				)}
			</Await>
		</Suspense>
	)
}

export default PersonInfo
