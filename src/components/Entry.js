import React from 'react';

export default class Entry extends React.Component {
    constructor(props) {
      super(props);
  
      
      this.state = {
        value: ''
      }
    }
  
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value)
        this.setState({value: ''})
      }
    
      handleChange(event) {
        this.setState({value: event.target.value})
      }
      render() {
    
        const {name, id} = this.props;
        return (
          <>
           <form onSubmit={this.handleSubmit.bind(this)} >
            <label for="entry">
              Entry for {name}:
              <br />
              <input className="entry" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
          </>
        )
      }
    }