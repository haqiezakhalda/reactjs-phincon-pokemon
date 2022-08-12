import logo from '../assets/images/logo-pokemon.png'
import { Navbar, Container, Nav, Image } from "react-bootstrap"

const NavigationBar = () => {
  return (
    <div>
      <Navbar variant='dark'>
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} alt="Pokemon" className='logo'/>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/list-pokemon">List Pokemon</Nav.Link>
            {/* <Nav.Link href="/detail-pokemon">Detail Pokemon</Nav.Link> */}
            <Nav.Link href="/my-pokemon">My Pokemon</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
