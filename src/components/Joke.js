import React, { Component } from 'react';
import '../style/Joke.css'

class Joke extends Component {

	getEmoji = () => {
		if(this.props.votes >= 15){
			return "em em-rolling_on_the_floor_laughing"
		} else if(this.props.votes >= 12){
			return "em em-laughing"
		} else if(this.props.votes >= 9){
			return "em em-smiley"
		} else if(this.props.votes >= 6){
			return "em em-slightly_smiling_face"
		} else if(this.props.votes >= 3){
			return "em em-neutral_face"
		} else if(this.props.votes >= 0){
			return "em em-confused"
		} else {
			return "em em-angry"
		}
	}

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
					<i className={this.getEmoji()}></i>
				</div>
			</div>
		);
	}
}

export default Joke;