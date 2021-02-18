import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Voltar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </ListGroup.Item>
              <ListGroup.Item>Preço: R${product.price}</ListGroup.Item>
              <ListGroup.Item>Descrição: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md='3'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>R${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {_.range(1, product.countInStock + 1).map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                      >
                        Adicionar no carrinho
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
