import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { charactersId } from '../config/Helpers.js';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 550,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
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

const Show = (props) => {
	const [ showData, setShowData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ noData, setNoData ] = useState(0);	
	const classes = useStyles();
	let singleShowData = null;

	useEffect(
		
		() => {
			console.log ("useEffect fired");
			async function fetchData() {
				try {
					const { data: show } = await axios.get(charactersId(props.match.params.id));
					setShowData(show);
					setLoading(false);
				} catch (e) {
					setNoData(-1);
					setLoading(false);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);


	const buildSingleData = (show) => {
		let imageLink = show.thumbnail.path + '/portrait_incredible.'+show.thumbnail.extension;
		return (
			<Card className={classes.card} variant='outlined'>
				<CardHeader className={classes.titleHead} title={show.name} />
				<CardMedia
					className={classes.media}
					component='img'
					image={show.thumbnail.path  ? imageLink : noImage}
					title='show image'
				/>

				<CardContent>
				<Typography variant='body2' color='textSecondary'>
				<dl>
							
								<dt className='title'>Description :</dt>
								{show && show.description ? <dd>{show.description}</dd> : <dd>N/A</dd>}
							
				</dl>
				<dl>			
							
								<dt className='title'>Comics which feature this character :</dt>
								{show && show.comics.items && show.comics.items.length >= 1 ? (
									
										show.comics.items.map((genre) => {
											if (show.comics.items > 1) return <dd key={genre.name}>{genre.name},</dd>; 
											return <dd key={genre.name}>{genre.name},</dd>;
										})
								
								) : (
									<dd>N/A</dd>
								)}		
				</dl>
				  <dl>
							
								<dt className='title'>Series which feature this character :</dt>
								{show && show.series.items && show.series.items.length >= 1 ? (
									
										show.series.items.map((genre) => {
											if (show.series.items > 1) return <dd key={genre.name}>{genre.name},</dd>; 
											return <dd key={genre.name}>{genre.name},</dd>;
										})
									
								) : (
									<dd>N/A</dd>
								)}
						</dl>
						<dl>
							
								<dt className='title'>Stories which feature this character :</dt>
								{show && show.stories.items && show.stories.items.length >= 1 ? (
									
										show.stories.items.map((genre) => {
											if (show.stories.items > 1) return <dd key={genre.name}>{genre.name},</dd>; 
											return <dd key={genre.name}>{genre.name},</dd>;
										})
									
								) : (
									<dd>N/A</dd>
								)}
							
				</dl>
				<Link to='/'>Back to Home...</Link>
				</Typography>
				</CardContent>
			</Card>
		);
	};

	if(showData !== undefined){
		singleShowData = 
		showData.data.results &&
		showData.data.results.map((show) => {
			return buildSingleData(show);
			});
    }

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}else if(noData === -1){
		return (
			<div>
				<h2>404 - Character does not exist</h2>
				<Link to='/'>Back to Home...</Link>
			</div>
		);
	} else {
		return (
			<div>
				{singleShowData}
			</div>
			
		);
	}
 };

export default Show;
