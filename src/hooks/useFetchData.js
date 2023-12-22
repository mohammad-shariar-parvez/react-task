import { useState, useEffect } from 'react';

const useFetchData = (initialUrl, search,) => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [nextPage, setNextPage] = useState(initialUrl);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(15);

	const fetchData = async () => {
		if (!hasMore) return;

		const url = new URL(nextPage);
		url.searchParams.set('page', page);
		url.searchParams.set('page_size', size);

		if (search) {
			url.searchParams.set('search', search);
		}

		setLoading(true);
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.results && data.results.length > 0) {
				if (page === 1) {
					setData(data.results);
				} else {
					setData((prevData) => [...prevData, ...data.results]);
				}
			}

			// setHasMore(data.next !== null);
			if (result.results.length === 0) {
				setHasMore(false);
			}
			setError('');
			setLoading(false);

		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [initialUrl, search, page]);

	return {
		data,
		loading,
		error,
		setPage,
		page
	};
};

export default useFetchData;
