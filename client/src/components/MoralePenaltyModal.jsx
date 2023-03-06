

const MoralePenaltyModal = ({onClose, countries}) => {
  return (
    <div id="morale-penalty-modal" className="container">
      <div id="mp-modal-data">
        <div id="mp-modal-row-titles">
          <div>DATA</div>
          <div>Stress Before MP</div>
          <div>Morale Trigger Point</div>
          <div>Morale Penalty (MP)</div>
          <div>Stress After MP</div>
        </div>
        {countries.map((country) => (
          <div key={country.name} className={`mp-modal-country-${country.gameIndex}`}>
            <div className={`mp-modal-c-name-${country.gameIndex}`}>{country.name}</div>
            <div className={`mp-modal-c-stress-${country.gameIndex}`}>{country.stressLevel}</div>
            <div className={`mp-modal-c-mtp-${country.gameIndex}`}>{country.moraleTriggerPoint}</div>
            <div className={`mp-modal-c-mp-${country.gameIndex}`}>(morale penalty)</div>
            <div className={`mp-modal-c-stress-after-mp-${country.gameIndex}`}>(stress after MP)</div>
          </div>
        ))}
      </div>
      <div id="mp-modal-buttons">
        <button>Apply MPs and Advance to next round (click does nothing yet)</button>
        <button onClick={onClose}>Go Back</button>
      </div>
    </div>
  )
}

export default MoralePenaltyModal