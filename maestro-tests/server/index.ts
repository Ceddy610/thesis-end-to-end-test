import process from "child_process";
import express from "express";
import { Buffer } from "node:buffer";
import * as resemble from "resemblejs";
import fs from "node:fs";

const host = "127.0.0.1";
const port = 4567;

const app = express();

app.use(express.json());

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`);
});

app.post("/", (req, res) => {
  const pictureBaseline = req.body.baseline;
  const pictureCurrent = req.body.current;

  console.log(`Comparing ${pictureBaseline} with ${pictureCurrent}`);

  resemble
    .default(`../${pictureBaseline}`)
    .compareTo(`../${pictureCurrent}`)
    .ignoreAntialiasing()
    .outputSettings({
      boundingBox: {
        left: 10,
        top:90,
        right: 1015,
        bottom: 1900,
      },
    })
    .onComplete((data) => {
      const buffer = data?.getBuffer?.(true);
      res.status(200).send({
        diff: data.misMatchPercentage,
      });
      console.log(data.misMatchPercentage);

      if(!buffer) {
        return;
      }

      fs.writeFile(`../${pictureCurrent}-diff.png`, buffer, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
});
