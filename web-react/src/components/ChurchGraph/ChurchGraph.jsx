import PlaceholderCustom from 'components/Placeholder'
import useClickCard from 'hooks/useClickCard'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
  Legend,
} from 'recharts'
import { capitalise } from '../../global-utils'
import './ChurchGraph.css'

const ChurchGraph = (props) => {
  const { loading, stat1, stat2, churchData, secondaryTitle } = props
  const { clickCard } = useClickCard()
  const navigate = useNavigate()

  const [sortedData, setSortedData] = useState([])
  const [dataMax, setDataMax] = useState(0)

  useEffect(() => {
    setSortedData(
      churchData?.sort((a, b) => {
        if (a.week - b.week < -4 || a.week - b.week > 4) {
          return -1 * a.week - b.week
        }

        return a.week - b.week
      })
    )

    setDataMax({
      attendance:
        Math.max.apply(
          Math,
          churchData?.map((max) => {
            return max.attendance
          })
        ) * 1.2,
      income:
        Math.max.apply(
          Math,
          churchData?.map((max) => {
            return max.income
          })
        ) + 1.2,
    })
  }, [churchData])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Week ${label}`}</p>
          <p className="intro">{`${payload[0].name}: ${payload[0].value}`}</p>
          {payload[1] && (
            <p className="intro">{`${payload[1].name}: ${payload[1].value}`}</p>
          )}
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      )
    }

    return null
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <PlaceholderCustom loading={loading} as="p">
          <p className="chart-title font-weight-bold m-0">
            {stat2
              ? `${capitalise(stat1)} and ${capitalise(stat2)}`
              : `${capitalise(stat1)} Graph`}
          </p>
        </PlaceholderCustom>
        {secondaryTitle && (
          <PlaceholderCustom loading={loading} as="p">
            <p className="chart-title church-name">{`${secondaryTitle}`}</p>
          </PlaceholderCustom>
        )}
        {!loading && (
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={sortedData} margin={{ top: 20 }}>
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
                onClick={(data) => {
                  if (data.id) {
                    clickCard({ ...data, __typename: 'ServiceRecord' })
                    navigate(`/${props.church}/service-details`)
                  }
                }}
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
                  onClick={(data) => {
                    if (data.id) {
                      clickCard({ ...data, __typename: 'ServiceRecord' })
                      navigate(`/${props.church}/service-details`)
                    }
                  }}
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
                  if (!week) {
                    return 'No Data Found'
                  }
                  return 'Week ' + week
                }}
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, dataMax[`${stat1}`]]}
                yAxisId="left"
                orientation="left"
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, dataMax[`${stat2}`]]}
                yAxisId="right"
                orientation="right"
              />

              <Tooltip
                wrapperStyle={{
                  background: 'rgba(24, 24, 24, 0.3)',
                }}
                content={<CustomTooltip />}
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
  )
}

export default ChurchGraph
