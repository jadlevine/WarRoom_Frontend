import FlagGrid from "./FlagGrid"

const CasualtyToStressConversionChart = ({countries}) => {

  const conversionValues = [
    [0,0,18],
    [1,20,34],
    [2,36,50],
    [3,52,68],
    [4,70,88],
    [5,90,108],
    [6,110,Number.MAX_SAFE_INTEGER]
  ]

  return (
    <div id="casualty-to-stress-container" className="container">
      {/* <div className="right-align border"><span className="red">CASUALTY</span><br></br><span className="smaller">TO</span> STRESS<br></br>CONVERSION</div> */}
      <div><span className="red">CASUALTY</span><span className="smaller">TO</span> STRESS CONVERSION</div>
      <div id="c-to-s-conversion-boxes">
        
      {conversionValues.map((values)=>(
      <div key={values[0]} className="border c-to-s-conversion-box">
        <div className="stress-area dotted-border">
          <div className="smaller">Stress</div>
          <div className="xx-large">{values[0]}</div>
        </div>
        <div className="c-to-s-flag-box">
          <FlagGrid
            countries={countries}
            value="casualtyTotalValue"
            lowerBoundary={values[1]}
            upperBoundary={values[2]}
          />
        </div>
        <div className="casualty-range-area dotted-border">
          <div className="xx-small">Casualty Range</div>
          {values[2]>111 ? (
            <div>{values[1]}+</div>
          ) : (
            <div>{values[1]} - {values[2]}</div>
          )}
        </div>
      </div>
      ))}
      </div>
    </div>
  )
}

export default CasualtyToStressConversionChart