import { Table } from 'react-bootstrap'

import { useData } from '../hooks/use-data'

const ShowOrder = () => {
  const { data } = useData()

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mb-5">SHOW ORDERS</h2>

        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>from City</th>
              <th>to City</th>
              <th>Passengers</th>
              <th>Phone</th>
            </tr>
          </thead>
          {data.map((elem) => (
            <tbody key={elem.id}>
              <tr>
                <td>{elem.id.slice(0, 5)}</td>
                <td>{elem.cityFirst}</td>
                <td>{elem.citySecond}</td>
                <td>{elem.countPerson}</td>
                <td>{elem.phone}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default ShowOrder
