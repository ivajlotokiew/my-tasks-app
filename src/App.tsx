import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Tasks from './components/Tasks';
import NoPage from './components/NoPage';
import CompletedTasks from './components/CompletedTasks';
import ImportantTasks from './components/ImportantTasks';
import UncompletedTasks from './components/UncompletedTasks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Tasks />} />
        <Route path="important" element={<ImportantTasks />} />
        <Route path="completed" element={<CompletedTasks />} />
        <Route path="uncompleted" element={<UncompletedTasks />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
