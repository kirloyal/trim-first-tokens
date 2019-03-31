// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "trim-first-tokens" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.trimFirstTokens', () => {
		// The code you place here will be executed every time your command is executed

		if (!vscode.window.activeTextEditor) {
			return;
		}

		const editor = vscode.window.activeTextEditor;
	
		if (editor.selection.isEmpty) {
			return;
		}
		
		let text = editor.document.getText(editor.selection);
		
		var idx_cl = -1, idx_nl = -1;
		var idx_tk;
		while ((idx_nl = text.indexOf('\n', idx_cl+1)) !== -1){
			idx_tk = text.indexOf(' ' || '\t', idx_cl+1);
			while(text[++idx_tk] === ' ') { }
			if(idx_tk < idx_nl)
			{
				text = text.substr(0,idx_cl+1) + text.substr(idx_tk);				
			}
			idx_cl = text.indexOf('\n', idx_cl+1);
		}

		if( (idx_tk = text.indexOf(' ' || '\t', idx_cl+1)) !== -1)
		{
			text = text.substr(0,idx_cl+1) + text.substr(idx_tk+1);
		}
		
		editor.edit((editBuilder) => {
			editBuilder.replace(editor.selection, text);
		}).then(success => {
			if (success) {
				editor.selection.active = editor.selection.anchor;
			}
		});
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
