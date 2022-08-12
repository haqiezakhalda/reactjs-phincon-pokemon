import React from 'react';
import "./App.css"
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import HomePage from "./components/Home"
import ListPokemon from "./components/ListPokemon"
import DetailPokemon from "./components/DetailPokemon"
import MyPokemon from "./components/MyPokemon"
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: {
				pageOffset: 0,
				pageOffsetPrev: 0,
				pageOffsetNext: 0,
				pageLimit: 20,
				pageLimitPrev: 0,
				pageLimitNext: 0,
				listPokemon: [],
				listPokemonShow: [],
				detailPokemon: [],
				dataChoosed: {},
				listMyPokemon: []
			}
		}
		this.updateData = this.updateData.bind(this);
		
	}

	async updateData(data) {
		this.setState({
			data
    })
  }

	render() {
		return (
			<div>
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<HomePage/>} />
						<Route path="/list-pokemon" element={<ListPokemon data={this.state} update={this.updateData} />} />
						<Route path="/my-pokemon" element={<MyPokemon data={this.state} update={this.updateData}/>} />
						<Route path="/detail-pokemon" element={<DetailPokemon data={this.state} />} />
					</Routes>
				</BrowserRouter>
			</div>
		)
	}
}
export default App;



