import React, { FC, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import Logo from 'assets/home-24-logo.svg'
import {
  selectProductList,
  setSearchText,
  selectSearch,
  splitCategoryList
} from 'features/home/homeSlice'
import { Category, ChildCategoryList, ProductList } from 'features/home/types'
import { NavDropdown, Container, Nav, Navbar, Form } from 'react-bootstrap'
import { generateUniqueId } from 'utils'
import './styles.css'

const NavbarComponent: FC = () => {
  const dispatch = useAppDispatch()
  const productList: ProductList = useAppSelector(selectProductList)
  const searchText: string = useAppSelector(selectSearch)

  const handleSearchText = (input: string): void => {
    dispatch(setSearchText(input))
  }

  const renderCategoryList = useCallback(
    (category: Category) => {
      const chunkCategoryList = splitCategoryList(category)

      return chunkCategoryList?.map(
        (categoryList: ChildCategoryList[], i: number) => {
          return (
            <div key={generateUniqueId()} className="m-2">
              {categoryList?.map((childCategory: ChildCategoryList) => (
                <NavDropdown.Item
                  key={generateUniqueId()}
                  href={`?category=${childCategory?.urlPath}`}
                >
                  {childCategory?.name}
                </NavDropdown.Item>
              ))}
            </div>
          )
        }
      )
    },
    [productList]
  )
  return (
    <Navbar
      data-testid="navbar"
      bg="light"
      expand="lg"
      className="navbar-wrapper fixed-top"
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={Logo} alt="home 24" className="w-50 pl-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 justify-content-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {productList?.data?.map((category: Category) => (
              <NavDropdown
                key={generateUniqueId()}
                title={category?.name}
                id="navbarScrollingDropdown"
              >
                <div className="d-flex m-3">{renderCategoryList(category)}</div>
              </NavDropdown>
            ))}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e: { target: { value: string } }) =>
                handleSearchText(e.target.value)
              }
              value={searchText}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
