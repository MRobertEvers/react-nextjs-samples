export function mapKeysToLower(object: { [x: string]: any }): { [x: string]: any } {
	const newObject: { [x: string]: any } = {};

	for (const key in object) {
		const newKey = key[0].toLowerCase() + key.substr(1);
		newObject[newKey] = object[key];
	}

	return newObject;
}
