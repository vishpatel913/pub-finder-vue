export const directionsMockResponse = {
  geocoded_waypoints: [
    {
      geocoder_status: 'OK',
      place_id: 'ChIJA4_uV5cFdkgRMmKiViLPrTA',
      types: ['street_address'],
    },
    {
      geocoder_status: 'OK',
      place_id: 'ChIJe_W0LJoFdkgRcWspCshbNmA',
      types: ['bar', 'establishment', 'food', 'point_of_interest', 'restaurant'],
    },
  ],
  routes: [
    {
      bounds: {
        northeast: {
          lat: 51.46311679999999,
          lng: -0.1696466,
        },
        southwest: {
          lat: 51.46160949999999,
          lng: -0.1733293,
        },
      },
      copyrights: 'Map data ©2020',
      legs: [
        {
          distance: {
            text: '0.4 km',
            value: 398,
          },
          duration: {
            text: '2 mins',
            value: 114,
          },
          end_address: "89 St John's Hill, London SW11 1SY, UK",
          end_location: {
            lat: 51.46160949999999,
            lng: -0.1730481,
          },
          start_address: '30C Eckstein Rd, London SW11 1QF, UK',
          start_location: {
            lat: 51.4624581,
            lng: -0.1699588,
          },
          steps: [
            {
              distance: {
                text: '90 m',
                value: 90,
              },
              duration: {
                text: '1 min',
                value: 26,
              },
              end_location: {
                lat: 51.46311679999999,
                lng: -0.1699001,
              },
              html_instructions:
                "Head <b>northeast</b> toward <b>St John's Hill</b>/<wbr/><b>A3036</b>",
              polyline: {
                points: 'kgbyHfe`@?ECMIa@AA?AAAA?AAA?AAWJCAC?E?G@E@u@d@',
              },
              start_location: {
                lat: 51.4624581,
                lng: -0.1699588,
              },
              travel_mode: 'DRIVING',
            },
            {
              distance: {
                text: '0.3 km',
                value: 283,
              },
              duration: {
                text: '1 min',
                value: 81,
              },
              end_location: {
                lat: 51.4617561,
                lng: -0.1733293,
              },
              html_instructions: "Turn <b>left</b> onto <b>St John's Hill</b>/<wbr/><b>A3036</b>",
              maneuver: 'turn-left',
              polyline: {
                points: 'okbyHzd`@d@jCH^F\\FXBHH\\BNHTLb@HVBJN`@?@HRDNJX^~@Tl@Pb@b@~@',
              },
              start_location: {
                lat: 51.46311679999999,
                lng: -0.1699001,
              },
              travel_mode: 'DRIVING',
            },
            {
              distance: {
                text: '25 m',
                value: 25,
              },
              duration: {
                text: '1 min',
                value: 7,
              },
              end_location: {
                lat: 51.46160949999999,
                lng: -0.1730481,
              },
              html_instructions:
                'Turn <b>left</b> onto <b>Strath Terrace</b><div style="font-size:0.9em">Destination will be on the right</div>',
              maneuver: 'turn-left',
              polyline: {
                points: '_cbyHhz`@Vk@DK',
              },
              start_location: {
                lat: 51.4617561,
                lng: -0.1733293,
              },
              travel_mode: 'DRIVING',
            },
          ],
          traffic_speed_entry: [],
          via_waypoint: [],
        },
      ],
      overview_polyline: {
        points: 'kgbyHfe`@Mu@EECAYHGAM@{@f@n@jD\\~AbAdDfAvCt@bB\\w@',
      },
      summary: "St John's Hill/A3036",
      warnings: [],
      waypoint_order: [],
    },
  ],
  status: 'OK',
};
