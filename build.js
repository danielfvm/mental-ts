#!/usr/bin/env node
import fs from "fs";
import path from "path";

const { output, assets, autorun } = JSON.parse(fs.readFileSync("mntconfig.json", "utf-8"));
const extensions = {
	"logic/": [".lua"],
	"shaders/": [".gles"],
	"fonts/": [".ttf"],
	"sounds/": [".mp3", ".wav", ".flac", ".ogg"],
	"textures/": [".png", ".jpg", ".bmp", ".tga", ".gif", ".psd", ".hdr", ".pic", ".pnm"],
	"scenes/": [".scene"],
};
const additional = [
	{ "folder": ".", "filePath": "lualib_bundle.lua" },
];

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
	fs.rmSync(output, { recursive: true });
}

// copy all valid files to the new output folder
const files = assets
	.map((assetFolder) => readDir(assetFolder, assetFolder))
	.flat();

[...files, ...additional]
	.filter(({ filePath }) => isValid(filePath))
	.forEach(({ folder, filePath }) => {
		const relativePath = path.relative(folder, filePath);
		const subfolder = getSubfolder(filePath);
		const destination = path.join(output, subfolder, relativePath);

		// Create parent folders if it doesn't exist yet and then copy file
		fs.mkdirSync(path.dirname(destination), { recursive: true });

		// Unfortunately, we need to replace the path to lualib_bundle as `require` will 
		// search for it in the root folder, we cannot put lualib_bundle in the root folder
		// as it wouldn't allow to easily share the addon - downside you cannot rename the
		// addon folder!
		if (filePath.endsWith(".lua")) {
			let data = fs.readFileSync(filePath, "utf8");
			let newpath = path.join(output, "logic", "lualib_bundle");

			// We need to remove every folder in the path before the addons folder to find the root
			// TODO: Might not work on Windows
			newpath = newpath.substring(newpath.indexOf("addons/"));
			data = data.replace(
				`local ____lualib = require("lualib_bundle")`, 
				`local ____lualib = require("${newpath}")`, 
			);

			fs.writeFileSync(destination, data);
		} else {
			fs.copyFileSync(filePath, destination);
		}

		console.log(`Copied '${filePath}' -> '${destination}'`);
	});
