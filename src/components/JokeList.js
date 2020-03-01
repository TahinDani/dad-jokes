import React, { Component } from 'react'
import '../style/JokeList.css'
import Joke from './Joke'

class JokeList extends Component {
	static defaultProps = {
		jokesToGet: 10
	}

	constructor(props) {
		super(props)
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
			loading: false,
		}
		this.seenJokes = new Set(this.state.jokes.map(j => j.id))
	}

	componentDidMount() {
		if(this.state.jokes.length === 0){
			this.getJokes()
		}
	}

	getJokes = async () => {
		try{
			let jokes = []
			while(jokes.length < this.props.jokesToGet){
				const res = await fetch('https://icanhazdadjoke.com/', {headers: {Accept:'application/json'}})
				const json = await res.json()
				if(!this.seenJokes.has(json.id)){
					jokes.push({id: json.id, text: json.joke, votes: 0});
					this.seenJokes.add(json.id)
				}
			}
			this.setState(st => ({
				jokes: [...st.jokes, ...jokes],
				loading: false
			}),
			() => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
			)
		} catch(e){
			alert(e)
			this.setState({loading: false})
		}	
	}

	handleVote = (id, delta) => {
		this.setState(st =>({
			jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta} : j)
		}),
		() => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
		)
	}

	handleClick = () => {
		this.setState({loading: true}, this.getJokes)
	}

	render() {
		let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
		return (
			<div className='JokeList'>
				<div className="JokeList-sidebar">
					<h1 className='JokeList-title'>Dad Jokes</h1>
					<img src='../man.svg' alt='dad logo'></img>
					<button className="JokeList-getmore" onClick={this.handleClick}>New jokes</button>
				</div>
				<div className="JokeList-jokes">
					{!this.state.loading ? 
						this.state.jokes.map(joke => 
							<Joke 
								id={joke.id}
								key={joke.id}
								text={joke.text}
								votes={joke.votes}
								handleVote={this.handleVote}
							/>)
						: 
						<h1 style={{width: "fit-content", margin: "10px auto"}}>Loading...</h1>
					}
				</div>
			</div>
		);
	}
}

export default JokeList