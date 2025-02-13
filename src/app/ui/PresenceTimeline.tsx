'use client'

import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsDumbbell from "highcharts/modules/dumbbell";
import HC_more from "highcharts/highcharts-more";
import { Presence } from "@/app/lib/types";

HC_more(Highcharts);
highchartsDumbbell(Highcharts);

interface PresenceTimelineProps {
  presences: Presence[]
}

const PresenceTimeline: React.FC<PresenceTimelineProps> = (props) => {
  const flattenedPresences = props.presences.map((presence) => {
    return presence.presence_intervals.map((interval, i) => {
      return {
        // status: presence.current_status,
        name: presence.profile.name,
        low: interval[0],
        high: interval[1]
      }
    })
  }).flat()

  console.log(flattenedPresences)
  
  const chartOptions = {
    chart: {
      type: "dumbbell",
      height: '100%',
    },
    legend: {
      enabled: false
    },
    title: {
      text: "Prescence Timelines"
    },
    // tooltip: {
    //   shared: true,
    //   formatter: function() {
    //     return ''+
    //             "" +
    //             'Time: '+ Highcharts.dateFormat('%I:%M %p', this.x);
    //   }
    // },
    xAxis: {
      type: "category",
      title: {
        text: "Profiles"
      },
    },
    yAxis: {
      title: {
        text: "Date"
      },
      type: 'datetime',
      dateTimeLabelFormats : {
        hour: '%I %p',
        minute: '%I:%M %p'
      }
    },
    series: [
      {
        name: "Profiles",
        data: flattenedPresences
      }
    ],
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.dateFormat('%I:%M %p', this.y);
          }
        },
        dumbbell: {
          marker: {
            enabled: true
          }
        }
      }
    }
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PresenceTimeline;
