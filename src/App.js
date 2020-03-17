
import React, { Component } from 'react'

export default class App extends Component {
constructor(props) {
  console.log("constructor ....")
  super(props)

  this.state = {
     username:"ciwwan1980 ",
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
        <h1>Github API</h1>
    <h2>UserName: {this.state.repo.length>0 ? this.state.repo[0].owner.login :"waiting"} </h2>




    <img src={this.state.repo.length>0?this.state.repo[0].owner.avatar_url:"img"} alt="avatar" width="200" height="200"/>
      </div>
    )
  }
}
