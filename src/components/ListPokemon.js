import React, { Component } from 'react';
import { Card, Container, Row, Col, Image, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

class ListPokemon extends Component{
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
    this.GetListPokemon = this.GetListPokemon.bind(this);
    this.GetDetailPokemon = this.GetDetailPokemon.bind(this);
  }
  
  componentDidMount() {
    document.getElementById('next').disabled = true;
    document.getElementById('prev').disabled = true;
    this.GetListPokemon();
  }

  async GetListPokemon() {
    let listPokemon = [];
    let urlList = `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.pageOffset}&limit=${this.state.pageLimit}`;
    console.log("urlList:", urlList);
    await fetch(urlList)
      .then(response => response.json())
      .then(async(res) => {
        listPokemon = res.results;
        if (res.next === null) {
          document.getElementById('next').disabled = true;
        } else {
          document.getElementById('next').disabled = false;
          let urlNext = res.next;
          let pageOffsetNext = urlNext.split('?offset=')[1].split('&')
          let pageLimitNext = urlNext.split('&limit=')
          this.state.pageOffsetNext = pageOffsetNext[0];
          this.state.pageLimitNext = pageLimitNext[1];
        }

        if (res.previous === null) {
          document.getElementById('prev').disabled = true;
        } else {
          console.log("masuk non null prev")
          document.getElementById('prev').disabled = false;
          let urlPrev = res.previous;
          let pageOffsetPrev = urlPrev.split('?offset=')[1].split('&')
          let pageLimitPrev = urlPrev.split('&limit=')
          this.setState({
            pageOffsetPrev: pageOffsetPrev[0],
            pageLimitPrev: pageLimitPrev[1],
          })
        }
        this.setState({ listPokemon: listPokemon })
        console.log("data baru:", this.state);
      });
    this.GetDetailPokemon(listPokemon);
  }

  async GetDetailPokemon(listPokemon) {
    let i = 0;
    let detailPokemon = [];
    let listPokemonShow = [];
    while (i < listPokemon.length) {
      await fetch(listPokemon[i].url)
        .then(response => response.json())
        .then((res) => {
          let pokeName = res.name;
          let pokeImg = res.sprites.other['official-artwork'].front_default;
          let data = { name: pokeName, image: pokeImg, index: i }
          detailPokemon = detailPokemon.concat(res);
          listPokemonShow = listPokemonShow.concat(data);
        });
      i++
    }
    this.setState({ detailPokemon: detailPokemon });
    this.setState({ listPokemonShow: listPokemonShow });
    this.AddListPokemon();
  }

  AddListPokemon() {
    let str = [];
    let i = 0;
    while (i < this.state.listPokemonShow.length) {
      str.push(
        <ListGroup.Item className='align-items-center'>
          <Row className='align-items-center'>
            <Col><Image src={`${this.state.listPokemonShow[i].image}`} alt={`${this.state.listPokemonShow[i].name} Image`} className="pokeImage" onClick={this.ShowDetailPokemon} index={i} /></Col>
            <Col>{`${this.state.listPokemonShow[i].name}`}</Col>
          </Row>
        </ListGroup.Item>
      )
      i++;
    }
    return str;
  }

  ShowListPokemon(){
    return (
      <div className='showListPokemon'>
        <Card>
          <Card.Header className='text-center'>List Pokemon</Card.Header>
          <ListGroup>
            {this.AddListPokemon()}
          </ListGroup>
        </Card>
      </div>
    )
  }

  ShowDetailPokemon = (event) => {
    console.log("Ini event:", event.currentTarget.getAttribute('index'));
    const index = event.currentTarget.getAttribute('index');
    // this.setState({ dataChoosed: this.state.detailPokemon[index] });
    this.state.dataChoosed = this.state.detailPokemon[index];
    console.log("Data Choosen:", this.state.dataChoosed);
    console.log("Uhuk:", this.state)
    this.props.update(this.state)
    document.getElementById('moveToDetail').click()
  }

  NewPage = (event) => {
    const move = event.currentTarget.getAttribute('value');
    console.log("Ini Move:", move);
    if (move === 'next') {
      this.state.pageOffset = this.state.pageOffsetNext;
      this.state.pageLimit = this.state.pageLimitNext;
    } else {
      this.state.pageOffset = this.state.pageOffsetPrev;
      this.state.pageLimit = this.state.pageLimitPrev;
    }
    this.GetListPokemon();
  }

  ChooseRow = (event) => {
    const rows = event.currentTarget.getAttribute('value');
    let pageOffsetNext = parseInt(this.state.pageOffsetNext)
    let pageLimitNext = parseInt(rows)
    let countOffsetPrev = parseInt(this.state.pageOffsetPrev) - parseInt(rows)
    let pageOffsetPrev = 0
    if (countOffsetPrev < 0) {
      pageOffsetPrev = countOffsetPrev
    }
    let pageLimitPrev = parseInt(rows)
    this.state.pageOffsetNext = pageOffsetNext;
    this.state.pageLimitNext = pageLimitNext;
    this.state.pageOffsetPrev = pageOffsetPrev.toString();
    this.state.pageLimitPrev = pageLimitPrev.toString();
    console.log("Choose Row:", this.state);
  }

  render() {
    console.log("Props Data List Pokemon:", this.props.data);
    return (
      <div className="secondBG">
        <NavigationBar />
        <Container>
          <br />
          <h1 className="text-white">ALL LIST POKEMON</h1>
          <br />
          <div>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary" onClick={this.ChooseRow} value='20'>20</Button>
              <Button variant="secondary" onClick={this.ChooseRow} value='25'>25</Button>
              <Button variant="secondary" onClick={this.ChooseRow} value='50'>50</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <Button variant="light" id='prev' onClick={this.NewPage} value='prev'>Prev</Button>
              <Button variant="light" id='next' onClick={this.NewPage} value='next'>Next</Button>
            </ButtonGroup>
          </div>
          {this.ShowListPokemon()}
          <br />
          <Link hidden id='moveToDetail' className='align-item-center' to={{
              pathname: "/detail-pokemon",
              data: this.state.dataChoosed
            }}>Move To Detail</Link>
        </Container>
    </div>
    );
  }
}

export default ListPokemon;
// export default withRouter(ListPokemon);
