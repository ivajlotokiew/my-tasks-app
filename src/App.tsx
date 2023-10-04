import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NoPage from './components/pages/NoPage';
import CompletedTasks from './components/pages/CompletedTasks';
import ImportantTasks from './components/pages/ImportantTasks';
import UncompletedTasks from './components/pages/UncompletedTasks';
import TodayTasks from './components/pages/TodayTasks';
import AllTasks from './components/pages/AllTasks';
import DirectoryTasks from './components/pages/DirectoryTasks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllTasks />} />
        <Route path="today" element={<TodayTasks />} />
        <Route path="important" element={<ImportantTasks />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="uncompleted" element={<UncompletedTasks />} />
        <Route path="dir/:id/tasks" element={<DirectoryTasks />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
