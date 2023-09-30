import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import JobsRoute from './components/JobsRoute'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)
export default App
