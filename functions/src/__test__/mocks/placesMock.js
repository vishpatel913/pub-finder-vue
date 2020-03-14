const placeDetailsMockResponse = {
  html_attributions: [],
  result: {
    opening_hours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: "2230"
          },
          open: {
            day: 0,
            time: "1200"
          }
        },
        {
          close: {
            day: 2,
            time: "0000"
          },
          open: {
            day: 1,
            time: "1200"
          }
        },
        {
          close: {
            day: 3,
            time: "0000"
          },
          open: {
            day: 2,
            time: "1200"
          }
        },
        {
          close: {
            day: 4,
            time: "0000"
          },
          open: {
            day: 3,
            time: "1200"
          }
        },
        {
          close: {
            day: 5,
            time: "0000"
          },
          open: {
            day: 4,
            time: "1200"
          }
        },
        {
          close: {
            day: 6,
            time: "0200"
          },
          open: {
            day: 5,
            time: "1200"
          }
        },
        {
          close: {
            day: 0,
            time: "0200"
          },
          open: {
            day: 6,
            time: "1100"
          }
        }
      ],
      weekday_text: [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 2:00 AM",
        "Saturday: 11:00 AM – 2:00 AM",
        "Sunday: 12:00 – 10:30 PM"
      ]
    },
    photos: [
      {
        height: 2268,
        html_attributions: ['<a href="https://test.user..juan">Jaun User</a>'],
        photo_reference:
          "CmRaAAAA0SWIWPaeuiNQKFyuEORjI1euX_xaN_CFfaSikfxO0jm_5JHTZieDFMiwyitWaFxVx8DTRL_owWQIjGWfxrcxl0G",
        width: 4032
      },
      {
        height: 3036,
        html_attributions: ['<a href="https://test.user.tu">Tu User</a>'],
        photo_reference:
          "CmRaAAAANaWYi8Tykl_0vRiE5k78AtCBZzd_A3A1tPQCMVirvmiD05F5URCdvw3LSrzicpP_GNxJYwM7E4HCwBQNy_CTO7a_",
        width: 4048
      }
    ]
  },
  status: "OK"
};

module.exports = { placeDetailsMockResponse };
