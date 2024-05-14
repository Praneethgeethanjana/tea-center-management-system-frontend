// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import TinyChartStats from '@components/widgets/stats/TinyChartStats'

const OrdersBarChart = ({ color,thisMonthTeaKg }) => {
  // ** State
  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   axios.get('/card/card-statistics/orders-bar-chart').then(res => setData(res.data))
  //   return () => setData(null)
  // }, [])

  const data = {
    orders_bar_chart: {
      title: 'Tea Leaves',
      statistics: `${thisMonthTeaKg} Kg`,
      series: [
        {
          name: 'Leaves',
          data: [45, 85, 65, 45, 65,45,69,28,46,37,85,110]
        },
      ]
    },
    profit_line_chart: {
      title: 'Profit',
      statistics: '6,24k',
      series: [
        {
          data: [0, 20, 5, 30, 15, 45]
        }
      ]
    },
    subscribers_gained: {
      series: [
        {
          name: 'Subscribers',
          data: [28, 40, 36, 52, 38, 60, 55]
        }
      ],
      analyticsData: {
        subscribers: 92600
      }
    },
    revenueGenerated: {
      series: [
        {
          name: 'Revenue',
          data: [350, 275, 400, 300, 350, 300, 450]
        }
      ],
      analyticsData: {
        revenue: 97500
      }
    },
    quarterlySales: {
      series: [
        {
          name: 'Sales',
          data: [10, 15, 7, 12, 3, 16]
        }
      ],
      analyticsData: {
        sales: '36%'
      }
    },
    ordersRecevied: {
      series: [
        {
          name: 'Orders',
          data: [10, 15, 8, 15, 7, 12, 8]
        }
      ],
      analyticsData: {
        orders: 97500
      }
    },
    siteTraffic: {
      series: [
        {
          name: 'Traffic Rate',
          data: [150, 200, 125, 225, 200, 250]
        }
      ]
    },
    activeUsers: {
      series: [
        {
          name: 'Active Users',
          data: [750, 1000, 900, 1250, 1000, 1200, 1100]
        }
      ]
    },
    newsletter: {
      series: [
        {
          name: 'Newsletter',
          data: [365, 390, 365, 400, 375, 400]
        }
      ]
    }
  }

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15px',
        borderRadius: [0, 5],
        colors: {
          backgroundBarColors: ['#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3', '#f3f3f3'],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [color],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    // xaxis: {
    //   // categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false
    //     },
    // },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  }

  return data !== null ? (
    <TinyChartStats
      height={70}
      type='bar'
      options={options}
      title={data.orders_bar_chart.title}
      stats={data.orders_bar_chart.statistics}
      series={data.orders_bar_chart.series}
    />
  ) : null
}

export default OrdersBarChart
