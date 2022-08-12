import React, { Component } from 'react';
import { Card, Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

class ListPokemon extends Component{
  constructor() {
    super();

    this.state = {
      pagingListFirst: 0,
      pagingListLimit: 20,
      listPokemon: [],
      listPokemonShow: [],
      detailPokemon: [],
      dataChoosed: {}
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.checkAccount = this.checkAccount.bind(this);

  }
  
  componentDidMount() {
    this.getListPokemon();
  }

  async getListPokemon() {
    let listPokemon = [];
    let urlList = `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.pagingListFirst}&limit=${this.state.pagingListLimit}`;
    console.log("urlList:", urlList);
    await fetch(urlList)
      .then(response => response.json())
      .then(async(res) => {
        listPokemon = res.results;
        this.setState({ listPokemon: listPokemon })
      });
      // console.log("Data List Pokemon:", listPokemon)
    this.getDetailPokemon(listPokemon);
  }

  async getDetailPokemon(listPokemon) {
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
    // console.log("Data Detail Pokemon", detailPokemon);
    this.setState({ detailPokemon: detailPokemon });
    this.setState({ listPokemonShow: listPokemonShow });
    this.addListPokemon();
  }

  addListPokemon() {
    let str = [];
    let i = 0;
    while (i < this.state.listPokemonShow.length) {
      str.push(
        <ListGroup.Item className='align-items-center'>
          <Row className='align-items-center'>
            <Col><Image src={`${this.state.listPokemonShow[i].image}`} alt={`${this.state.listPokemonShow[i].name} Image`} className="pokeImage" /></Col>
            <Col>{`${this.state.listPokemonShow[i].name}`}</Col>
            <Col><Button variant='info' className='align-item-center' onClick={this.showDetailPokemon} index={i}>Check Detail Pokemon</Button></Col>
            {/* <Col><Button variant='info' className='align-item-center' index={i} onClick={(event) => {
              console.log("Ini event:", event.currentTarget.getAttribute('index'));
              const index = event.currentTarget.getAttribute('index');
              this.state.dataChoosed = {
                data: this.state.detailPokemon[index],
              }
              console.log("Data Choosen:", this.state.dataChoosed);
              let navigate = useNavigate();
              navigate(
                '/detail-pokemon', {
                replace: true,
                state: {
                  data: this.state.dataChoosed
                }
              });
            } }>Check Detail Pokemon</Button></Col> */}
          </Row>
        </ListGroup.Item>
      )
      i++;
    }
    return str;
  }

  showListPokemon(){
    return (
      <div className='showListPokemon'>
        <Card>
          <Card.Header className='text-center'>List Pokemon</Card.Header>
          <ListGroup>
            {this.addListPokemon()}
          </ListGroup>
        </Card>
      </div>
    )
  }

  // addListPokemon() {
  //   let str = [];
  //   let i = 0;
  //   while (i < this.state.listPokemonShow.length) {
  //     // let desc = `${this.state.listPokemonShow[i].kode} - ${this.state.detailPokemon[i].desc}`
  //     str.push(<tr key={i} ref={(c) => this.index = c}>
  //       <td><Image src={`${this.state.listPokemonShow[i].image}`} alt={`${this.state.listPokemonShow[i].name} Image`} className="pokeImage"/></td>
  //       <td>{`${this.state.listPokemonShow[i].name}`}</td>
  //       <td><Button variant='info' className='align-item-center' onClick={() => this.showDetailPokemon(this.index.key)}>Check Detail Pokemon</Button></td>
  //     </tr>
  //       //  <option value={this.state.listPokemonShow[i].kode}>{`${this.state.listPokemonShow[i].kode} - ${this.state.listPokemonShow[i].desc}`}</option>
  //     )
  //     i++;
  //   }
  //   return str;
  // }

  // showListPokemon(){
  //   return (
  //     <div className='table-responsive'>
  //       <Table striped bordered hover>
  //         <thead>
  //           <tr>
  //             <th>Image</th>
  //             <th>Pokemon Name</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {this.addListPokemon()}
  //         </tbody>
  //       </Table>
  //     </div>
  //   )
  // }

  showDetailPokemon = (event) => {
    console.log("Ini event:", event.currentTarget.getAttribute('index'));
    const index = event.currentTarget.getAttribute('index');
    this.state.dataChoosed = {
      data: this.state.detailPokemon[index],
    }
    console.log("Data Choosen:", this.state.dataChoosed);
    // this.MovePage(event);
    let navigate = useNavigate();
    navigate(
      '/detail-pokemon', {
      replace: true,
      state: {
        data: this.state.dataChoosed
      }
    });
    // document.getElementById('moveToDetail').click()
    // this.props.history.push({
    //   pathname: "/detail-pokemon",
    //   data: this.state.dataChoosed,
    // });
  }

  MovePage = (event) => {
    event.preventDefault();
    const navigate = useNavigate();
    navigate(
      '/detail-pokemon', {
        state: {
          data: this.state.dataChoosed
        }
    });
  }

  render() {
    // const { name, nik, norek, currency, nsb, branch, cif, typeacc, idtype, product, saldo, telp, email } = (this.props.location && this.props.location.data) || {};

    // this.state.tempdata = {
    //   telp: telp,
    //   email: email,
    //   name: name
    // }

    // this.state.rek_sumberdana = {
    //   noRekSumdana: norek,
    //   accTypeSumdana: typeacc,
    //   cifSumdana: cif,
    //   namaSumdana: nsb,
    //   idSumdana: nik,
    //   idTypeSumdana: idtype,
    //   ccyDebit: currency,
    //   saldo: parseFloat(saldo / 100),
    //   name: name
    // }
    // console.log("Data Sumdana Awal =", this.state.rek_sumberdana);

    return (
      <div className="secondBG">
      <Container>
        <br />
        <h1 className="text-white">ALL LIST POKEMON</h1>
        <br />
        {/* <Row> */}
          {this.showListPokemon()}
          <Button id="moveToDetail" onClick={this.movePage}>Move Detail</Button>
          {/* <Col md={4} className="movieWrapper">
            <Card className="movieImage">
              <Image src={jokerImage} alt="Dune Movies" className="images" />
              <div className="bg-dark">
                <div className="p-2 m-1 text-white">
                  <Card.Title className="text-center">JOKER</Card.Title>
                  <Card.Text className="text-left">
                    This is a wider card with natural lead-in to additional
                    content
                  </Card.Text>
                  <Card.Text className="text-left">
                    Last updated 3 mins ago
                  </Card.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={4} className="movieWrapper">
            <Card className="movieImage">
              <Image
                src={lightyearImage}
                alt="Dune Movies"
                className="images"
              />
              <div className="bg-dark">
                <div className="p-2 m-1 text-white">
                  <Card.Title className="text-center">LIGHT YEAR</Card.Title>
                  <Card.Text className="text-left">
                    This is a wider card with natural lead-in to additional
                    content
                  </Card.Text>
                  <Card.Text className="text-left">
                    Last updated 3 mins ago
                  </Card.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={4} className="movieWrapper">
            <Card className="movieImage">
              <Image src={morbiusImage} alt="Dune Movies" className="images" />
              <div className="bg-dark">
                <div className="p-2 m-1 text-white">
                  <Card.Title className="text-center">MORBIUS</Card.Title>
                  <Card.Text className="text-left">
                    This is a wider card with natural lead-in to additional
                    content
                  </Card.Text>
                  <Card.Text className="text-left">
                    Last updated 3 mins ago
                  </Card.Text>
                </div>
              </div>
            </Card>
          </Col> */}
        {/* </Row> */}
      </Container>
    </div>
      
      // <div className="wrap">
      //   <div className="App-header">
      //     <Row>
      //       <Col xs={2} className="back-btn">
      //         <span onClick={() => { window.location = "index.html#tellermenu/"; }}>&#129120;</span>
      //       </Col>
      //       <Col xs={8} className="title-header">
      //         <span>{sessionStorage.getItem("namamenu")} dari Bank Mega</span>
      //       </Col>
      //     </Row>
      //   </div>
      //   <div className="banner-plc">
      //     <Carousel>
      //       <Carousel.Item>
      //         <img src={banner} className="d-block w-100" />
      //       </Carousel.Item>
      //       <Carousel.Item>
      //         <img src={banner2} className="d-block w-100" />
      //       </Carousel.Item>
      //       <Carousel.Item>
      //         <img src={banner3} className="d-block w-100" />
      //       </Carousel.Item>
      //     </Carousel>
      //   </div>
      //   <div className="form-plc">
      //     <h4>Silahkan isi data transaksi Anda</h4>
      //   </div>
        
      //   <div className="form-data">
      //     <Form>
      //       {this.renderSumberdana()}
      //       {this.warkatField()}
      //       <Row>
      //         <Col xs={12}>
      //           <Form.Label htmlFor="rekTujuan">Rekening Tujuan</Form.Label>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={10} xs={9}>
      //           <Form.Group>
      //             <Form.Control type="number" id="rekTujuan" name="rekTujuan" className="isDeal" ref={(c) => this.rekTujuan = c} />
      //           </Form.Group>
      //         </Col>
      //         <Col md={2} xs={3}>
      //           <img src={loading} style={{ "margin-top": "auto" }} id="loading-tujuan" height="50px" width="50px" />
      //           <Button id="btn-tujuan" className="Light" onClick={(e) => this.inqAccTujuan(this.rekTujuan.value, e)}>Check</Button>
      //         </Col>
      //       </Row>
      //       <Form.Label htmlFor="nama_rekTujuan">Nama</Form.Label>
      //       <Form.Group>
      //         <Form.Control id="nama_rekTujuan" disabled />
      //       </Form.Group>
            
      //       <Form.Label htmlFor="amtCredit">Nominal Transaksi</Form.Label>
      //       <Row>
      //         <Col md={2} xs={2}>
      //           <Form.Control as="select" id="ccy" onChange={(e) => this.valas(e.target.value)} disabled>
      //             <option value="">-Choose List-</option>
      //             {this.showCurrency()}
      //           </Form.Control>
      //         </Col>
      //         <Col md={10} xs={10}>
      //           <NumberFormat
      //             id="amtCredit"
      //             class="amount isDeal"
      //             name="amtCredit"
      //             placeholder="Masukkan nominal transaksi Anda"
      //             thousandSeparator={','}
      //             decimalSeparator={'.'}
      //             // value = {this.state.nominalCredit}
      //             onChange={(e) => this.calcAmount(this.amtCredit.value, e)}
      //             onValueChange={(values) => {
      //               const { formattedValue, value } = values;
      //               this.calcAmount(value);
      //             }}
      //             ref={(c) => this.amtCredit = c}
      //           />
      //         </Col>
      //       </Row>
      //       <div id="valas">
      //         <Row>
      //           <Col md={8} xs={7}>
      //             <Form.Label>Apakah anda memiliki Deal Number?</Form.Label>
      //           </Col>
      //           <Col md={2} xs={2}>
      //             <input type="checkbox" name="iya" id="isDeal_iya" class="isDeal" onChange={(e) => this.isDealNum(this.isDealIya.name, e)} className="mr-1 ml-1" ref={(c) => this.isDealIya = c} />Iya
      //           </Col>
      //           <Col md={2} xs={3}>
      //             <input type="checkbox" name="tidak" id="isDeal_tidak" class="isDeal" onChange={(e) => this.isDealNum(this.isDealTidak.name, e)} className="ml-2 mr-2" ref={(c) => this.isDealTidak = c} />Tidak
      //           </Col>
      //         </Row>
      //         <Row>
      //           <Col xs={12}>
      //             <Form.Label htmlFor="dealNum">Deal Number</Form.Label>
      //           </Col>
      //         </Row>
      //         <Row>
      //           <Col md={10} xs={9}>
      //             <Form.Group>
      //               <Form.Control id="dealNum" name="dealNum" class="isDeal" ref={(c) => this.dealNum = c} />
      //             </Form.Group>
      //           </Col>
      //           <Col md={2} xs={3}>
      //             <img src={loading} style={{ "margin-top": "auto" }} id="loading-deal" height="50px" width="50px" />
      //             <Button id="btn-deal" className="Light" onClick={(e) => this.getDealNum(this.dealNum.value, e)}>Check</Button>
      //           </Col>
      //         </Row>
      //         <Row>
      //           <Col xs={12}>
      //             <Form.Label htmlFor="rateCredit">Exchange Rate</Form.Label>
      //           </Col>
      //         </Row>
      //         <NumberFormat
      //           id="rateCredit"
      //           class="amount"
      //           name="rateCredit"
      //           thousandSeparator={','}
      //           decimalSeparator={'.'}
      //           value={this.state.nominalRate}
      //           disabled
      //         />
      //       </div>
            
      //       <Row>
      //         <Col xs={12}>
      //           <Form.Label htmlFor="amtDebit">Jumlah Nominal yang dikirim</Form.Label>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={12} xs={12}>
      //           <NumberFormat
      //             id="amtDebit"
      //             class="amount"
      //             name="amtDebit"
      //             placeholder="Nominal Transaksi Akhir"
      //             thousandSeparator={','}
      //             decimalSeparator={'.'}
      //             value = {this.state.nominalDebit}
      //             disabled
      //           />
      //         </Col>
      //       </Row>
      //       <Form.Group>
      //         <Form.Label htmlFor="pesan">Pesan (Optional)</Form.Label>
      //         <Form.Control id="pesan" name="pesan" />
      //       </Form.Group>
      //       <Row>
      //         <Col md={3} xs={0}></Col>
      //         <Col md={3} xs={6}>
      //           <Button id="btn-btl" onClick={() => { window.location = "index.html#tellermenu/"; }}>Batal</Button>
      //         </Col>
      //         <Col md={3} xs={6}>
      //           <Button id="btn-ljt" onClick={this.onClickNext}>Lanjut</Button>
      //         </Col>
      //         <Col md={3} xs={0}></Col>
      //       </Row>
      //     </Form>
      //   </div>
      // </div>
    );
  }
}

export default ListPokemon;
// export default withRouter(ListPokemon);
