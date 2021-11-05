import PlaceholderCustom from 'components/Placeholder'
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
const ChurchGraph = ({ loading, stat1, stat2, churchData, secondaryTitle }) => {
  return (
    <>
      <div className="row mt-2">
        <div className="col">
          <PlaceholderCustom loading={loading} element="p">
            <p className="chart-title font-weight-bold m-0">
              {stat2
                ? `${capitalise(stat1)} and ${capitalise(stat2)}`
                : `${capitalise(stat1)} Graph`}
            </p>
          </PlaceholderCustom>
          {secondaryTitle && (
            <PlaceholderCustom loading={loading} element="p">
              <p className="chart-title church-name">{`${secondaryTitle}`}</p>
            </PlaceholderCustom>
          )}
          {!loading && (
            <ResponsiveContainer width="100%" height={330}>
              <BarChart data={churchData} margin={{ top: 20 }}>
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
                  yAxisId="left"
                  fill="url(#colorPrimary)"
                >
                  <LabelList
                    dataKey={`${stat1}`}
                    position="top"
                    fill="#FFF"
                    fontSize="12"
                  />
                </Bar>
                {stat2 && (
                  <Bar
                    name={capitalise(stat2)}
                    dataKey={`${stat2}`}
                    barSize={35}
                    yAxisId="right"
                    fill="url(#colorSecondary)"
                  >
                    <LabelList
                      dataKey={`${stat2}`}
                      position="top"
                      fill="#FFF"
                      fontSize="12"
                    />
                  </Bar>
                )}

                <XAxis
                  dataKey="week"
                  tickLine={false}
                  fontSize="13"
                  tickFormatter={(week) => {
                    return 'Wk ' + week
                  }}
                />

                <Tooltip
                  wrapperStyle={{
                    background: 'rgba(24, 24, 24, 0.3)',
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(24, 24, 24, 0.2)',
                    color: '#FFFFFF',
                  }}
                  cursor={{ stroke: 'grey', strokeWidth: 1, fillOpacity: 0 }}
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  )
}

export default ChurchGraph
