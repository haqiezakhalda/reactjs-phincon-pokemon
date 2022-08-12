import React, { Component } from 'react';
import { Card, Container, Row, Col, Image, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import NavigationBar from "./NavigationBar";

class MyPokemonList extends Component{
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.GetListMyPokemon = this.GetListMyPokemon.bind(this);
  }
  
  async componentDidMount() {
    await this.GetListMyPokemon();
  }

  async GetListMyPokemon() {
    let listMyPokemon = [];
    let urlList = `http://localhost:5000/api-pokemon/`;
    console.log("urlList:", urlList);
    await fetch(urlList)
      .then(response => response.json())
      .then((res) => {
        console.log("GetListPokemon:", res);
        listMyPokemon = res;
        this.setState({ listMyPokemon: listMyPokemon })
      });
    this.AddListMyPokemon();
  }

  AddListMyPokemon() {
    let str = [];
    let i = 0;
    while (i < this.state.listMyPokemon.length) {
      str.push(
        <ListGroup.Item className='align-items-center'>
          <Row className='align-items-center'>
            <Col><Image src={`${this.state.listMyPokemon[i].image}`} alt={`${this.state.listMyPokemon[i].name} Image`} className="pokeImage"/></Col>
            <Col>{`${this.state.listMyPokemon[i].originName}`}</Col>
            <Col>{`${this.state.listMyPokemon[i].name}`}</Col>
            <Col>
            <ButtonGroup aria-label="Basic example">
              <Button variant="warning" onClick={this.ReleasePokemon} index={i}>Release</Button>
              <Button variant="primary" onClick={this.RenamePokemon} index={i}>Rename</Button>
            </ButtonGroup>
            </Col>
          </Row>
        </ListGroup.Item>
      )
      i++;
    }
    return str;
  }

  CheckPrimeNumber = (angka) => {
    let pembagi = 0;
    for(let i=1; i <= angka; i++){
      if(angka%i === 0){
        pembagi++
      }
    }
    if(pembagi === 2){
      return 'y'
    }else{
      return 'n'
    }
  }

  ReleasePokemon = (event) => {
    const index = event.currentTarget.getAttribute('index');
    const dataReleasePokemon = this.state.listMyPokemon[index];
    const urlReleasePokemon = `http://localhost:5000/api-pokemon/release`;
    const urlDeletePokemon = `http://localhost:5000/api-pokemon/${dataReleasePokemon._id}`;
    fetch(urlReleasePokemon)
      .then(response => response.json())
      .then(async (res) => {
        console.log("API:", res)
        const primeNumber = this.CheckPrimeNumber(res.result);
        console.log("Cek Bilangan Prima:", primeNumber);
        if (primeNumber === 'y') {
          fetch(urlDeletePokemon, {method: 'DELETE'})
            .then(response => response.json())
            .then(async (res) => {
              alert(`Success to Release ${dataReleasePokemon.name}`);    
            });
        } else {
          alert(`Fail to Release ${dataReleasePokemon.name}`);
        }
      });
  }

  RenamePokemon = (event) => {
    console.log("Rename Jalan:");
    const index = event.currentTarget.getAttribute('index');
    const dataRenamePokemon = this.state.listMyPokemon[index];
    let namaPokemon = dataRenamePokemon.name;
    const urlUpdatePokemon = `http://localhost:5000/api-pokemon/${dataRenamePokemon._id}`
    let namaPokemonSplit = dataRenamePokemon.name.split('-');
    let sequence = namaPokemonSplit[namaPokemonSplit.length-1]
    sequence = parseInt(sequence) + 1;
    if (isNaN(sequence)) {
      console.log("aku mau lihat NaN")
      namaPokemon = `${namaPokemon}-0`
    } else {
      console.log("Ini jalan")
      namaPokemonSplit.pop()
      console.log("Ini jalan2")
      namaPokemonSplit.join('-')
      console.log("Ini jalan3")
      namaPokemon = `${namaPokemonSplit}-${sequence}`
      console.log("Ini jalan4:", namaPokemon);
    }
    const bodyUpdate = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: namaPokemon
      })
    }
    fetch(urlUpdatePokemon, bodyUpdate)
      .then(response => response.json())
      .then(async (res) => {
        if (res.modifiedCount !== 0) {
          alert(`Rename Success`);
          this.GetListMyPokemon()
        }
      });
  }

  ShowListMyPokemon(){
    return (
      <div className='showListMyPokemon'>
        <Card>
          <Card.Header className='text-center'>List Pokemon</Card.Header>
          <ListGroup>
            {this.AddListMyPokemon()}
          </ListGroup>
        </Card>
      </div>
    )
  }

  render() {
    console.log("Props Data List My Pokemon:", this.state);
    return (
      <div className="secondBG">
        <NavigationBar />
        <Container>
          <br />
          <h1 className="text-white">ALL LIST MY POKEMON</h1>
          <br />
          {this.ShowListMyPokemon()}
          <br />
        </Container>
    </div>
    );
  }
}

export default MyPokemonList;
