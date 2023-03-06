

const FlagGrid = ({countries, value, equalTo, lowerBoundary, upperBoundary}) => {


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
                return <div key={country.id} className={`flag-box-${country.gameIndex} flag-box`}>{country.name}</div>
              } else {
                return <div key={country.id} className={`flag-box-${country.gameIndex} flag-box`}></div>
              }
            })}
          </div>
  )
}

export default FlagGrid