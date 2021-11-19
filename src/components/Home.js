import React from 'react';
import '../App.css';

const Home = () => {
    return (
    <div>
       <p>
				This page allows you to view information about Marvel's comics, seriers and characters.. Start by clicking the button above to view data.
			</p>

			<p className='hometext'>
				The application queries Three of Marvel API end-points: https://gateway.marvel.com/v1/public/comics, https://gateway.marvel.com/v1/public/series and https://gateway.marvel.com/v1/public/characters.
				For quick searching of (Characters/Series/Comics) the user types into the search input Field.
			</p>
    </div>
)};

export default Home;