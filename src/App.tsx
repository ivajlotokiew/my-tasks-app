import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NoPage from './components/pages/NoPage';
import CompletedTasks from './components/pages/CompletedTasks';
import ImportantTasks from './components/pages/ImportantTasks';
import UncompletedTasks from './components/pages/UncompletedTasks';
import TodayTasks from './components/pages/TodayTasks';
import AllTasks from './components/pages/AllTasks';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get(`/api/directories/${1}/tasks`)
      .then(({ data }) => console.log("Data: ", data))
      .catch((e) => {
        console.error(e);
      });
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllTasks />} />
        <Route path="today" element={<TodayTasks />} />
        <Route path="important" element={<ImportantTasks />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="uncompleted" element={<UncompletedTasks />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
