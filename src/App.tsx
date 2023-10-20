import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NoPage from './components/pages/NoPage';
import CompletedTasks from './components/pages/CompletedTasks';
import ImportantTasks from './components/pages/ImportantTasks';
import UncompletedTasks from './components/pages/UncompletedTasks';
import TodayTasks from './components/pages/TodayTasks';
import AllTasks from './components/pages/AllTasks';
import DirectoryTasks from './components/pages/DirectoryTasks';
import SearchResults from './components/pages/SearchResults';
import { LoginForm } from './components/pages/LoginForm';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={
          <PrivateRoute>
            <AllTasks />
          </PrivateRoute>
        } />
        <Route path="today" element={
          <PrivateRoute>
            <TodayTasks />
          </PrivateRoute>
        } />
        <Route path="important" element={
          <PrivateRoute>
            <ImportantTasks />
          </PrivateRoute>
        } />
        <Route path="completed" element={
          <PrivateRoute>
            <CompletedTasks />
          </PrivateRoute>
        } />
        <Route path="uncompleted" element={
          <PrivateRoute>
            <UncompletedTasks />
          </PrivateRoute>
        } />
        <Route path="dir/:id/tasks" element={
          <PrivateRoute>
            <DirectoryTasks />
          </PrivateRoute>
        } />
        <Route path="results" element={
          <PrivateRoute>
            <SearchResults />
          </PrivateRoute>
        } />
        <Route path="*" element={<NoPage />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
