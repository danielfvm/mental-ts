export class Entity {
	protected internal: FlexibleClass;

	constructor() {
		this.internal = mnt.FlexibleClass();
	}

	/**
	 * Adds a listener that will be called when the event is triggered
	 *
	 * @example
	 * ```ts
	 * global.addHook("key_press", (key) => {
	 *   print("key pressed: " + key);
	 * });
	 * ```
	 */
	addHook<
		K extends keyof HookType,
		V extends HookType[K],
	>(hookType: K, callback: (args: V) => void): void {
		this.internal.addHook(hookType, callback);
	}

	/**
	 * Removes the entity from the scene
	 */
	remove(): void {
		this.internal.remove();
	}
}
