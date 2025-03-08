import { useState } from 'react';
import AddMediaForm from './components/AddMediaForm';
import MediaList from './components/MediaList';

const App = () => {
	const [refresh, setRefresh] = useState(false);
	return (
		<div>
			<h2>TV & Movie Review App</h2>
			{/* When a new media item is added, the refresh state toggles, forcing MediaList to re-render */}
			<AddMediaForm onMediaAdded={() => setRefresh(!refresh)} />
			{/* The key prop changes when refresh state updates, causing MediaList to re-render */}
			<MediaList key={refresh.toString()} />
		</div>
	);
};

export default App;
