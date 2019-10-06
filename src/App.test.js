import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchBox from "./components/searchBox";
import TableCustom from "./components/table";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders searchBox without error', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders table without error', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableCustom data={[]} page={0} options={[]} onChangePage={()=>console.log('change')} total={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
