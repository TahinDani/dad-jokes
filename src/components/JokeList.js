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
			jokes: []
		}
	}

	async componentDidMount() {
		let jokes = []
		while(jokes.length < this.props.jokesToGet){
			const res = await fetch('https://icanhazdadjoke.com/', {headers: {Accept:'application/json'}})
			const json = await res.json()
			jokes.push({id: json.id, text: json.joke, votes: 0});
		}
		this.setState({jokes: jokes})
	}

	handleVote = (id, delta) => {
		this.setState(st =>({
			jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta} : j)
		}))
	} 

	render() {
		return (
			<div className='JokeList'>
				<div className="JokeList-sidebar">
					<h1 className='JokeList-title'>Dad Jokes</h1>
					<img src='../man.svg' alt='dad logo'></img>
					<button className="JokeList-getmore">New jokes</button>
				</div>
				<div className="JokeList-jokes">
					{this.state.jokes.map(joke => 
						<Joke 
							id={joke.id}
							key={joke.id}
							text={joke.text}
							votes={joke.votes}
							handleVote={this.handleVote}
						/>)}
				</div>
			</div>
		);
	}
}

export default JokeList