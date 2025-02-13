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
    return presence.presence_intervals.map((interval) => {
      return {
        status: presence.current_status,
        name: presence.profile.name,
        low: interval[0],
        high: interval[1]
      }
    })
  }).flat()
  
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
    series: flattenedPresences.map((presence) => {
      return {
        name: "Profiles",
        data: [{
          name: presence.name,
          low: presence.low,
          high: presence.high,
          status: presence.status
        }],
        connectorWidth: 3,
        marker: {
          enabled: true,
          symbol: "circle",
          fillColor: "#4ED304"
        },
        connectorColor: "#00E4D9",
        lowColor: "#00E4D9",
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.dateFormat('%I:%M %p', this.y);
          }
        },
        tooltip: {
          enabled: true,
          followPointer: true,
          headerFormat: '<b>{point.key}</b><br>',
          pointFormatter: function() {
            return `Status: ${this.status}<br>Time: ${Highcharts.dateFormat('%I:%M %p', this.low)} - ${Highcharts.dateFormat('%I:%M %p', this.high)}`
          }
        },
      }
    }),
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PresenceTimeline;
