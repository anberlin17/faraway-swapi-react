import { Layout, Typography } from 'antd'
import { Link, Outlet } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title } = Typography

function Root() {
	return (
		<Layout className="layout">
			<Header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Title className="header__title" level={1} style={{ marginBottom: 0 }}>
					<Link to="/" style={{ color: '#ddd' }}>
						Star Wars
					</Link>
				</Title>
			</Header>
			<Content className="content">
				<Outlet />
			</Content>
			<Footer className="footer">Test task for Faraway ©2023 Created by Nikita Zhurawski</Footer>
		</Layout>
	)
}

export default Root
