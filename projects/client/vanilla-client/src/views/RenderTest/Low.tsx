import * as React from 'react';
import { useSelectRenderTestName, useSelectRenderTestDescription } from './redux/render-test.selectors';
import { RenderTestActions } from './redux/render-test.actions';
import { useDispatch } from 'react-redux';

function Name() {
	const name = useSelectRenderTestName();
	return <p>{name}</p>;
}

function Description() {
	const description = useSelectRenderTestDescription();
	return <p>{description}</p>;
}

export function Low() {
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
			<Name />
			<Description />
		</div>
	);
}
