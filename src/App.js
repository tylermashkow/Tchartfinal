import React, { useState } from "react";

function App() {
  const [annualKwh, setAnnualKwh] = useState(6450);
  const [offset, setOffset] = useState(100);
  const [utilityInflation, setUtilityInflation] = useState(7);
  const [yearOnePayments, setYearOnePayments] = useState({
    utility: 218.0,
    redirection299: 131.04,
    redirection0: 150.0,
    ownership: 323.0,
  });

  const YEARS = [1, 5, 10, 15, 20, 25];
  const INFLATION_RATE_B = 0.0299;

  const calculatePayment = (
    baseAmount,
    inflationRate,
    year,
    isFixed = false
  ) => {
    if (isFixed) return baseAmount;
    return baseAmount * Math.pow(1 + inflationRate, year - 1);
  };

  const calculateTotalSpend = (baseAmount, inflationRate, isFixed = false) => {
    let total = 0;
    for (let year = 1; year <= 25; year++) {
      total += calculatePayment(baseAmount, inflationRate, year, isFixed) * 12;
    }
    return total;
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        T Chart Calculator
      </h1>

      {/* First Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label style={labelStyle}>Annual kWh Usage</label>
          <input
            type="text"
            value={annualKwh === 0 ? "" : annualKwh}
            onChange={(e) => {
              const value = e.target.value;
              setAnnualKwh(value === "" ? 0 : Number(value));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Offset (%)</label>
          <input
            type="text"
            value={offset === 0 ? "" : offset}
            onChange={(e) => {
              const value = e.target.value;
              setOffset(value === "" ? 0 : Number(value));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Utility Inflation Rate (%)</label>
          <input
            type="text"
            value={utilityInflation === 0 ? "" : utilityInflation}
            onChange={(e) => {
              const value = e.target.value;
              setUtilityInflation(value === "" ? 0 : Number(value));
            }}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Second Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label style={labelStyle}>
            Utility ({utilityInflation}% increase) - Year 1 Payment ($)
          </label>
          <input
            type="text"
            value={yearOnePayments.utility === 0 ? "" : yearOnePayments.utility}
            onChange={(e) => {
              const value = e.target.value;
              setYearOnePayments((prev) => ({
                ...prev,
                utility: value === "" ? 0 : Number(value),
              }));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Re-Direction 2.99% - Year 1 Payment ($)
          </label>
          <input
            type="text"
            value={
              yearOnePayments.redirection299 === 0
                ? ""
                : yearOnePayments.redirection299
            }
            onChange={(e) => {
              const value = e.target.value;
              setYearOnePayments((prev) => ({
                ...prev,
                redirection299: value === "" ? 0 : Number(value),
              }));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Re-Direction 0% - Year 1 Payment ($)</label>
          <input
            type="text"
            value={
              yearOnePayments.redirection0 === 0
                ? ""
                : yearOnePayments.redirection0
            }
            onChange={(e) => {
              const value = e.target.value;
              setYearOnePayments((prev) => ({
                ...prev,
                redirection0: value === "" ? 0 : Number(value),
              }));
            }}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Ownership - Year 1 Payment ($)</label>
          <input
            type="text"
            value={
              yearOnePayments.ownership === 0 ? "" : yearOnePayments.ownership
            }
            onChange={(e) => {
              const value = e.target.value;
              setYearOnePayments((prev) => ({
                ...prev,
                ownership: value === "" ? 0 : Number(value),
              }));
            }}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "30px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
              }}
            >
              Year
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#FEE2E2",
              }}
            >
              Utility ({utilityInflation}% increase)
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#FEE2E2",
              }}
            >
              Grid Draw ({Math.max(0, 100 - offset)}%)
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#DCFCE7",
              }}
            >
              Re-Direction 2.99%
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#DCFCE7",
              }}
            >
              Re-Direction 0%
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                textAlign: "left",
                backgroundColor: "#DCFCE7",
              }}
            >
              Ownership
            </th>
          </tr>
        </thead>
        <tbody>
          {YEARS.map((year) => {
            const utilityPayment = calculatePayment(
              yearOnePayments.utility,
              utilityInflation / 100,
              year
            );
            const gridDrawPercentage = Math.max(0, 100 - offset) / 100;
            const gridDraw = utilityPayment * gridDrawPercentage;

            return (
              <tr key={year}>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                  {year}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#FEE2E2",
                  }}
                >
                  ${utilityPayment.toFixed(2)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#FEE2E2",
                  }}
                >
                  ${gridDraw.toFixed(2)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#DCFCE7",
                  }}
                >
                  $
                  {calculatePayment(
                    yearOnePayments.redirection299,
                    INFLATION_RATE_B,
                    year
                  ).toFixed(2)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#DCFCE7",
                  }}
                >
                  ${yearOnePayments.redirection0.toFixed(2)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    backgroundColor: "#DCFCE7",
                  }}
                >
                  ${yearOnePayments.ownership.toFixed(2)}
                </td>
              </tr>
            );
          })}
          <tr>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                fontWeight: "bold",
              }}
            >
              Total Spend
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#FEE2E2",
              }}
            >
              $
              {calculateTotalSpend(
                yearOnePayments.utility,
                utilityInflation / 100
              ).toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#FEE2E2",
              }}
            >
              $
              {(
                calculateTotalSpend(
                  yearOnePayments.utility,
                  utilityInflation / 100
                ) *
                ((100 - offset) / 100)
              ).toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#DCFCE7",
              }}
            >
              $
              {calculateTotalSpend(
                yearOnePayments.redirection299,
                INFLATION_RATE_B
              ).toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#DCFCE7",
              }}
            >
              $
              {calculateTotalSpend(
                yearOnePayments.redirection0,
                0,
                true
              ).toFixed(2)}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#DCFCE7",
              }}
            >
              $
              {calculateTotalSpend(yearOnePayments.ownership, 0, true).toFixed(
                2
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tax Benefits Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Tax Benefits
        </h2>

        <div style={{ display: "flex", width: "100%" }}>
          {/* Utility Column */}
          <div style={{ flex: 1, backgroundColor: "#FEE2E2", padding: "16px" }}>
            <div>
              <p style={{ fontWeight: "500", marginBottom: "12px" }}>
                Utility ({utilityInflation}% increase)
              </p>
              <p>No Tax Benefits</p>
            </div>
          </div>

          {/* Re-Direction 2.99% Column */}
          <div style={{ flex: 1, backgroundColor: "#DCFCE7", padding: "16px" }}>
            <div>
              <p style={{ fontWeight: "500", marginBottom: "12px" }}>
                Re-Direction 2.99%
              </p>
              <p style={{ marginBottom: "8px" }}>NYS Tax Credit ($)</p>
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="number"
                  defaultValue={5000}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <p style={{ marginBottom: "8px" }}>Property Tax Credit ($)</p>
              <div>
                <input
                  type="number"
                  defaultValue={0}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Re-Direction 0% Column */}
          <div style={{ flex: 1, backgroundColor: "#DCFCE7", padding: "16px" }}>
            <div>
              <p style={{ fontWeight: "500", marginBottom: "12px" }}>
                Re-Direction 0%
              </p>
              <p style={{ marginBottom: "8px" }}>NYS Tax Credit ($)</p>
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="number"
                  defaultValue={5000}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <p style={{ marginBottom: "8px" }}>Property Tax Credit ($)</p>
              <div>
                <input
                  type="number"
                  defaultValue={0}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Ownership Column */}
          <div style={{ flex: 1, backgroundColor: "#DCFCE7", padding: "16px" }}>
            <div>
              <p style={{ fontWeight: "500", marginBottom: "12px" }}>
                Ownership
              </p>
              <p style={{ marginBottom: "8px" }}>Federal Tax Credit ($)</p>
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="number"
                  defaultValue={0}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <p style={{ marginBottom: "8px" }}>NYS Tax Credit ($)</p>
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="number"
                  defaultValue={5000}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <p style={{ marginBottom: "8px" }}>Property Tax Credit ($)</p>
              <div>
                <input
                  type="number"
                  defaultValue={0}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            setAnnualKwh(0);
            setOffset(0);
            setUtilityInflation(0);
            setYearOnePayments({
              utility: 0,
              redirection299: 0,
              redirection0: 0,
              ownership: 0,
            });
          }}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          REFRESH
        </button>
      </div>
    </div>
  );
}

export default App;
