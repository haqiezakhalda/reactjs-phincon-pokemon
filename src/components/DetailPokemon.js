import React, { Component } from 'react';
import { Card, Container, Row, Col, Image, Button, ButtonGroup, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

class DetailPokemon extends Component{
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
  }

  componentDidMount() {
    document.getElementById('infoPokemon').style.display = "block";
    document.getElementById('savePokemon').style.display = "none";
  }

  ShowDataPokemon(data, object) {
    const commaSep = data.map(item => item[object].name).join(', ');
    return commaSep;
  }

  async CatchPokemon(data) {
    const urlCatchPokemon = `http://localhost:5000/api-pokemon/catch`;
    await fetch(urlCatchPokemon)
      .then(response => response.json())
      .then(async (res) => {
        console.log("API:", res)
        if (res.result === 1) {
          document.getElementById('infoPokemon').style.display = "none";
          document.getElementById('savePokemon').style.display = "block";
        } else {
          alert(`Fail to Catch ${data.name.toUpperCase()}, Try Again`);
        }
      });
  }

  SavePokemon(data, e) {
    console.log("Saat Save:", data, e)
    const move = e.currentTarget.getAttribute('value');
    const urlSavePokemon = `http://localhost:5000/api-pokemon/add`;
    const urlGetPokemon = `http://localhost:5000/api-pokemon`;
    console.log("Ini Move:", move);
    if (move === 'back') {
      document.getElementById('moveToList').click()
    } else {
      let namaPokemon = document.getElementById('namePokemon').value
      const bodyFind = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: {$regex : namaPokemon},
        })
      }
      fetch(urlGetPokemon, bodyFind)
        .then(response => response.json())
        .then(async (res) => {
          console.log("res.length:", res.length);
          if (res.length !== 0) {
            alert("Nama sudah pernah ada, coba cari nama lain")
            return false;
          }
          // namaPokemon = `${namaPokemon}-${res.length}`
          const bodyAdd = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: data.dataChoosed.id,
              originName: data.dataChoosed.name,
              name: namaPokemon,
              image: data.dataChoosed.sprites.other['official-artwork'].front_default,
              height: data.dataChoosed.height,
              weight: data.dataChoosed.weight
            })
          }
          fetch(urlSavePokemon, bodyAdd)
            .then(response => response.json())
            .then(async (res) => {
              alert(`Success Get ${data.dataChoosed.name.toUpperCase()}!!!`);
              document.getElementById('moveToList').click()
            });
        });
    }
  }

  render() {
    const { data } = (this.props.data) || {};
    this.state = data;
    console.log("Uhuk")
    return (
      <div className="secondBG">
        <NavigationBar />
        <Container>
          <br />
          <Card className="cardPokemon">
            <Image src={data.dataChoosed.sprites.other['official-artwork'].front_default} alt={`${data.dataChoosed.name.toUpperCase()} Image`} className="images" />
            <div id='infoPokemon'>
              <div className="bg-dark">
                <div className="p-2 m-1 text-white">
                  <Card.Title className="text-center">POKEMON {data.dataChoosed.name.toUpperCase()}</Card.Title>
                  <Card.Text className="text-left">
                  <Row>
                    <Col sm={2}>Berat</Col>
                    <Col style={{ 'max-width': '3%' }}>:</Col>
                    <Col>{data.dataChoosed.weight}</Col>
                  </Row>
                  <Row>
                    <Col sm={2}>Tinggi</Col>
                    <Col style={{ 'max-width': '3%' }}>:</Col>
                    <Col>{data.dataChoosed.height}</Col>
                  </Row>
                  <Row>
                    <Col sm={2}>Jenis</Col>
                    <Col style={{ 'max-width': '3%' }}>:</Col>
                    <Col>{ this.ShowDataPokemon(data.dataChoosed.types, 'type') }</Col>  
                  </Row>
                  <Row>
                    <Col sm={2}>Gerakan</Col>
                    <Col style={{ 'max-width': '3%' }}>:</Col>
                    <Col>{ this.ShowDataPokemon(data.dataChoosed.moves, 'move') }</Col>
                    </Row>
                  </Card.Text>  
                </div>
              </div>
              <div>
                <br/>
                <Card.Text className="text-center">
                  <Button variant="primary" onClick={(e) => this.CatchPokemon(data.dataChoosed, e)}>Catch Pokemon</Button>        
                </Card.Text>
                <br/>
              </div>
            </div>
            <div id='savePokemon'>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>{data.dataChoosed.name.toUpperCase()} Successfully Captured!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>You can save and rename the pokemon you got. Do you want rename the pokemon?</p>
                  <Row>
                    <Col>
                      <Form.Label htmlFor="namePokemon">Pokemon's Name</Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control type="text" name="namePokemon" id="namePokemon" defaultValue={data.dataChoosed.name}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer style={{"margin-top": "20px"}}>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="warning" value={'back'} onClick={(e) => this.SavePokemon(data, e)}>Back</Button>
                    <Button variant="success" value={'save'} onClick={(e) => this.SavePokemon(data, e)}>Save</Button>
                  </ButtonGroup>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
            <Link hidden id='moveToList' className='align-item-center' to={{
              pathname: "/list-pokemon",
              data: this.state
            }}>Back</Link>
          </Card>
          <br />
        </Container>
    </div>
    );
  }
}

export default DetailPokemon;
