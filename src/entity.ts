export class Entity {
	private internal: FlexibleClass;

	constructor() {
		this.internal = mnt.FlexibleClass();
	}

	addHook<
		K extends keyof HookType,
		V extends HookType[K],
	>(hookType: K, callback: (args: V) => void): void {
		this.internal.addHook(hookType, callback);
	}
}
