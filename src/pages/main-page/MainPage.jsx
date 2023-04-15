import { useAuth } from '../../components/hooks/use-auth'

const MainPage = () => {
  const { isEmail } = useAuth()
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">welcome {isEmail}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage
