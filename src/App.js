
import React, { Component } from 'react'
import "./app.css"

export default class App extends Component {
  constructor(props) {
    console.log("constructor ....")
    super(props)

    this.state = {
      username: "ciwwan1980",
      repo: [],
      url: "https://api.github.com/user/repos",
     repoUrl: "https://api.github.com/user/repos?sort=created",
      title: "",
      description: "",
      status: false,
      readme: false,
      showCreateRepo:false
    }
  }
  createRepo = (e) => {
    e.preventDefault()
  let userrepo = {
         name: this.state.title,
         description: this.state.description,
        private: this.state.status,
        auto_init: this.state.readme
  } 

  fetch(this.state.url, {
    method:"POST",
    headers:{
      Authorization: `token ${process.env.REACT_APP_KEY}`
    },
    body:JSON.stringify(userrepo)
  })
  .then(res=>res.json()).then(data=>this.setState({title:"",description:""}))
  }

  componentDidMount() {
    console.log("componentDidiMount.... ")
    fetch(this.state.repoUrl,
      {
        method: "GET",
        headers: {
          Authorization: `token ${process.env.REACT_APP_KEY}`
        }
      }).then(res => {
        return res.json()
      }).then(data => this.setState({ repo: data }))

  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Github API</h1>
          <button onClick={()=>this.setState({showCreateRepo:true})}>Create git Repository</button>
        </div>

        <h2>UserName: {this.state.repo.length > 0 ? this.state.repo[0].owner.login : "waiting"} </h2>
        <img src={this.state.repo.length > 0 ? this.state.repo[0].owner.avatar_url : "img"} alt="avatar" width="100" height="100" />

        <div className="repo">
          <h1> Repository </h1>
          <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
            {this.state.repo.length > 0 ? this.state.repo.map((repo, i) => {
              return (<div className="rep" key={i}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <h3>{repo.name}</h3>
                  <h4>{repo.created_at}</h4>
                </div>
                <p>{repo.description}</p>
                <p>{repo.private ? "Private" : "Public"}</p>
                <p><a href={repo.url}> {repo.full_name} </a></p>
              </div>)
            }) : null}</div>


        </div>
        {this.state.showCreateRepo?( <div className="rightpanel">
          <div className="closebtn" onClick={()=>this.setState({showCreateRepo:false})}>X</div>
          <h1>Create Your Repository</h1>
          <form onSubmit={this.createRepo}>
            <label>Repository Name:
              <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
            </label>
            <label>Description (optional):
              <input type="text" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
            </label>

            <label>
              <input type="radio" value={this.state.status} name="status" onChange={(e) => this.setState({ status: e.target.value })} />Private:
            </label>
            <label>
              <input type="radio" value={this.state.status} name="status" onChange={(e) => {
                console.log("radio ", e)
                this.setState({ status: e.target.value })
              }} />Public
            </label>

            <label>
              <input type="checkbox" value={this.state.readme} onChange={(e) => {
                console.log("checkbox", e)
                this.setState({ readme: e.target.value })
              }} />intitial this repository with readme
            </label>

            <button>cancel</button>

            <input type="submit" value="create repository" />
          </form>
        </div>):null }
       


      </div>
    )
  }
}
