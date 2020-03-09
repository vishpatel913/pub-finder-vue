const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const axios = require("axios");
const config = require("./config");

exports.geocoding = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { lat, lng } = req.query;
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    const params = {
      latlng: `${lat},${lng}`,
      key: config.google.key
    };

    return axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", { params })
      .then(response => {
        const {
          formatted_address,
          address_components
        } = response.data.results[0];
        return res.status(200).json({
          data: {
            formatted_address,
            address_components: address_components.reduce((p, c) => {
              p.push({
                [c.types[0]]: c.long_name
              });
              return p;
            }, [])
          }
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        });
      });
  });
});
