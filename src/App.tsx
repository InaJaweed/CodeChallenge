import { useState } from 'react';
import AddMediaForm from './components/AddMediaForm';
import MediaList from './components/MediaList';
import './App.css';

const App = () => {
	const [refresh, setRefresh] = useState(false);
	return (
		<div className="container">
			<h2>TV & Movie Review App</h2>
			{/* When a new media item is added, the refresh state toggles, forcing MediaList to re-render */}
			<AddMediaForm onMediaAdded={() => setRefresh(!refresh)} />
			<div className="media-list-container">
				<MediaList refresh={refresh} />
			</div>
		</div>
	);
};

export default App;
