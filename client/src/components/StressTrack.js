import FlagGrid from './FlagGrid'

const StressTrack = ({ countries }) => {
  const stressTrackLevels = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, Number.MAX_SAFE_INTEGER]
  ]

  return (
    <div className="stress-track-container container">
      <div className="stress-track-header">
        Stress Trigger Points <br></br>and Current Levels
      </div>
      <div className="stress-track-boxes">
        {stressTrackLevels.map((level) => (
          <div
            key={level}
            className={`border stress-track-box stress-track-${level}`}
          >
            <div className="stress-level">
              {level[1] !== Number.MAX_SAFE_INTEGER ? level[0] : '10+'}
            </div>
            <div className="morale-trigger-flag-box">
              <FlagGrid
                countries={countries}
                value="moraleTriggerPoint"
                lowerBoundary={level[0]}
                upperBoundary={level[1]}
              />
            </div>
            <div className="stress-level-flag-box">
              <FlagGrid
                countries={countries}
                value="stressLevel"
                lowerBoundary={level[0]}
                upperBoundary={level[1]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StressTrack
