import { Form, Button, Modal } from "react-bootstrap"
import React, { useEffect, useState } from "react"

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
}

function FormPay({ show, handleClose, total }) {
  const [state, setState] = useState(INITIAL_STATE)

  const init = () => {
    console.log("init")
    const mp = new MercadoPago("TEST-74bd3be0-f71e-4f53-bd78-018dfdfa6662", {
      locale: "es-PE",
    })
    const cardForm = mp.cardForm({
      amount: total.toString(),
      autoMount: true,
      form: {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular de la tarjeta",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número de la tarjeta",
        },
        cardExpirationDate: {
          id: "form-checkout__cardExpirationDate",
          placeholder: "Data de vencimiento (MM/YYYY)",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de seguridad",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Cuotas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número de documento",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emisor",
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) return console.warn("Form Mounted handling error: ", error)
          console.log("Form mounted")
        },
        onSubmit: (event) => {
          event.preventDefault()
          console.log("hola llego")

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount: total,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData()
          fetch("http://localhost:3001/api/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(total),
              installments: Number(installments),
              description: "Descripción del producto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          })
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource)
        },
      },
    })
  }

  useEffect(init, [])
  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    })
  }

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name })
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <Form className="mt-4" id="form-checkout">
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              id="form-checkout__cardNumber"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              //***** */
              value="5031 7557 3453 0604"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Expiration Date</Form.Label>
            <Form.Control
              type="text"
              name="expiry"
              placeholder="10/10"
              id="form-checkout__cardExpirationDate"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              //***** */
              value="11/25"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Security Code(CVC)</Form.Label>
            <Form.Control
              type="text"
              name="cvc"
              id="form-checkout__securityCode"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              //***** */
              value="123"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="cardholderName"
              id="form-checkout__cardholderName"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              //***** */
              value="Jhon Doe"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="cardholderEmail"
              id="form-checkout__cardholderEmail"
              onFocus={handleInputFocus}
              //***** */
              value="jhon@doe.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Identification Type</Form.Label>
            <Form.Select name="identificationType" id="form-checkout__identificationType"></Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Identification Number</Form.Label>
            <Form.Control
              type="text"
              name="identificationNumber"
              id="form-checkout__identificationNumber"
              //***** */
              value="12345678900"
            />
          </Form.Group>

          <Form.Select name="issuer" id="form-checkout__issuer" style={{ display: "none" }}></Form.Select>

          <Form.Group className="mb-3">
            <Form.Label>Installments</Form.Label>
            <Form.Select name="installments" id="form-checkout__installments" />
          </Form.Group>

          <Button type="submit" id="form-checkout__submit">
            Pagar
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default FormPay
