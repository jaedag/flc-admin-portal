import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'

const TableFromArrays = (tableArray) => {
  const { theme } = useContext(MemberContext)
  return (
    <Table variant={theme} striped bordered>
      <tbody>
        {tableArray.map((row, i) => (
          <tr key={i}>
            {row.map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableFromArrays
