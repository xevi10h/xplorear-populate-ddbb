export default class Name {
	private readonly value: string;

	constructor(name: string) {
		if (!name || name.length < 2 || name.length > 100) {
			throw new Error(
				'Name must be between 2 and 100 characters long'
			);
		}
		this.value = name;
	}

	getValue(): string {
		return this.value;
	}
}
