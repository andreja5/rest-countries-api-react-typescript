import React from "react";
import './AppRouter.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Countries from "./components/Countries/Countries";
import Header from "./components/Header/Header";
import NotFound from "./components/NotFound/NotFound";
import { useGetCountries } from "./hooks/useGetCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

export const AppRouter = (): JSX.Element => {
  const countryFields = ["name", "flag", "population", "region", "capital", "alpha3Code"];
  const countries = useGetCountries(countryFields);
  
  return (
    <div className='container'>
      <ToastContainer />
      <Header label={'Where in the world?'} />

      <Switch>
          <Route path='/country/:id' component={CountryInfo} />
          <Route path='/country' exact render={props => <Countries countries={countries} {...props} />} />
          <Route path='/not-found' component={NotFound} />
          <Redirect from='/' exact to='/country' />
          <Redirect from='/' to='/not-found' />
        </Switch>
    </div>
  )
};
