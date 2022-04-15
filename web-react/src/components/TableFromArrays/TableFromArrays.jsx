import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import PlaceholderCustom from '../Placeholder'
import './TableFromArrays.css'

const TableFromArrays = ({ tableArray, loading }) => {
  const { theme } = useContext(MemberContext)

  return (
    <Table variant={theme} striped bordered>
      <tbody>
        {tableArray?.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <PlaceholderCustom
                key={j}
                as="td"
                xs={12}
                loading={loading && j % 2 === 0}
                className="td-placeholder"
              >
                <td>{col}</td>
              </PlaceholderCustom>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableFromArrays
