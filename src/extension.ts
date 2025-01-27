// reference:
// https://code.visualstudio.com/api/working-with-extensions/
// see npm scripts for commands to package / publish / install package for testing
// debug with debug button in VS Code

// color theme : blink (rainglow)
// MANUAL APPROACH
// https://medium.com/@camdenb/colorful-vscode-titlebars-for-better-productivity-b05a619defed
// THEME COLOR CHANGING
// https://code.visualstudio.com/api/references/theme-color
// SAMPLES
// https://marketplace.visualstudio.com/items?itemName=RolandGreim.sample-ext

// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

async function updateConfig(enteredColor: any) {
	// if user pressed ESC to cancel
	if (enteredColor === undefined) {
		return;
	} 

	// get reference to workspace configuration and set titleBar color
	let config:vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
	let value:Object;
	if (enteredColor === "remove") {
		value = {};
	} else {
		value = {
			"titleBar.activeBackground": enteredColor,
			"titleBar.inactiveBackground": enteredColor,
			"titleBar.activeForeground": "#FFFFFF",
			"statusBar.background": enteredColor,
			"statusBar.debuggingBackground": enteredColor,
			"statusBar.noFolderBackground": enteredColor,
			"statussBar.prominentBackground": enteredColor
		};
	}
	// undefined so it only updates the workspace configurations and not globally
	// updates the .vscode/settings.json file of project folder
	await config.update("workbench.colorCustomizations", value, undefined);
}

async function colorMe(color?:string) {

	// check if VS Code has project folder open - if not this extension does nothing :(
	if (vscode.workspace.workspaceFolders === undefined) {
		vscode.window.showErrorMessage("Error : No project folder (workspace) opened");
		return;
	}

	if (color === "remove") {
		updateConfig("remove");	
	} else if (color === "title") {
		updateConfig("title");
	} else if (color === undefined) {
		// color hexcode input required from user
		// regular expression to validate hex color user input
		let regex:RegExp = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
		// getting color hexcode input from user
		let options:vscode.InputBoxOptions = {
			password: false,
			placeHolder: "#FF0000",
			prompt: "Enter a Color Hex Code :)",
			validateInput: (text: string) => {
				if (!text.match(regex)) {
					return "Invalid Hex Code :(";
				} else {
					return null;
				}
			}
		};
		vscode.window.showInputBox(options).then((enteredColor:any) => updateConfig(enteredColor));
	} else {
		updateConfig(color);
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// setup VS Code Commands
	let commands = [
		vscode.commands.registerCommand('extension.colorStamp', () => colorMe()),
		vscode.commands.registerCommand('extension.colorStamp-Blue', () => colorMe("#3399FF")),
		vscode.commands.registerCommand('extension.colorStamp-Red', () => colorMe("#C60909")),
		vscode.commands.registerCommand('extension.colorStamp-Green', () => colorMe("#19A119")),
		vscode.commands.registerCommand('extension.colorStamp-Yellow', () => colorMe("#DAD70E")),
		vscode.commands.registerCommand('extension.colorStamp-Orange', () => colorMe("#E49427")),
		vscode.commands.registerCommand('extension.colorStamp-Purple', () => colorMe("#7C21D7")),
		vscode.commands.registerCommand('extension.colorStamp-Silver', () => colorMe("#708090")),
		vscode.commands.registerCommand('extension.colorStamp-Khaki', () => colorMe("#BDB76B")),
		vscode.commands.registerCommand('extension.colorStamp-X', () => colorMe("remove")),
	];

	context.subscriptions.concat(commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
