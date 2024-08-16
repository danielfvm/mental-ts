import { multiplyMatrices } from "./matrix";
import { Entity } from "./entity";

debug.showLog();

global.addHook("key_press", (key) => {
	print("key pressed: " + key);
	sky.setColor(mnt.color(255, math.random() * 255, 0, 255));
	if (key == "W") {
		sky.setColor({
			r: 255,
			g: math.random() * 255,
			b: 0,
			a: 255
		});
	}
});

interval.create((x: string) => {
	const title = find(".class == 'title_sonic'")[1].text as Text;
	title.setString(x);
}, 1000, "Hello World after 1 sec");

class Cube extends Entity {
	private faces: Sprite[];

	createQuad(index: number): Sprite {
		const sprite = mnt.sprite("test.png");
		sprite.setLayer(10);
		sprite.loadShader("model");
		sprite.setColor(mnt.color(index, 0, 0, 0));

		// Cube made out of 6 quads
		sprite.setShaderFloatArray("pos", [
			// Front face
			1, 1, 1,
			1, -1, 1,
			-1, 1, 1,
			-1, -1, 1,

			// Back face
			-1, -1, -1,
			1, -1, -1,
			-1, 1, -1,
			1, 1, -1,

			// Left face
			-1, -1, -1,
			-1, 1, -1,
			-1, -1, 1,
			-1, 1, 1,

			// Right face
			1, -1, -1,
			1, -1, 1,
			1, 1, -1,
			1, 1, 1,

			// Top face
			-1, 1, -1,
			-1, 1, 1,
			1, 1, -1,
			1, 1, 1,

			// Bottom face
			-1, -1, -1,
			1, -1, -1,
			-1, -1, 1,
			1, -1, 1,
		]);

		return sprite;
	}

	constructor() {
		super();

		this.faces = [
			this.createQuad(0),
			this.createQuad(1),
			this.createQuad(2),
			this.createQuad(3),
			this.createQuad(4),
			this.createQuad(5),
		];
	}

	translate(matrix: number[]) {
		this.faces.forEach((face) => {
			face.setShaderFloatArray("modelView", matrix);
		});
	}
}

const cube = new Cube();


let rot = [ 0, 0 ];
let last: number[] | null = null;
let prev: number[] = [0,0];

global.addHook("drag", ({x, y}) => {
	if (last == null) {
		last = [ rot[0] - x, rot[1] - y ];
		prev = [ x, y ];
	} else {
		if (math.sqrt((prev[0] - x) * (prev[0] - x) + (prev[1] - y) * (prev[1] - y)) < 50) {
			prev = [ x, y ];
			rot = [ last[0] + x, last[1] + y ];
		}
	}
});

global.addHook("mouse_release", () => {
	last = null;
});

global.addHook("think", () => {
	let c = math.cos(rot[1] * 0.01);
	let s = math.sin(rot[1] * 0.01);
	let modelView = multiplyMatrices(
		[
			screen.height, 0, 0, 0,
			0, screen.width, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, math.max(screen.width, screen.height),
		],
		[
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c,0,
			0, 0, 0, 1,
		]
	);

	let c2 = math.cos(rot[0] * 0.01);
	let s2 = math.sin(rot[0] * 0.01);
	let modelView2 = multiplyMatrices(
		modelView,
		[
			c2, s2, 0, 0,
			-s2, c2, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 10.0,
		]
	);


	cube.translate(modelView2);
});
