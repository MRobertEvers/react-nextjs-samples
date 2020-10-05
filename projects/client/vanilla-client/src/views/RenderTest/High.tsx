import * as React from 'react';
import { useSelectRenderTestName, useSelectRenderTestDescription } from './redux/render-test.selectors';
import { useDispatch } from 'react-redux';
import { RenderTestActions } from './redux/render-test.actions';

function Name(props: { name: string }) {
	const { name } = props;
	return <p>{name}</p>;
}

function Description(props: { description: string }) {
	const { description } = props;
	return <p>{description}</p>;
}

export function High() {
	const name = useSelectRenderTestName();
	const description = useSelectRenderTestDescription();

	const dispatch = useDispatch();
	React.useEffect(() => {
		const timer = setInterval(() => {
			dispatch(
				RenderTestActions.setState({
					name: String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0)),
					description: String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
				})
			);
		}, 2000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div>
			<Name name={name} />
			<Description description={description} />
		</div>
	);
}
