// Componente Menu
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Sistema de Ventas
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="menu-principal" />

                <Navbar.Collapse id="menu-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/clientes">
                            Clientes
                        </Nav.Link>

                        <Nav.Link as={Link} to="/productos">
                            Productos
                        </Nav.Link>

                        <Nav.Link as={Link} to="/ventas">
                            Ventas
                        </Nav.Link>

                        <Nav.Link as={Link} to="/detalle-venta">
                            Detalle de Ventas
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;