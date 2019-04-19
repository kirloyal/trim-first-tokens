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

		let editor = vscode.window.activeTextEditor;
	
		if (editor.selection.isEmpty) {
			return;
		}
		
		editor.edit((editBuilder) => {
			for(var i=editor.selection.start.line ; i <= editor.selection.end.line ; i++ )
			{
				var text = editor.document.lineAt(i).text;
				var idx_tk;
				var text_replace = "";
				if( (idx_tk = text.indexOf(' ' || '\t')) !== -1)
				{
					text_replace = text.substr(idx_tk+1);
				}
				editBuilder.replace(editor.document.lineAt(i).range, text_replace);	
				
			}
		}).then(success => {
			if (success) {
				editor.selection.active = editor.selection.anchor;
			}
		});
		vscode.window.showInformationMessage('Trim!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
