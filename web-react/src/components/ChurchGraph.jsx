import React from 'react'
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
} from 'recharts'
import { capitalise } from '../global-utils'

const ChurchGraph = ({ churchData, stat, serviceData }) => {
  return (
    <>
      <div className="row mt-4">
        <div className="col">
          <h6 className="text-center">{`${churchData[0].name} ${
            churchData[0].__typename
          } ${capitalise(stat)} Chart`}</h6>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={serviceData}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#690c13" stopOpacity="0.4" />
                  <stop offset="75%" stopColor="#690c13" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <Bar dataKey={`${stat}`} barSize={30} fill="#690c13">
                <LabelList dataKey={`${stat}`} position="top" fill="#FFF" />
              </Bar>
              <XAxis
                dataKey="date"
                tickLine={false}
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString('en-gb', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default ChurchGraph
