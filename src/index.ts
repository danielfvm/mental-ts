// TODO: Figure out how to move this into `mental-types` folder and import Entity from there
class Entity {
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

/** Script starts here **/
// debug.showLog();

const text = mnt.text("Hello, World!");
text.setFont("sonic-mania-improved-v2.ttf");
text.setPos(mnt.vector2(0, 0));
text.setColor(mnt.color(255, 0, 255, 255));
text.setSize(50);


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

class MyTest extends Entity {
	private sprite: Sprite;

	constructor() {
		super();

		this.addHook("think", this.update.bind(this));
		this.sprite = mnt.sprite("test.png");
		this.sprite.setScale(1.2);
		this.sprite.setLayer(-1);
		this.sprite.setPos(0, -screen.height / 5);
	}

	update() {
		this.sprite.setScale(math.sin(time.current * 4.0) * 2.0 + 10.0);
	}
}

const entity = new MyTest();
