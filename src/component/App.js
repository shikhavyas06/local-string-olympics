import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
		firstStringWinCount : 0,
		firstStringValue : "",
	}
	this.char_count = this.char_count.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();    
	let alphabets = ['z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
	let regexNo = /no/;
	let regexNumberSpecialChar = /[0-9-!@#$%*?;_]/;
	let firstStringWinCounter = 0;
	let reader = new FileReader();

	reader.onload = (e) => {		  
		  let lines = reader.result.split('\n');
		  lineStart: for (let line = 0; line < lines.length; line++) {
			let arrstr = lines[line].split(" ");
			if (arrstr.length > 1) {				
			  if (regexNo.test(arrstr[0]) || regexNumberSpecialChar.test(arrstr[0]) || regexNo.test(arrstr[1]) || regexNumberSpecialChar.test(arrstr[1])) {				
				firstStringWinCounter++;				
				if(line === 67){
					this.setState({firstStringValue: arrstr[0]});
				}
				continue;
			  } else {
				for (let i = 0; i < alphabets.length; i++) {
				  if (this.char_count(arrstr[0], alphabets[i]) > this.char_count(arrstr[1], alphabets[i])) {
					firstStringWinCounter++;
					if(line === 67){
						this.setState({firstStringValue: arrstr[0]});
					}
					continue lineStart;
				  } else {
					continue lineStart;
				  }
				}
			  }
			}
		  }
		  this.setState({firstStringWinCount: firstStringWinCounter});
		}; reader.readAsText(this.fileInput.current.files[0]);
  }
  char_count(str, letter) {
	  let letter_Count = 0;
	  for (let position = 0; position < str.length; position++) {
		if (str.charAt(position) === letter) {
		  letter_Count += 1;
		}
	  }
	  return letter_Count;
  }
  render() {
    return (
		 <div className="container">
		   <div className="row">
			 <div className="col-md-12 text-center p-2 header-text">
			   Local String Olympics
			 </div>         
		   </div>
		   <div className="row content mt-1 p-2">
			 <div className="col-md-6">
			   <div className="card">
				 <div className="card-body">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label for="input">Upload Input File</label>
							<input type="file" className="form-control-file" id="input-file" ref={this.fileInput}/>							
						</div>
						<button type="submit" className="btn btn-primary">Check Result</button>
					</form>
				 </div>
				</div>
			</div>
			<div className="col-md-6">
				<table className="table">  
					<tbody>    
						<tr>
						  <td>First String Win Count : {this.state.firstStringWinCount}</td>
						</tr>
						<tr>
						  <td>First String Value For 68th Time : {this.state.firstStringValue}</td>
						</tr>
					</tbody>
				</table>
			</div>
		   </div>
		 </div>
    )
  }
}
