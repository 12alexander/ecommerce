import React, { useEffect, useState } from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Product from "../components/Product"
import Col from "react-bootstrap/Col"
import Cart from "../components/Cart"
//import RegisterProduct from "../components/RegisterProduct"
//import FormPay from "../components/FormPay"

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const result = await fetch(`http://localhost:3001/api/products`)
      const data = await result.json()
      setProducts(data)
    }
    loadProducts()
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col sm={8}>
            <Row>
              <p>Nuevo párrafo</p>
              {/*<RegisterProduct />*/}
              {/*<FormPay />*/}
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </Row>
          </Col>
          <Col sm={4}>
            <Cart />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
