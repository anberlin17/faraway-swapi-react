import { Button, Result } from 'antd'
import { Link, useRouteError } from 'react-router-dom'

function ErrorPage() {
	const error = useRouteError() as any
	return (
		<Result
			status={error.status}
			title={error.status}
			subTitle={'Sorry, the page you visited does not exist.'}
			extra={
				<Button type="primary">
					<Link to="/">Back Home</Link>
				</Button>
			}
		/>
	)
}

export default ErrorPage
