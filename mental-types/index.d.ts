/** @noSelfInFile */

type KeyType =
	| "Unknown"
	| "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
	| "Num0" | "Num1" | "Num2" | "Num3" | "Num4" | "Num5" | "Num6" | "Num7" | "Num8" | "Num9"
	| "Escape"
	| "LControl" | "LShift" | "LAlt" | "LSystem"
	| "RControl" | "RShift" | "RAlt" | "RSystem"
	| "Menu"
	| "LBracket" | "RBracket"
	| "SemiColon" | "Comma" | "Period" | "Quote"
	| "Slash" | "BackSlash"
	| "Tilde"
	| "Equal"
	| "Dash"
	| "Space" | "Return" | "BackSpace" | "Tab"
	| "PageUp" | "PageDown"
	| "End"
	| "Home"
	| "Insert" | "Delete"
	| "Add" | "Subtract" | "Multiply" | "Divide"
	| "Left" | "Right" | "Up" | "Down"
	| "Numpad0" | "Numpad1" | "Numpad2" | "Numpad3" | "Numpad4" | "Numpad5" | "Numpad6" | "Numpad7" | "Numpad8" | "Numpad9"
	| "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "F13" | "F14" | "F15";

type MouseType =
	| "Left"
	| "Middle"
	| "Right";

type RigidbodyType = "static" | "dynamic" | "kinematic";

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

interface CollisionBox {
	// TODO: no idea what it contains 
}

// HookType defines the hook event name and the values passed to the callback
//   "hook_name":callback_type
interface HookType {
	"key_press": KeyType;
	"key_release": KeyType;
	"window_resize": void;
	"window_unfocus": void;
	"think": void;
	"fixed_think": void;
	"mouse_release": MouseType;
	"mouse_press": MouseType;
	"mouse_scroll": number;
	"drag": Vector2;
	"physics": void;
	"debugrender": void;
}

interface Sprite {
	setScale(scale: number): void;
	setRectSize(w: number, h: number): void;
	setRectPos(pos: Vector2): void;
	setColor(color: Color): void;
	setLayer(layer: number): void;
	loadShader(shader: string): void;
	getBounds(): Vector2;
	setInterpolation(interpolation: boolean): void;
	setRotation(angle: number): void;
	setShaderInt(uniform: string, value: number): void;
	setShaderFloat(uniform: string, value: number): void;
	setShaderFloatArray(uniform: string, value: number[]): void;
	setPos(pos: Vector2): void;
	setPos(x: number, y: number): void;

	/**
	 * Removes the entity from the scene
	 */
	remove(): void;
}

interface Rigidbody {
	setVelocity(velocity: Vector2): void;

	/**
	 * Apply the velocity
	 */
	applyVelocity(velocity: Vector2): void;

	/**
	 * The name is self-explaining
	 */
	setFriction(amount: number): void;

	/**
	 * The name is self-explaining
	 */
	setBouncy(amount: number): void;

	/**
	 * Locks the rotation
	 */
	setFixedRotation(fixed: boolean): void;

	/**
	 * Returns True if the rotation is locked
	 */
	getFixedRotation(): boolean;

	/**
	 * Set the speed of the rotation
	 */
	setAngularVelocity(amount: number): void;

	/**
	 * Applies the angular speed
	 */
	applyAngularVelocity(amount: number): void;

	/**
	 * The power of linear dumping
	 */
	setLinearDamping(amount: number): void;

	/**
	 * Returns the power of linear dumping
	 */
	getLinearDamping(): number;

	/**
	 * The power of angular dumping ( You can make a wing for example )
	 */
	setAngularDamping(amount: number): void;

	/**
	 * Returns the power of angular dumping
	 */
	getAngularDamping(): number;

	setType(type: RigidbodyType): void;

	setOwner(owner: FlexibleClass): void;

	setSensor(sensor: boolean): void;

	/**
	 * The object is calculated with collision checking in between of the two positions preventing the quantum tunnelling
	 */
	setBullet(bullet: boolean): void;

	/**
	 * Is the bullet option turned on?
	 */
	getBullet(): boolean;

	setPos(pos: Vector2): void;

	getPos(): Vector2;

	setRotation(angle: number): void;

	getRotation(): number;

	setRotation(angle: number): void;

	/**
	 * Removes the entity from the scene
	 */
	remove(): void;
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

	/**
	 * Removes the entity from the scene
	 */
	remove(): void;
}

declare namespace debug {
	function setEnabled(enabled: boolean): void;
}

declare class FlexibleClass {
	/** 
	 * Id of the object, the engine sets the random one
	 */
	id: number;

	/**
	 * The class name. the engine sets the corresponding name to the FlexibleClass
	 */
	name: string;

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
	>(hookType: K, callback: (args: V) => void): void;

	/**
	 * Removes the entity from the scene
	 */
	remove(): void;

	/**
	 * Set the internal class name
	 */
	setName(name: string): void;

	/**
	 * Set the internal reference to the object
	 */
	setRef(ref: FlexibleClass): void;
}

declare namespace mnt {
	/**
	 * Creates a new rgba color.
	 *
	 * @example
	 * ```ts
	 * const color = mnt.color(255, 0, 0, 255); // red 100% opaque
	 * ```
	 *
	 * @example
	 * ```ts
	 * const color = { r: 255, g: 0, b: 0, a: 255 };
	 * ```
	 */
	function color(r: number, g: number, b: number, a: number): Color;

	/**
	 * Creates a new vector2
	 *
	 * @example
	 * ```ts
	 * const vector2 = mnt.vector2(0, 0);
	 * ```
	 */
	function vector2(x: number, y: number): Vector2;

	/**
	 * Creates a new sprite
	 *
	 * @example
	 * ```ts
	 * const sprite = mnt.sprite("test.png");
	 * ```
	 */
	function sprite(name: string): Sprite;

	/**
	 * Create a new text
	 *
	 * @example
	 * ```ts
	 * const text = mnt.text("test");
	 * ```
	 */
	function text(text: string): Text;

	function FlexibleClass(): FlexibleClass;
}

declare namespace global {
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
	function addHook<
		K extends keyof HookType,
		V extends HookType[K],
	>(hookType: K, callback: (args: V) => void): void;
}

declare namespace sky {
	/**
	 * Sets the color of the sky
	 *
	 * @example
	 * ```ts
	 * sky.setColor(mnt.color(255, 0, 0, 255)); // red sky
	 * ```
	 */
	function setColor(color: Color): void;
}

declare namespace sound {
	/**
	 * Plays a sound file
	 *
	 * @example
	 * ```ts
	 * sound.play("canary.wav", 1.0, 40, mnt.vector2(0, 0));
	 * ```
	 */
	function play(name: string, pitch: number, volume: number, location: Vector2): void;
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
	 *
	 * @example
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
	 * Sets the zoom of the camera
	 */
	function setZoom(zoom: number): void;

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

	/**
	 * Add a screen space shader effect
	 */
	function addShader(path: string): void;

	/**
	 * Enable or disable a screen space shader effect
	 */
	function setShaderEnabled(path: string, enabled: boolean): void;
}


declare namespace game {
	/**
	 * Exits the game
	 */
	function exit(): void;
}

/**
 * Finds any loaded object by its attributes
 *
 * @example
 * ```ts
 * find(".class == 'title_sonic'")[1].text.setString("Hello, World!");
 * ```
 */
declare function find(path: string): any;

/**
 * As a matter of fact not an interval but a timeout
 */
declare namespace interval {

	/**
	 * Creates a new timeout that will be called after the specified milliseconds with the specified argument.
	 *
	 * @example
	 * ```ts
	 * interval.create((arg) => {
	 *   print(arg);
	 * }, 1000, "Hello, World after 1 second!");
	 * ```
	 */
	function create<T>(callback: (arg: T) => void, timeout: number, arg: T): void;
}

declare namespace file {
	function read(path: string): string;
	function write(path: string, content: string): void;
}

declare namespace collision {
	function box(bounds: Vector2): CollisionBox;
}

declare namespace physics {
	function rigidbody(collisionBox: CollisionBox): Rigidbody;
}

declare namespace lua {
	/**
	 * Clears all loaded entities, Text, Sprite, etc. Does NOT remove global hooks!
	 */
	function clear(): void;

	/**
	 * Interprets lua code, doesn't return anything.
	 *
	 * @example
	 * ```ts
	 * lua.interprete("print('Hello World from lua!')");
	 * ```
	 */
	function interprete(code: string): void;
}


declare namespace ents {
	/**
	 * Returns a list of loaded entities (using FlexibleClass), it does NOT return objects
	 * like Text, Sprite, etc.
	 */
	function list(): FlexibleClass[];
}

declare namespace imgui {
	function SetNextWindowSize(size: Vector2): void;
	function Begin(title: string): void;
	function End(): void;

	function Text(text: string): void;
}


declare namespace android {
	/**
	 * Enables on screen joystick
	 */
	var joystick: boolean;
}

declare namespace http {
	/**
	 * Sends an HTTP GET request
	 */
	function get(url: string): string;
}

declare namespace json {
	/**
	 * Parses a JSON string
	 */
	function parse(json: string): any;

	/**
	 * Serializes an object
	 */
	function dump(obj: any): string;
}

declare namespace pointer {

	/**
	 * Returns the position of the mouse pointer
	 */
	function getPos(): Vector2;
}
