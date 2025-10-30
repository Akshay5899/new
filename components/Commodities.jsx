const data = [
  { name: 'Onion', arrival: '2,450 kg', price: '₹18/kg' },
  { name: 'Tomato', arrival: '1,200 kg', price: '₹22/kg' },
  { name: 'Potato', arrival: '3,600 kg', price: '₹10/kg' },
  { name: 'Wheat', arrival: '12,000 kg', price: '₹22/kg' }
]
export default function Commodities() {
  return (
    <section id="commodities" className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Today's Commodities</h3>
        <small>Last updated: Oct 6, 2025</small>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.arrival}</td>
                <td>{row.price}</td>
                <td className="text-success">Stable</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
