import { Breadcrumb, Descriptions, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import { useRef } from 'react'
import { updateLocalStoragePerson } from '../helpers'
import { IPeople } from '../types'

const { Text } = Typography

function PersonInfo() {
	const person = useLoaderData() as IPeople
	const navigate = useNavigate()
	const prevValueRef = useRef('')
	const submit = useSubmit()

	function preserveValue(value: string) {
		return () => (prevValueRef.current = value)
	}

	function handleEdit(propKey: keyof IPeople) {
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
							onChange: handleEdit('name'),
							onStart: preserveValue(person.name),
						}}
					>
						{person.name}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Gender">
					<Text
						editable={{
							onChange: handleEdit('gender'),
							onStart: preserveValue(person.gender),
						}}
					>
						{person.gender}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Birth year">
					<Text
						editable={{
							onChange: handleEdit('birth_year'),
							onStart: preserveValue(person.birth_year),
						}}
					>
						{person.birth_year}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Eye color">
					<Text
						editable={{
							onChange: handleEdit('eye_color'),
							onStart: preserveValue(person.eye_color),
						}}
					>
						{person.eye_color}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Hair color">
					<Text
						editable={{
							onChange: handleEdit('hair_color'),
							onStart: preserveValue(person.hair_color),
						}}
					>
						{person.hair_color}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Skin color">
					<Text
						editable={{
							onChange: handleEdit('skin_color'),
							onStart: preserveValue(person.skin_color),
						}}
					>
						{person.skin_color}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Height">
					<Text
						editable={{
							onChange: handleEdit('height'),
							onStart: preserveValue(person.height),
						}}
					>
						{person.height}
					</Text>
				</Descriptions.Item>
				<Descriptions.Item label="Mass">
					<Text
						editable={{
							onChange: handleEdit('mass'),
							onStart: preserveValue(person.mass),
						}}
					>
						{person.mass}
					</Text>
				</Descriptions.Item>
			</Descriptions>
		</>
	)
}

export default PersonInfo
