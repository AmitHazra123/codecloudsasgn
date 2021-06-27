import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';
import ManageAttribute from './components/template/ManageAttribute';
import AttributesPage from './components/template/AttributesPage';

import initialState from './reducers/initialState';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const store = configureStore(initialState);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function openSnackBar(msg){
    if(message === "Invalid user") {
      window.location.reload();
    } else {
      setOpen(true);
      setMessage(msg);
    }
  }
  
  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route exact path="/" render={(props) => <AttributesPage openSnackBar={openSnackBar} {...props} />} />
          <Route exact path="/manageAttribute" render={(props) => <ManageAttribute openSnackBar={openSnackBar} {...props} />} />
          <Route exact path="/manageAttribute/:id" render={(props) => <ManageAttribute openSnackBar={openSnackBar} {...props} />} />
        </Router>
      </Provider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
