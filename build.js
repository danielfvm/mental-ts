#!/usr/bin/env node
import fs from "fs";
import path from "path";

const {output, assets, autorun} = JSON.parse(fs.readFileSync("mntconfig.json", "utf-8"));
const extensions = {
	"logic/": [".lua"],
	"shaders/": [".gles", ".gls", ".glsl"],
	"fonts/": [".ttf"],
	"sounds/": [".mp3", ".wav", ".flac", ".ogg"],
	"textures/": [".png", ".jpg", ".bmp", ".tga", ".gif", ".psd", ".hdr", ".pic", ".pnm"],
	"scenes/": [".scene"],
};

function isValid(filePath) {
	// check if exists
	if (!fs.existsSync(filePath)) {
		return false;
	}

	// check if file extensions is valid
	return Object.values(extensions).some((extensions) => {
		return extensions.some((ext) => filePath.endsWith(ext));
	});
}

function getSubfolder(filePath) {

	// Check if file should be put in autorun
	let contains_path = autorun.some((autorun_path) => {
		return path.resolve(autorun_path) === path.resolve(filePath);
	});

	if (filePath.endsWith(".lua") && contains_path) {
		return "logic/autorun/";
	}

	return Object.entries(extensions).find((extensions) => {
		return extensions[1].some((ext) => filePath.endsWith(ext));
	})[0];
}

// read all files from assets recursively
function readDir(assetFolder, dir) {
	if (!fs.existsSync(dir)) {
		return [];
	}

	const files = fs.readdirSync(dir);
	const assets = [];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			assets.push(...readDir(assetFolder, filePath));
		} else {
			assets.push({
				"folder": assetFolder,
				"filePath": filePath
			});
		}
	}

	return assets;
}


// Delete the old output folder
if (fs.existsSync(output)) {
	fs.rmSync(output, {recursive: true});
}

// copy all valid files to the new output folder
const files = assets
	.map((assetFolder) => readDir(assetFolder, assetFolder))
	.flat();

const addon_name = path.basename(output);

const luaSources = files
	.filter(({filePath}) => filePath.endsWith(".lua"))
	.map(({filePath, folder}) => {
		const subfolder = filePath.substring(folder.length, filePath.length - 4);
		return {
			generated_path: filePath.substring(0, filePath.length - 4).replace(/\//gi, "."),
			fixed_path: path.join("addons", addon_name, "logic", subfolder).replace(/\//gi, "."),
		}
	});

files
	.filter(({filePath}) => isValid(filePath))
	.forEach(({folder, filePath}) => {
		const relativePath = path.relative(folder, filePath);
		const subfolder = getSubfolder(filePath);
		const destination = path.join(output, subfolder, relativePath);

		// Create parent folders if it doesn't exist yet and then copy file
		fs.mkdirSync(path.dirname(destination), {recursive: true});

		if (filePath.endsWith(".lua")) {
			let data = fs.readFileSync(filePath, "utf8");

			for (const luaSource of luaSources) {
				data = data.replace(
					`require("${luaSource.generated_path}")`,
					`require("${luaSource.fixed_path}")`,
				);
			}

			fs.writeFileSync(destination, data);
		} else {
			fs.copyFileSync(filePath, destination);
		}

		console.log(`Copied '${filePath}' -> '${destination}'`);
	});
