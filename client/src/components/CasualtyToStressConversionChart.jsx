

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
      <div className="right-align border"><span className="red">CASUALTY</span><br></br><span className="smaller">TO</span> STRESS<br></br>CONVERSION</div>
      {conversionValues.map((values)=>(
      <div key={values[0]} className="border c-to-s-conversion-box">
        <div className="stress-area">
          <div>Stress</div>
          <div className="xx-large">{values[0]}</div>
        </div>
        <div className="flags-and-casualty-range-area">
          <div className="flag-area">
            {countries?.map((country) => {
              if(country.casualtyTotalValue <= values[2] &&
                country.casualtyTotalValue >= values[1]
                ){
                return <div key={country.id} className={`c-to-s-${country.gameIndex} flag-box`}>{country.name}</div>
              } else {
                return <div key={country.id} className={`c-to-s-${country.gameIndex} flag-box`}></div>
              }
            })}
            {/* <div className="flag-box">flag</div>
            <div className="flag-box">flag</div>
            <div className="flag-box">flag</div>
            <div className="flag-box">flag</div>
            <div className="flag-box">flag</div>
            <div className="flag-box">flag</div>
            {/* <div className="flag-box">flag</div> */}
            {/* <div className="flag-box">flag</div> */}
            {/* <div className="flag-box">flag</div> */}
          </div>
          <div className="casualty-range-area">
            <div className="xx-small">Casualty Range</div>
            {/* <div className="large">{values[1]} - {values[2]}</div> */}
            {values[2]>111 ? (
              <div>{values[1]}+</div>
            ) : (
              <div>{values[1]} - {values[2]}</div>
            )}
          </div>
        </div>
      </div>

      ))}
    </div>
  )
}

export default CasualtyToStressConversionChart