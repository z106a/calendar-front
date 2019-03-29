import './styles/index.scss';
import React, { useState, useEffect, lazy, Suspense, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import { getState } from './state';
import { getTimeByDate} from './api';
import Spinner from './components/Spinner';
import {Placeholder, PlaceHolerFluid} from './components/Placeholder';

const Schedule = lazy(() => import('./components/schedule2/DefaultPage'));
const PickHolder = lazy(() => import('./components/pick/DefaultPage'));
const Calendar = lazy(() => import('react-calendar'));
// const PickHolder = lazy(() => import('./components/pick/DefaultPage'));

export default function App() {
  // const [_, dispatch] = getState();
  const [date, setDate] = useState(new Date().toDateString());
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
 
  return (
    <Fragment>
      <Suspense fallback={<PlaceHolerFluid />}>
        <Calendar 
          onChange={(date) => {setDate(new Date(date).toDateString()); setIsFetching(true)}} 
          value={new Date(date)} 
          tileClassName="calendar__customtile"
        />
      </Suspense>
      
      {isError && <div>Something went wrong ...</div>}
      <Router>
        <Switch>
        <Route exact path="/" render={() => 
            <Fragment>
              {!isFetching ? 
                <Suspense fallback={ <Spinner size={100} /> }>
                  <PickHolder date={date} />
                </Suspense> : 
                <Placeholder />
              }
            </Fragment>       
          } />
          <Route path="/mm" render={() => 
            <Suspense fallback={ <Spinner size={100} /> }>
              <PickHolder date={date} />
             </Suspense>
          } />
          <Route path="/schedule" render={() => 
            <div id="schedule">
              <Suspense fallback={<Spinner size={100} />}>
                <Schedule date={date}/>
              </Suspense> :
            </div>
          } />
        </Switch>
      </Router>
    </Fragment>
  );
}










function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

function useDocumentTitle(title) {
  useEffect(() => {document.title = title});
}
function useWindowWidth() {
  const [width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => { // in case we need unsubscribed
      window.removeEventListener('resize', handleResize);
    }
  });
  return width;
}


