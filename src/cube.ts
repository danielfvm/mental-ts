import {Entity} from "./entity";
import {multiplyMatrices} from "./matrix";

function createQuad(index: number): Sprite {
	const sprite = mnt.sprite("test.png");
	sprite.setLayer(10);
	sprite.loadShader("model");
	sprite.setColor(mnt.color(index, 0, 0, 0));
	sprite.setShaderFloatArray("pos", [
			/* Front  */  1, 1, 1, -1, -1, 1, -1, 1, 1, -1, -1, 1,
			/* Back   */ -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1,
			/* Left   */ -1, -1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1,
			/* Right  */  1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1,
			/* Top    */ -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, 1,
			/* Bottom */ -1, -1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1,
	]);

	return sprite;
}

export class Cube extends Entity {
	private faces: Sprite[];
	private rot = [0, 0];
	private last: number[] | null = null;
	private prev: number[] = [0, 0];

	constructor() {
		super();

		this.faces = [
			createQuad(0),
			createQuad(1),
			createQuad(2),
			createQuad(3),
			createQuad(4),
			createQuad(5),
		];

		global.addHook("mouse_release", () => this.mouse_release());
		global.addHook("think", () => this.update());
		global.addHook("drag", (pos) => this.drag(pos));
	}

	remove(): void {
		this.faces.forEach((face) => face.remove());
		super.remove();
	}

	translate(matrix: number[]) {
		this.faces.forEach((face) => {
			face.setShaderFloatArray("modelView", matrix);
		});
	}

	drag({x, y}: {x: number; y: number}) {
		if (this.last == null) {
			this.last = [this.rot[0] - x, this.rot[1] - y];
			this.prev = [x, y];
		} else {
			if (math.sqrt((this.prev[0] - x) * (this.prev[0] - x) + (this.prev[1] - y) * (this.prev[1] - y)) < 50) {
				this.prev = [x, y];
				this.rot = [this.last[0] + x, this.last[1] + y];
			}
		}
	}

	mouse_release() {
		this.last = null;
	}

	update() {
		let c = math.cos(this.rot[1] * 0.01);
		let s = math.sin(this.rot[1] * 0.01);
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
				0, -s, c, 0,
				0, 0, 0, 1,
			]
		);

		let c2 = math.cos(this.rot[0] * 0.01);
		let s2 = math.sin(this.rot[0] * 0.01);
		let modelView2 = multiplyMatrices(
			modelView,
			[
				c2, s2, 0, 0,
				-s2, c2, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 10.0,
			]
		);

		this.translate(modelView2);
	}
}
