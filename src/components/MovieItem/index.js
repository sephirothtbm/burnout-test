import PropTypes from 'prop-types'

import {
	Grid,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Rating,
	IconButton, } from '@mui/material/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const MovieItem = ({item}) => {

	const TITLE_LENGTH 		= item?.title?.split(' ').length || 0;
	const OVERVIEW_LENGTH 	= item?.overview?.split(' ').length || 0;

	return (
		<Grid item xs={4} md={2} >
			<Card sx={{ maxWidth: 220, maxHeight: 610, minHeight: 610, }}>
				<CardMedia
					component='img'
					height='330'
					image={`https://image.tmdb.org/t/p/w220_and_h330_face${item?.poster_path}`}
					alt={item?.title}
				/>
				
				<CardContent>
					<div style={styles.titleWrapper}>
						<Typography
							component='div'
							variant='subtitle2'
							gutterBottom
						>
							{ item?.title?.split(' ').splice(0, 8).join(' ') }
							{ TITLE_LENGTH >= 8 && '...' }
						</Typography>
						<Rating
							readOnly
							precision={0.1}
							size='small'
							max={5}
							value={item?.vote_average / 2}
							mt={-10}
							style={{top: -8, left: -2}}
						/>
					</div>

					<Typography
						variant='body2'
						gutterBottom
						style={styles.overview}
					>
						{ item?.overview?.split(' ').splice(0, 13).join(' ') }
						{ OVERVIEW_LENGTH >= 13 && '...' }
					</Typography>

					<Typography
						variant='caption'
						gutterBottom
						style={styles.extraInfo}
					>
						Release date: { item?.release_date }
						{"\n"}
						Original language: {item?.original_language}
					</Typography>
				</CardContent>

				<CardActions>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>

					<Button>Learn more</Button>
				</CardActions>
			</Card>
		</Grid>
	);

};

const styles = {
	titleWrapper: {
		height: 72,
	},

	overview: {
		height: 80,
	},

	extraInfo: {
		position: 'relative',
		top: 10
	},
};

MovieItem.propTypes = {
	item: PropTypes.object,
};

export default MovieItem;