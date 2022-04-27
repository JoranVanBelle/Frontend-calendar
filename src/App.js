import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEventForm from "./pages/AddEventForm";
import EditEventForm from "./pages/EditEventForm";
import AddReminderForm from "./pages/AddReminderForm";
import EditReminderForm from "./pages/EditReminderForm";
import NotFound from "./pages/NotFound";
import { EventProvider } from "./contexts/EventProvider";
import { MaandProvider } from "./contexts/MaandProvider";
import { ReminderProviver } from "./contexts/ReminderProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <ReminderProviver>
          <MaandProvider>
            <Switch>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/events/add" >
                <AddEventForm />
              </PrivateRoute>
              <PrivateRoute exact path="/events/edit/:id" >
                <EditEventForm />
              </PrivateRoute>
              <PrivateRoute exact path="/reminders/add" >
                <AddReminderForm />
              </PrivateRoute>
              <PrivateRoute exact path="/reminders/edit/:id" >
                <EditReminderForm />
              </PrivateRoute>
              <Route exact path='/login'>
                <Login/>
              </Route>
              <Route exact path='/register'>
                <Register/>
              </Route>
              <Route path="*" >
                <NotFound/>
              </Route>
            </Switch>
          </MaandProvider>
        </ReminderProviver>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
