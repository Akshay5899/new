const stats = [
  { label: 'Total Arrival (kg)', value: '25,600' },
  { label: 'Avg Price (₹)', value: '1,234' },
  { label: 'Markets Covered', value: '12' },
  { label: 'Commodities', value: '34' }
]
export default function MarketStats() {
  return (
    <section id="statistics" className="mt-5">
      <h3 className="mb-3">Market Snapshot</h3>
      <div className="row">
        {stats.map((s) => (
          <div key={s.label} className="col-6 col-md-3 mb-3">
            <div className="card text-center p-2">
              <small className="text-muted">{s.label}</small>
              <div className="fw-bold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
