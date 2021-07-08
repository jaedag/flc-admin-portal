import React from 'react'
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
  Legend,
} from 'recharts'
import { capitalise } from '../../global-utils'
import './ChurchGraph.css'

const ChurchGraph = ({ stat1, stat2, churchData, secondaryTitle }) => {
  return (
    <>
      <div className="row mt-2">
        <div className="col">
          <p className="chart-title font-weight-bold m-0">{`${capitalise(
            stat1
          )} and ${capitalise(stat2)}`}</p>
          {secondaryTitle && (
            <p className="chart-title church-name">{`${secondaryTitle}`}</p>
          )}
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={churchData}>
              <defs>
                <linearGradient
                  id="colorPrimary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--chart-primary-color)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="80%"
                    stopColor="var(--chart-primary-color)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
                <linearGradient
                  id="colorSecondary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--chart-secondary-color)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="80%"
                    stopColor="var(--chart-secondary-color)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
              </defs>

              <Bar
                name={capitalise(stat1)}
                dataKey={`${stat1}`}
                barSize={30}
                fill="url(#colorPrimary)"
              >
                <LabelList
                  dataKey={`${stat1}`}
                  position="top"
                  fill="#FFF"
                  fontSize="12"
                />
              </Bar>
              <Bar
                name={capitalise(stat2)}
                dataKey={`${stat2}`}
                barSize={35}
                fill="url(#colorSecondary)"
              >
                <LabelList
                  dataKey={`${stat2}`}
                  position="top"
                  fill="#FFF"
                  fontSize="12"
                />
              </Bar>

              <XAxis
                dataKey="date"
                tickLine={false}
                fontSize="13"
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString('en-gb', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              {/* <YAxis scale="log" domain={['auto', 'auto']} label={false} /> */}
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default ChurchGraph
