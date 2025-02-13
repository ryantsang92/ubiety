'use client'

import React from "react";
import Chart from 'react-apexcharts'
import { Presence } from "@/app/lib/types";

interface PresenceTimelineProps {
  presences: Presence[]
}

const PresenceTimeline: React.FC<PresenceTimelineProps> = (props) => {
  const flattenedPresences = props.presences.map((presence) => {
    return presence.presence_intervals.map((interval, i) => {
      return {
        // status: presence.current_status,
        // x: presence.profile.name,
        x: i,
        y: [interval[0], interval[1]]
      }
    })
  }).flat()

  console.log(flattenedPresences)

  const state = {
    series: [
      {
        // data: [
        //   {
        //     x: 'Kiko',
        //     y: [2800, 4500]
        //   },
        //   {
        //     x: 'Kiko',
        //     y: [5800, 7500]
        //   },
        //   {
        //     x: '2009',
        //     y: [3200, 4100]
        //   },
        //   {
        //     x: '2010',
        //     y: [2950, 7800]
        //   },
        //   {
        //     x: '2011',
        //     y: [3000, 4600]
        //   },
        //   {
        //     x: '2012',
        //     y: [3500, 4100]
        //   },
        //   {
        //     x: '2013',
        //     y: [4500, 6500]
        //   },
        //   {
        //     x: '2014',
        //     y: [4100, 5600]
        //   }
        // ]
        data: flattenedPresences
      }
    ],
    options: {
      chart: {
        height: 600,
        zoom: {
          enabled: false
        }
      },
      colors: ['#00E4D9', '#4ED300'],
      plotOptions: {
        bar: {
          horizontal: false,
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [['#00E4D9', '#4ED300']]
        }
      },
      title: {
        text: 'Prescence Timeline'
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#4ED300'],
          inverseColors: false,
          stops: [0, 100]
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      },
      tooltip: {
        enabled: true,
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          return '<div class="arrow_box">' +
            '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            '</div>'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      }
    },
  }

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={390}
      />
    </div>
  );
};

export default PresenceTimeline;
