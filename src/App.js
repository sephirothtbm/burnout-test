import { useState, useEffect, } from 'react';

import {
	Container,
	Grid,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Pagination,
	Box,
	Typography, } from '@mui/material/';

import MovieItem from './components/MovieItem';
import MovieItemSkeleton from './components/MovieItemSkeleton';

import { movieDB } from './api';

import './App.css';




function App() {

	const [pages, setPages] 			= useState(1);
	const [actualPage, setActualPage] 	= useState(1);
	const [page, setPage] 				= useState(1);
	const [movies, setMovies] 			= useState([]);
	const [langs, setLangs] 			= useState([]);
	const [lang, setLang] 				= useState([]);

	useEffect(() => {

		movieDB
			.getTopRated(page)
			.then(res => {
				
				const tmpLangs 	= [...langs];

				res?.results?.map((item) => {

					if( !tmpLangs?.includes(item?.original_language) ) {
						tmpLangs?.push(item?.original_language);
					}

				});

				setLangs(tmpLangs);
				setPages(res?.total_pages);
				setActualPage(res?.page);
				setMovies(res?.results);

			})
			.catch(error => {
				console.log('ERR', error)
			});

	}, [page]);

	const _renderFilters = () => {

		return langs?.map((item, idx) => {
			const checked = lang?.includes(item);

			return 	<FormControlLabel
						key={idx}
						label={item}
						defaultChecked={checked}
						control={ 	<Checkbox
										key={idx}
										value={item}
										onChange={_handleLang}
									/>
								}
					/>
		});

	};

	const _renderMovies = () => {

		if( movies?.length <= 0 ) {
			return  [1,2,3,4,5,6,7,8,9,10,11,12].map((item, idx) => (
				<MovieItemSkeleton key={idx} />
			));
		}
		else {
			if(lang?.length > 0) {
				const tmpMovies = movies?.filter(item => {
					return lang?.includes(item?.original_language);
				});

				return tmpMovies.map((item, idx) => (
					<MovieItem key={idx} item={item}/>
				));
			}
			else {
				return movies.map((item, idx) => (
					<MovieItem key={idx} item={item}/>
				));
			}
		}

	};

	const _handleLang = e => {

		const tmp = [...lang];

		if(e?.target?.checked) {
			tmp.push(e?.target?.value);
		}
		else {
			tmp.splice(tmp.indexOf(e?.target?.value), 1);
		}

		setLang(tmp);

	};

	return (
		<Container maxWidth='xl'>
			<Box className={'filterContainer'}>
				<Typography variant='subtitle' >
					Select a language to filter movies:
				</Typography>

				<FormGroup className={'filterWrapper'}>
					{ _renderFilters() }
				</FormGroup>
			</Box>
			
			<Grid container spacing={1}>
				{ _renderMovies() }
			</Grid>

			<Box className={'footerContainer'} >
				<Pagination
					count={Math.ceil(pages / 5)}
					page={page}
					color='primary'
					showFirstButton
					showLastButton
					onChange={(e, v) => setPage(v)}
				/>
			</Box>
		</Container>
	);

}

export default App;