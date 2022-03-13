import { Button } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import FormPay from "./FormPay"

function Cart() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const products = useSelector((state) => state.cart)

  const total = products.reduce((sum, p) => sum + p.price, 0)
  /*
  async function pay() {
    products.map((p) => console.log(`hola que hace ${p._id}`))
    console.log(`hola que hace ${products}`)

    const response = await fetch(`http://localhost:3001/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products.map((p) => p._id)),
    })

    const data = response.json()
    alert("Orden creada!")
  }*/
  async function pay() {
    setShow(true)
  }

  function deleteProduct(id) {
    dispatch({ type: "REMOVE_PRODUCT", payload: id })
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Carro de Compras</Card.Header>
      <ListGroup variant="flush">
        {products.map((product) => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between">
            {product.name}
            <span>${product.price}</span>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <div className="d-flex justify-content-between fw-bold">
            Total: <span>${total}</span>
          </div>
          {total > 0 ? (
            <div className="text-center mt-3">
              <Button variant="primary" onClick={pay}>
                Ir a Pagar
              </Button>
            </div>
          ) : null}
        </ListGroup.Item>
      </ListGroup>
      {show && <FormPay show={show} handleClose={handleClose} total={total} />}
    </Card>
  )
}

export default Cart
