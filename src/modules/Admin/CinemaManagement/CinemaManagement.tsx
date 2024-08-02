import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Collapse, Card, Table, Image, Spin, Alert } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { cinemaApi } from '../../../apis/cinema.api'
import { CinemaListItem, CumRap, HeThongRap, ThongTinCumRap } from '../../../interface/movietheater.interface'
import { LoadingOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const columns: ColumnsType<CinemaListItem> = [
  {
    title: 'Cinema ID',
    dataIndex: 'maRap',
    key: 'maRap',
  },
  {
    title: 'Cinema Name',
    dataIndex: 'tenRap',
    key: 'tenRap',
  },
]

const CinemaManagement = () => {
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState<string | null>(null)

  const {
    data: theaterSystems = [],
    isLoading: isLoadingTheaterSystems,
    isError: isErrorTheaterSystems,
    error: errorTheaterSystems,
  } = useQuery({
    queryKey: ['list-theater'],
    queryFn: cinemaApi.getAllCinema,
  })

  const {
    data: cinemas2 = [],
    isLoading: isLoadingCinemas,
    isError: isErrorCinemas,
    error: errorCinemas,
  } = useQuery({
    queryKey: ['list-cinema', selectedTheaterSystem],
    queryFn: () => {
      if (selectedTheaterSystem) {
        return cinemaApi.getThreateFromCinema({ maHeThongRap: selectedTheaterSystem })
      }
      return Promise.resolve([])
    },
    enabled: !!selectedTheaterSystem,
  })

  const handleTheaterSystemClick = useCallback((maHeThongRap: string) => {
    setSelectedTheaterSystem(maHeThongRap)
  }, [])

  if (isLoadingTheaterSystems || isLoadingCinemas)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    )

  if (isErrorTheaterSystems || isErrorCinemas) {
    const errorMessage = isErrorTheaterSystems ? errorTheaterSystems?.message : errorCinemas?.message
    return <Alert message={`Error fetching data: ${errorMessage}`} type="error" />
  }

  return (
    <div>
      <div>
        <Breadcrumb separator=">" items={[{ title: 'Dashboard' }, { title: <a href="">Cinema Management</a> }]} />
      </div>
      <h3 className="font-medium text-3xl mb-3">List Cinema</h3>
      <div>
        <Collapse accordion>
          {theaterSystems.map((system: HeThongRap) => (
            <Panel
              header={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image width={50} src={system.logo} alt={system.tenHeThongRap} style={{ marginRight: '10px' }} />
                  {system.tenHeThongRap}
                </div>
              }
              key={system.maHeThongRap}
              onClick={() => handleTheaterSystemClick(system.maHeThongRap)}
            >
              <h2>Cinemas - {system.tenHeThongRap}</h2>
              {selectedTheaterSystem === system.maHeThongRap &&
                cinemas2.map((cinema: ThongTinCumRap) => (
                  <Card key={cinema.maCumRap} title={cinema.tenCumRap} style={{ marginBottom: '16px' }}>
                    <Table columns={columns} dataSource={cinema.danhSachRap} rowKey="maRap" pagination={false} />
                  </Card>
                ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  )
}

export default CinemaManagement
