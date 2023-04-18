import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./default.jpg";
import styles from "./radio.module.scss";

export default function RadioFM() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("");

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      console.log(data);
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api
      .searchStations({
        countryCode: 'TH',
        tag: stationFilter,
        limit: 40,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className={styles.App}>
    <div className={styles.radio}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <span
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className={styles.stations}>
        {stations &&
          stations.map((station, index) => {
            return (
              <div className={styles.station} key={index}>
                <div className={styles.stationName}>
                  <img
                    className={styles.logo}
                    src={station.favicon}
                    alt="station logo"
                    onError={setDefaultSrc}
                  />
                  <div className={styles.name} tabIndex={0}>{station.name}</div>
                </div>

                <AudioPlayer
                  className={styles.player}
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
    </div>
  );
}
