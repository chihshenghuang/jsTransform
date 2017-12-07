import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			output: '',
			err: '',
		}
	}

	update(e) {
		let code = e.target.value;

		try{
			this.setState({
				output: window.Babel.transform(code, {presets: ['es2015', 'react', 'stage-0']}).code,
				err: ''
			})	
		}
		catch(err){
			this.setState({err: err.message})		
		}
	}

	enableTab(e) {
		if(e.keyCode == 9) {
			var val = this.textarea.value,
				  start = this.textarea.selectionStart,
					end = this.textarea.selectionEnd;
			this.textarea.value = val.substring(0, start) + '\t' + val.substring(end)
			this.textarea.selectionEnd = start + 1;
			this.textarea.selectionStart = this.textarea.selectionEnd
			e.preventDefault()
		}
	} 

  render() {
    return (
  		<div>
				<header>{this.state.err}</header>
				<div className='container'>
					<textarea
					onChange={this.update.bind(this)}
					defaultValue={this.state.input}
					onKeyDown={this.enableTab.bind(this)}
					placeholder='/* Add your code here */'
					ref={(textarea) => {this.textarea = textarea;}}/>
					<pre>
						{this.state.output}
					</pre>
				</div>
			</div>
		)
  }
}

export default App;
