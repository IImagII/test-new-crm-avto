import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { BsCameraVideo, BsFillPencilFill } from 'react-icons/bs'
import { TbExchange } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { removeUser } from '../../store/slice/userSlice'
import { ROUTES } from '../../utils/routes'
import { ADMIN } from '../../utils/variables'
import { useAuth } from '../hooks/use-auth'

import styles from './Header.module.scss'

const Header = () => {
  const { isEmail, id } = useAuth()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(removeUser())
    navigate(ROUTES.HOME)
  }

  return (
    <div>
      <Navbar bg="light" expand="false" className="mb-3 ">
        <Container fluid className="justify-content-between">
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand"
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                MENU CLIENT
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className={styles.category_wrap}>
                  <h3>Order management</h3>
                  <ul>
                    <Link className={styles.link} to={ROUTES.CREATE_ORDER}>
                      <BsFillPencilFill color="green" /> Create Order
                    </Link>
                    <Link className={styles.link} to={ROUTES.CHANGE_ORDER}>
                      <TbExchange color="green" />
                      {''} Change Order
                    </Link>
                    <Link className={styles.link} to={ROUTES.SHOW_ORDER}>
                      <BsCameraVideo color="green" /> {''}
                      Show Order
                    </Link>
                  </ul>
                  <h3>Profile</h3>
                  <ul>
                    <Link className={styles.link} to={ROUTES.PROFILE}>
                      My profile
                    </Link>
                    <Link
                      className={styles.link}
                      to={ROUTES.HOME}
                      onClick={handleClick}
                    >
                      Log out
                    </Link>
                  </ul>
                  {id === ADMIN ? (
                    <>
                      <h3>Admin Panel</h3>
                      <ul>
                        <Link
                          className={styles.link}
                          to={ROUTES.CLIENT_MANAGEMENT}
                        >
                          All Clients management
                        </Link>
                      </ul>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Brand as={Link} to={ROUTES.BODY}>
            CRM
          </Navbar.Brand>
          <div className="p-1">
            <div className="d-inline-block mb-1">
              <Navbar.Text>
                Signed in as:{' '}
                <span className="text-primary font-weight-bold text-decoration-underline">
                  {isEmail}
                </span>
              </Navbar.Text>
            </div>
            <div>
              <Button variant="secondary" onClick={handleClick}>
                LOG OUT
              </Button>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
