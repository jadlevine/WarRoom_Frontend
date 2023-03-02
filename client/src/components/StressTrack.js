import FlagGrid from './FlagGrid'

const StressTrack = ({ countries }) => {
  const stressTrackLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+']

  return (
    <div className="stress-track-container container">
      <div className="stress-track-header">Stress Levels</div>
      <div className="stress-track-boxes">
        {stressTrackLevels.map((level) => (
          <div
            key={level}
            className={`border stress-track-box stress-track-${level}`}
          >
            <div className="stress-level">{level}</div>
            <div className="morale-trigger-flag-box">
              <FlagGrid
                countries={countries}
                value="moraleTriggerPoint"
                equalTo={level}
                lowerBoundary={null}
                upperBoundary={null}
                // selector={'country.moraleTriggerPoint === level'}
              />
            </div>
            <div className="stress-level-flag-box">
              <FlagGrid
                countries={countries}
                value="stressLevel"
                equalTo={level}
                lowerBoundary={null}
                upperBoundary={null}
              />
            </div>
            {/* <div className="top">
              <div className="trigger-countries">
                {countries?.map((country) => {
                  if (country.moraleTriggerPoint === level) {
                    return (
                      <div key={country.id} className="red">
                        {country.name}
                      </div>
                    )
                  }
                })}
              </div>
            </div> */}
            {/* <div className="flag-area">
              {countries?.map((country) => {
                if (
                  country.stressLevel === level ||
                  (country.stressLevel > 10 && level === '10+')
                ) {
                  return (
                    <div
                      key={country.id}
                      className={`c-to-s-${country.gameIndex} flag-box`}
                    >
                      {country.name}
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={country.id}
                      className={`c-to-s-${country.gameIndex} flag-box`}
                    ></div>
                  )
                }
              })}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StressTrack
