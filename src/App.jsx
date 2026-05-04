import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import Navbar from './components/Navbar'

function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
    { path: '/add', element: <AddCreator /> },
  ])

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {routes}
      </main>
    </div>
  )
}

export default App
