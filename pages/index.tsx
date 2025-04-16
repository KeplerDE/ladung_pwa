import { useState } from "react";
import { eicheTable } from "../utils/eicheTable";
import styles from "./index.module.css";

export default function LadungCalculator() {
  const [osadki, setOsadki] = useState(["", "", "", "", "", ""]);
  const [calculated, setCalculated] = useState(false);

  const avgOsadka = () => {
    const nums = osadki.map((v) => parseFloat(v)).filter((n) => !isNaN(n) && n >= 100 && n <= 316);
    if (nums.length !== 6) return null;
    return nums.reduce((a, b) => a + b, 0) / 6;
  };

  const interpolate = (depth: number) => {
    const keys = Object.keys(eicheTable).map(Number).sort((a, b) => a - b);
    if (depth <= keys[0]) return eicheTable[keys[0]];
    if (depth >= keys[keys.length - 1]) return eicheTable[keys[keys.length - 1]];
    const lower = Math.floor(depth);
    const upper = Math.ceil(depth);
    const y1 = eicheTable[lower];
    const y2 = eicheTable[upper];
    const ratio = depth - lower;
    return y1 + (y2 - y1) * ratio;
  };

  const handleCalculate = () => setCalculated(true);
  const avg = calculated ? avgOsadka() : null;
  const result = avg !== null ? interpolate(avg).toFixed(2) : null;

  return (
    <div className={styles.container}>
      <img src="/reederei-logo.jpg" alt="Logo" className={styles.logo} />

      <div className={styles.card}>
        <h1 className={styles.title}>Ladungsrechner für Michaela-Back</h1>
        <p className={styles.subtitle}>Geben Sie die sechs Tiefgänge ein:</p>

        <div className={styles.gridWrapper}>
          <div className={styles.gridItem}>
            <p>Hinten Backbord</p>
            <input value={osadki[0]} onChange={(e) => updateOsadki(0, e)} type="number" min={100} max={316} step="0.1" />
          </div>
          <div className={styles.gridItem}>
            <p>Mitte Backbord</p>
            <input value={osadki[1]} onChange={(e) => updateOsadki(1, e)} type="number" min={100} max={316} step="0.1" />
          </div>
          <div className={styles.gridItem}>
            <p>Vorne Backbord</p>
            <input value={osadki[2]} onChange={(e) => updateOsadki(2, e)} type="number" min={100} max={316} step="0.1" />
          </div>
          <div className={styles.gridItem}>
            <p>Hinten Steuerbord</p>
            <input value={osadki[3]} onChange={(e) => updateOsadki(3, e)} type="number" min={100} max={316} step="0.1" />
          </div>
          <div className={styles.gridItem}>
            <p>Mitte Steuerbord</p>
            <input value={osadki[4]} onChange={(e) => updateOsadki(4, e)} type="number" min={100} max={316} step="0.1" />
          </div>
          <div className={styles.gridItem}>
            <p>Vorne Steuerbord</p>
            <input value={osadki[5]} onChange={(e) => updateOsadki(5, e)} type="number" min={100} max={316} step="0.1" />
          </div>
        </div>

        <button className={styles.button} onClick={handleCalculate}>Berechnen</button>

        <div className={styles.result}>
          {avg !== null ? (
            <>
              <p>Durchschnittlicher Tiefgang: <strong>{avg.toFixed(2)}</strong> cm</p>
              <p>Verdrängung: <strong>{result}</strong> Tonnen</p>
            </>
          ) : (
            calculated && <p className={styles.warning}>Bitte alle 6 Werte eingeben (100–316 cm)</p>
          )}
        </div>
      </div>
    </div>
  );

  function updateOsadki(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const updated = [...osadki];
    updated[index] = e.target.value;
    setOsadki(updated);
    setCalculated(false);
  }
}
