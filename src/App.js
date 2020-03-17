
import React, { Component } from 'react'
import "./app.css"

export default class App extends Component {
constructor(props) {
  console.log("constructor ....")
  super(props)

  this.state = {
     username:"ciwwan1980",
     repo:[],
     url:"https://api.github.com/user/repos",
     repoUrl:"https://api.github.com/ciwwan1980/repos",    
  }
}

componentDidMount(){
    console.log("componentDidiMount.... ")
    fetch(this.state.url,
      { 
      method: "GET",
      headers: {
        Authorization: `token ${process.env.REACT_APP_KEY}`
      }
    }).then(res=>{ 
      return res.json()
    }).then(data=>this.setState({repo:data}))

}
  
  render() {
    console.log("render ....")
    return (
      <div>
        <div className="header">
            <h1>Github API</h1>
            <button>Create git Repository</button>
        </div>
      
    <h2>UserName: {this.state.repo.length>0 ? this.state.repo[0].owner.login :"waiting"} </h2>
    <img src={this.state.repo.length>0?this.state.repo[0].owner.avatar_url:"img"} alt="avatar" width="100" height="100"/>

      <div className="repo">  <h1> Repository </h1>
      <div className="rep"> 
      <h3>Title: 1</h3>
          <p>Description</p>
          <p>Private</p>
      </div>
      <div className="rep"> 
      <h3>Title: 2</h3>
          <p>Description</p>
          <p>Public</p>
      </div>
        </div>
   


      </div>
    )
  }
}
