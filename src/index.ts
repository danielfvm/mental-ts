import {Cube} from "./cube";

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
