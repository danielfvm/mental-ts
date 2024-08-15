debug.showLog();

print("load sprite");
const color = mnt.color(100, 50, 30, 255);

const sprite = mnt.sprite("test.png");
sprite.setScale(1.2);
sprite.setColor(mnt.color(255, 255, 255, 255));
sprite.setLayer(30);

const text = mnt.text("Hello, World!");
text.setFont("sonic-mania-improved-v2.ttf");
text.setPos(mnt.vector2(0, 0));
text.setColor(mnt.color(255, 0, 255, 255));
text.setSize(50);
text.setScale(4);


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

const title = find(".class == 'title_sonic'")[1].text as Text;
title.setString("Hello, World!");

global.addHook("mouse_press", () => {
});

global.addHook("think", () => {
	sprite.setScale(math.sin(time.current * 4.0) + 1.2);
});
