import React, { Component } from 'react';
import './App.css';
import marked from 'marked'
import DOMPurify from 'dompurify';


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      value: ``,
       breaks:true
    }
  }
  componentDidMount() {

    this.setState({
      value: 
`> This is a Blockquote
# This is a Heading
## A Sub Heading
**This text is bold**
1. This is Item number 1
2. Item number 2
  2.1 Item number 2.1
3. Item number 3
  - Unordered list item

[A link!]('https://google.com')

![An image of Strepera fuliginosa](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Strepera_fuliginosa_4.jpg/64px-Strepera_fuliginosa_4.jpg)`
    })
  }

  handleChange= (e) =>{
    this.setState({
      value: e.target.value
    })
  }

  addBreaks =() =>{
    this.setState({
      breaks:!this.state.breaks
    })
  }

  previewMarkdown = () =>{
    let data = this.state.value
    let rawMarkup = marked(data, {breaks:this.state.breaks});
    let cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  }

  render() {
    return (
      <div className="App">
        <div className="container">
        <div className="title" >
            <h1>MarkDown Previewer</h1>
            <p>Just start typing Markdown syntax in the left area and see results on the right!</p>
        </div>
          <div className="options">
            <input type="checkbox" checked={this.state.breaks} onClick={this.addBreaks} id="add-breaks" />
            <label for="add-breaks">Add Breaks</label>
          </div>
          <div className="play-ground">
            <textarea autoFocus="true" className="input-box area-view" value={this.state.value} onChange={this.handleChange}/>
            <div className="preview-box area-view" dangerouslySetInnerHTML={this.previewMarkdown()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
