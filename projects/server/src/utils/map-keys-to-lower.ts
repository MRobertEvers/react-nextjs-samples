export function mapKeysToLower(object: { [x: string]: any }): { [x: string]: any } {
	const newObject: { [x: string]: any } = {};

	for (const key in object) {
		const newKey = key[0].toLowerCase() + key.substr(1);

		if (Array.isArray(object[key])) {
			newObject[newKey] = object[key].map((item) => mapKeysToLower(item));
		} else if (typeof object[key] === 'object') {
			newObject[newKey] = mapKeysToLower(object[key]);
		} else {
			newObject[newKey] = object[key];
		}
	}

	return newObject;
}
