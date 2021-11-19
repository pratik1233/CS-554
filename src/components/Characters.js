import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { charactersCheck,charactersSearch } from '../config/Helpers.js';
import { Link, useHistory } from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';

import '../App.css';

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #178577',
		fontWeight: 'bold',
		backgroundColor : '#ffffff',
		color: '#178577'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});



const Characters = (props) => {
const history = useHistory();
const limit = 20;
const offSet = 0;
let cal = 0;
const classes = useStyles();
const[total,totalSet] = useState(0);
const [count, setCount] = useState(parseInt(props.match.params.page));
const [oldCount, setOldCount] = useState(0)
const [ loading, setLoading ] = useState(true);
const [ searchData, setSearchData ] = useState(undefined);
const [ showsData, setShowsData ] = useState(undefined);
const [ searchTerm, setSearchTerm ] = useState('');
let card = null;


useEffect(() => {
		console.log('search useEffect fired');
		async function fetchData() {
			setLoading(true);
			try {
				console.log(`in fetch searchTerm: ${searchTerm}`);
				const { data } = await axios.get(charactersSearch(searchTerm));
				setSearchData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		}
		if (searchTerm) {
			console.log ('searchTerm is set');
			fetchData();
		}
	},[searchTerm]
);

useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			if(count === oldCount) {
				try {
					const { data } = await axios.get(charactersCheck(limit,offSet));
					totalSet(data.data.total);
					setShowsData(data);
					setLoading(false);
					setOldCount(count);
				} catch (e) {
					console.log(e);
					setLoading(false);
				}
		}else{
			try {
				history.push("/characters/page/"+count);
				let offSetNew = count * 20;
				const { data } = await axios.get(charactersCheck(limit,offSetNew));
				totalSet(data.data.total);
				setShowsData(data);
				setLoading(false);
				setOldCount(count)
			} catch (e) {
				setLoading(false);
			}
		}
		}
		fetchData();
	}, [count]);



	if(total !== 0){
		 cal = Math.floor((total-20)/limit);
	}


	const searchValue = async (value) => {
		setSearchTerm(value);
	};

    const buildCard = (show) => {
        let imageLink = show?.thumbnail?.path + '/portrait_incredible.'+show?.thumbnail?.extension;
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show?.id}>
				<Card className={classes.card} variant='outlined'>
						<Link to={`/characters/${show?.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={show?.thumbnail?.path  ? imageLink : noImage}
								title='show image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
									{show?.name}
								</Typography>
							</CardContent>
						</Link>
				</Card>
			</Grid>
		);
	};



	if (searchTerm && searchTerm.length !== 0) {
		if(searchData?.data?.results.length === 0){
			return (
				<div>
					<SearchShows searchTerm={searchTerm} searchValue={searchValue} />
				<br />
					<h2>No characters available with search {searchTerm}</h2>
				</div>
			);
		}else{
			card =
		searchData?.data?.results &&
		searchData?.data?.results.map((shows) => {
			
			return buildCard(shows);
		});
		}
	} else if(showsData !== undefined){

            card =
			showsData.data.results &&
			showsData.data.results.map((show) => {
				return buildCard(show);
			});
	}

	
	

	const nextPage = () => {
			setCount(count+1);
	}

	const previousPage = () => {
		setCount(count-1);
	}
    

 

    if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}else if(searchTerm){
		return (
			<div>
				<SearchShows searchTerm={searchTerm} searchValue={searchValue} />
				<br />
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}else if(count < 0 || count > cal+1){
		return (
			<div>
				<h2>404 - Characters List not found</h2>
				<Link to='/'>Back to Home...</Link>
			</div>
		);
	}else if(count === 0){
		return (
			<div>
				<SearchShows searchTerm={searchTerm} searchValue={searchValue} />
				<br />
				<br />
			<button onClick={nextPage}>Next</button>
			<br />
			<br />
			<Grid container className={classes.grid} spacing={5}>
				{card}
			</Grid>
		</div>
		);
	}else if(count === cal+1){
		return (
			<div>
				<SearchShows searchTerm={searchTerm} searchValue={searchValue} />
				<br />
				<br />
			<button onClick={previousPage}>Previous</button>
			<br />
			<br />
			<Grid container className={classes.grid} spacing={5}>
				{card}
			</Grid>
		</div>
		);
	}else{
		return (
			<div>
				<SearchShows searchTerm={searchTerm} searchValue={searchValue} />
				<br />
				<br />
				<button onClick={nextPage}>Next</button>
                <button onClick={previousPage}>Previous</button>
				<br />
			    <br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
	);
  }
};

export default Characters;