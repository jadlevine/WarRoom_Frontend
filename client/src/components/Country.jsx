

const Country = ({countryData}) => {


  return (
    <div>
      {!countryData ? (
        <div>
          <h2>Fetching Country Data</h2>
        </div>
      ) : (
        <div className="country-container">
          <h3>{countryData.name}</h3>
        </div>
      )}
    </div>
  )
}

export default Country