import { Form, Button } from "react-bootstrap"
import { useState } from "react"

const RegisterProduct = () => {
  const [data, setData] = useState({ name: "", description: "", image: "", price: "" })
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", body: JSON.stringify(data) },
    })
      .then((result) => result.json())
      .then((data) => console.log(data))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default RegisterProduct
