'use client'

import React from "react";

import Highcharts, { offset } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsDumbbell from "highcharts/modules/dumbbell";
import HC_more from "highcharts/highcharts-more";
import { Presence } from "@/app/lib/types";
import { renderToStaticMarkup } from "react-dom/server";
import Image from "next/image";

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
        name: presence.profile,
        low: interval[0],
        high: interval[1]
      }
    })
  }).flat()

  console.log(flattenedPresences)

  const categories = flattenedPresences
    .map((presence) => presence.name)
    .filter((value, index, self) => self.indexOf(value) === index);
  
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
      categories: categories,
      type: "category",
      opposite: true,
      labels: {
        // align: 'center',
        // x: -28,
        // padding: 1,
        useHTML: true,
        formatter: function() {
          const profile = this.value
          return renderToStaticMarkup(
            <div
              className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-500 mr-16"
              onMouseOver={() => console.log(profile)}
              onClick={(e) => console.log(profile)}
            >
              {profile.photo_url && (
                <img src={profile.photo_url} alt={profile.name} style={{ width: '30px', height: '30px' }} />
                // <Image
                //   src={profile.photo_url}
                //   alt={profile.name}
                //   className="w-8 h-8 rounded-full"
                //   width={32}
                //   height={32}
                // />
              )}
            </div>
          );
        }
      }
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
          headerFormat: `<b>{point.key.name}</b><br>`,
          pointFormatter: function(): string {
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
