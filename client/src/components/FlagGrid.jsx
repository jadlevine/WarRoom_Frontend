// const flags = require('/client/src/assets')

const FlagGrid = ({countries, value, equalTo, lowerBoundary, upperBoundary}) => {

  // const china = require('../assets/China.png')

// (equalTo && country[value] === equalTo) ||
  // this line below does not work, because an integer value of ZERO (equalTo=0) evaluates to FALSE... WHYYYY???

  return (
    <div className="flag-grid">
            {countries?.map((country) => {
              if (
                // (equalTo && country[value] === equalTo) ||
                (country[value] === equalTo) ||
                ((value === "casualtyTotalValue" && country[value] >= lowerBoundary && country[value] <= upperBoundary))
                  ) {
                return <img key={country.id} className={`flag-box-${country.gameIndex} flag-box`} src={`../assets/${country.name}.png`} alt={country.name} />
              } else {
                return <div key={country.id} className={`flag-box-${country.gameIndex} flag-box`}></div>
              }
            })}
          </div>
  )
}

export default FlagGrid