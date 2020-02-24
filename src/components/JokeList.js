import React, { Component } from 'react'

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
		console.log("COMPONRNT DID MOUNT");
		
		let jokes = []
		while(jokes.length < this.props.jokesToGet){
			const res = await fetch('https://icanhazdadjoke.com/', {headers: {Accept:'application/json'}})
			const json = await res.json()
			console.log(json);
			
			jokes.push(json.joke);
			console.log(jokes);
			
		}
		this.setState({jokes: jokes})
	}

	render() {
		return (
			<div className='JokeList'>
				<h1>Dad Jokes</h1>
				<div className="JokeList-jokes">
					{this.state.jokes.map(joke => <h2>{joke}</h2>)}
				</div>
			</div>
		);
	}
}

export default JokeList