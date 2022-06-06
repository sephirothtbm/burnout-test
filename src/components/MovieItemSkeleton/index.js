import {
	Grid,
	Card,
	CardContent,
	CardActions,
	Skeleton, } from '@mui/material/';

const MovieItemSkeleton = () => {

	return (
		<Grid item xs={4} md={2} >
			<Card sx={{ maxWidth: 220, maxHeight: 610, minHeight: 610, }}>
				<Skeleton variant='rectangular' width={220} height={330} />
				
				<CardContent>
					<Skeleton variant='text' />
					<Skeleton width={90} />
					
					<div style={styles.topSpacer} >
						<Skeleton variant='text' />
						<Skeleton variant='text' />
						<Skeleton variant='text' />
						<Skeleton variant='text' />
					</div>

					<div style={styles.topSpacer} >
						<Skeleton variant='text' />
						<Skeleton variant='text' />
					</div>
				</CardContent>

				<CardActions>
					<Skeleton variant='circular' width={23} height={23} />
					<Skeleton variant='circular' width={23} height={23} />
					<Skeleton variant='rectangular' width={90} height={23} />
				</CardActions>
			</Card>
		</Grid>
	);

};

const styles = {
	topSpacer: {
		marginTop: 23,
	},
};

export default MovieItemSkeleton;