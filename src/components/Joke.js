import React, { Component } from 'react';
import '../style/Joke.css'

class Joke extends Component {
	render() {
		return (
			<div className='Joke'>
				<div className="Joke-buttons">
					<span className='Joke-arrows'role='img' onClick={() => this.props.handleVote(this.props.id, 1)} aria-label='upvote'>🔼️</span>
					<span className='Joke-votes'>{this.props.votes}</span>
					<span className='Joke-arrows'role='img' onClick={() => this.props.handleVote(this.props.id, -1)} aria-label='downvote'>🔽️</span>
				</div>
				<div className="Joke-text">
					{this.props.text}
				</div>
				<div className="Joke-emoji">
					<i class="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
				</div>
			</div>
		);
	}
}

export default Joke;