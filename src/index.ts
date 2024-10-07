import {Cube} from "./cube";
import {Entity} from "./entity";


debug.setEnabled(true);
lua.clear();
screen.addShader("gameoflife");
print("loaded");

global.addHook("key_press", (key) => {
	if (key == "Escape") {
		game.exit();
	}
});

const circle = mnt.sprite("pixel.png");
circle.setScale(0);

global.addHook("drag", (pos) => {
	circle.setScale(1);
	print(pos.x + " " + pos.y);
	circle.setPos(mnt.vector2(pos.x - screen.width / 2, pos.y - screen.height / 2));
});

global.addHook("mouse_release", () => {
	circle.setScale(0);
})

/*scene.load("empty.scene");

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

const cube = new Cube();

function serialize(obj: any, prefix = "") {
	Object.entries(obj).forEach(([key, value]) => {
		if (typeof value === "object") {
			print(prefix + key + ": ");
			serialize(value, prefix + "\t");
		} else {
			print(prefix + key + ": " + value);
		}
	})
}

serialize(lua);

lua.interprete(`print("Hello World from lua!")`);


type Shape = (self: Draggable, pos: Vector2) => boolean;

function createRect(size: Vector2): Shape { 
	return (self: Draggable, pos: Vector2) =>
		self.pos.x - size.x / 2 <= pos.x && self.pos.x + size.x / 2 >= self.pos.x && 
		self.pos.y - size.y / 2 <= pos.y && self.pos.y + size.y / 2 >= self.pos.y;
}

function createCircle(radius: number): Shape {
	return (self: Draggable, pos: Vector2) =>
		Math.sqrt((pos.x - self.pos.x) * (pos.x - self.pos.x) + (pos.y - self.pos.y) * (pos.y - self.pos.y)) <= radius;
}


class Draggable extends Entity {
	public pos: Vector2;
	public shape: Shape;

	private last: Vector2 | null = null;
	private prev: Vector2 = mnt.vector2(0, 0);

	constructor(pos: Vector2, shape: Shape) {
		super();
		this.pos = pos;
		this.shape = shape;

		this.addHook("mouse_release", this.mouse_release.bind(this));
		this.addHook("think", this.update.bind(this));
		this.addHook("drag", this.drag.bind(this));
	}

	inBounds(pos: Vector2): boolean {
		return this.shape(this, pos);
	}

	drag(pos: Vector2) {
		if (!this.inBounds(pos)) {
			return;
		}

		if (this.last == null) {
			this.last = mnt.vector2(this.pos.x - pos.x, this.pos.y - pos.y);
			this.prev = mnt.vector2(pos.x, pos.y);
		} else {
			// We do this because drag event doesn't work properly and sends random values in between the correct ones
			const distance = math.sqrt((this.prev.x - pos.x) * (this.prev.x - pos.x) + (this.prev.y - pos.y) * (this.prev.y - pos.y));

			if (distance < 50) {
				this.prev = mnt.vector2(pos.x, pos.y);
				this.pos = mnt.vector2(this.last.x + pos.x, this.last.y + pos.y);
			}
		}
	}

	mouse_release() {
		this.last = null;
	}
	
	update() {
	}
}

print("\nScene entities: ");
for (const entity of ents.list()) {
	print(`\t${entity.name} [${entity.id}]`);
}*/

// require("custom.lib.libcpp_library");
// custom.enableCullFace();
