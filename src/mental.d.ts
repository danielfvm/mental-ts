/** @noSelfInFile */

interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface Vector2 {
	x: number;
	y: number;
}

// HookType defines the hook event name and the values passed to the callback
//   "hook_name":callback_type
interface HookType {
	"key_press": string;
	"key_release": string;
	"window_resize": void;
	"window_unfocus": void;
	"think": void;
	"fixed_think": void;
	"mouse_unpress": void;
	"mouse_press": void;
	"drag": Vector2;
	"physics": void;
}

declare namespace debug {
	function showLog(): void;
}

interface Sprite {
	setScale(scale: number): void;
	setRectSize(size: Vector2): void;
	setRectSize(width: number, height: number): void;
	setRectPos(pos: Vector2): void;
	setRectPos(x: number, y: number): void;
	setColor(color: Color): void;
	setLayer(layer: number): void;
	loadShader(shader: string): void;
	getBounds(): Vector2;
	setInterpolation(interpolation: boolean): void;
	setRotation(angle: number): void;
	setShaderInt(value: number): void;
	setShaderFloat(value: number): void;
	setShaderFloatArray(value: number[]): void;
}

type RigidbodyType = "static"; // TODO: Figure out what the other types are

interface Rigidbody {
	setVelocity(velocity: Vector2): void;
	setVelocity(x: number, y: number): void;
	setRotation(angle: number): void;
	setType(type: RigidbodyType): void;
	setOwner(owner: Entity): void;
	setSensor(sensor: boolean): void;
}

interface Text {
	setSize(size: number): void;
	setScale(scale: number): void;
	setFont(font: string): void;

	setPos(pos: Vector2): void;
	setPos(x: number, y: number): void;

	setColor(color: Color): void;
	setOutlineColor(color: Color): void;
	setOutlineThickness(thickness: number): void;
	screenCoords(value: boolean): void;
	setString(text: string): void;
	getBounds(): Vector2;
}

declare class Entity {
	setHook(hookType: string, callback: () => void): void;
}

declare namespace mnt {
	/**
	 * Creates a new rgba color.
	 * ```ts
	 * const color = mnt.color(255, 0, 0, 255); // red 100% opaque
	 * ```
	 */
	function color(r: number, g: number, b: number, a: number): Color;

	/**
	 * Creates a new vector2
	 * ```ts
	 * const vector2 = mnt.vector2(0, 0);
	 * ```
	 */
	function vector2(x: number, y: number): Vector2;

	/**
	 * Creates a new sprite
	 * ```ts
	 * const sprite = mnt.sprite("test.png");
	 * ```
	 */
	function sprite(name: string): Sprite;

	/**
	 * Create a new text
	 * ```ts
	 * const text = mnt.text("test");
	 * ```
	 */
	function text(text: string): Text;
}

declare namespace global {
	/**
	 * Adds a listener that will be called when the event is triggered
	 * ```ts
	 * global.addHook("key_press", (key) => {
	 *   print("key pressed: " + key);
	 * });
	 * ```
	 */
	function addHook<
		K extends keyof HookType,
		V extends HookType[K],
	>(hookType: K, callback: (args: V) => void): void;
}

declare namespace sky {
	/**
	 * Sets the color of the sky
	 * ```ts
	 * sky.setColor(mnt.color(255, 0, 0, 255)); // red sky
	 * ```
	 */
	function setColor(color: Color): void;
}

declare namespace sound {
	/**
	 * Plays a sound file
	 * ```ts
	 * sound.play("canary.wav", 1.0, 40, mnt.vector2(0, 0));
	 * ```
	 */
	function play(name: string, volume: number, unknown: number, location: Vector2): void;
}

declare namespace music {
	/**
	 * Loads a music file
	 */
	function load(name: string): void;

	/**
	 * Plays the music
	 */
	function play(): void;

	/**
	 * Pauses the music
	 */
	function pause(): void;

	/**
	 * Stops the music
	 */
	function stop(): void;

	/**
	 * Sets the volume of the music
	 */
	function setVolume(volume: number): void;
}

declare namespace scene {
	/**
	 * Loads a scene by name. Scene has to be a file in xml format with the ext `.scene`
	 * ```ts
	 * scene.load("my_scene.scene");
	 * ```
	 */
	function load(name: string): void;
}

declare namespace cam {
	/**
	 * Sets the position of the camera
	 */
	function setPos(pos: Vector2): void;
	function setPos(x: number, y: number): void;

	/**
	 * The window width in pixel
	 */
	var width: number;

	/**
	 * The window height in pixel
	 */
	var height: number;
}

declare namespace time {
	/**
	 * The time in seconds
	 */
	var current: number;
}

declare namespace screen {
	/**
	 * The window width in pixel
	 */
	var width: number;

	/**
	 * The window height in pixel
	 */
	var height: number;
}


declare namespace game {
	/**
	 * Exits the game
	 */
	function exit(): void;
}

/**
 * Finds any loaded object by its attributes
 * ```ts
 * find(".class == 'title_sonic'")[1].text.setString("Hello, World!");
 * ```
 */
declare function find(path: string): any;
