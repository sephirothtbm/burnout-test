import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'd023cfe53943d6e26b3d31eb89dad6e6';
const PERPAGE = 5;




const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use(config => {
	config.params = {
		api_key: API_KEY,
		language: 'en-US',
		...config.params,
	};

	return config;
});





/**
 * Get top rated movies
 */
export const getTopRated = async (page) => {

	if(typeof getTopRated.iteration == 'undefined') {
		getTopRated.iteration = 1;
	}
	else {
		getTopRated.iteration++;
	}

	let realPage = ((page - 1) * 5) + getTopRated.iteration;

	try {
		const req = await api.get(`/top_rated`, {params: {page: realPage}});
		const rep = await req.data;
		const res = rep;

		if(getTopRated.iteration < PERPAGE) {
			const tmp = await getTopRated(page);
			
			res.page = tmp?.page;

			Array.prototype.push.apply(res?.results, tmp?.results);

			return res;
		}
		else {
			getTopRated.iteration = undefined;
			return res;
		}
	}
	catch (error) {
		// const err = helper.manageError(error);
		return { error };
		// console.log(error);
	}

};