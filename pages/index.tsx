import { useEffect, useState } from "react";
import { eicheTable } from "../utils/eicheTable";
import styles from "./index.module.css";

export default function LadungCalculator() {
  const [osadki, setOsadki] = useState(["", "", "", "", "", ""]);
  const [calculated, setCalculated] = useState(false);
  const [verlust, setVerlust] = useState("");

  // Загружаем значение verlust из localStorage при загрузке
  useEffect(() => {
    const saved = localStorage.getItem("verlust");
    if (saved) {
      setVerlust(saved);
    }
  }, []);

  // Сохраняем значение в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("verlust", verlust);
  }, [verlust]);

  const avgOsadka = () => {
    const nums = osadki.map((v) => parseFloat(v)).filter((n) => !isNaN(n) && n >= 65 && n <= 316);
    if (nums.length !== 6) return null;
    return nums.reduce((a, b) => a + b, 0) / 6;
  };

  const interpolate = (depth: number) => {
    const rounded = parseFloat(depth.toFixed(1));
    return eicheTable[rounded] ?? null;
  };

  const handleCalculate = () => setCalculated(true);
  const avg = calculated ? avgOsadka() : null;
  const result = avg !== null ? interpolate(avg) : null;
  const verlustNum = parseFloat(verlust);
  const netLoad = result !== null && !isNaN(verlustNum) ? (result - verlustNum).toFixed(2) : null;

  return (
    <div className={styles.container}>
      <img src="/reederei-logo.jpg" alt="Logo" className={styles.logo} />

      <div className={styles.card}>
        <h1 className={styles.title}>Ladungsrechner für Michaela-Back</h1>
        <p className={styles.subtitle}>Geben Sie die sechs Tiefgänge ein:</p>

        <div className={styles.gridWrapper}>
          {[
            "Hinten Backbord", "Mitte Backbord", "Vorne Backbord",
            "Hinten Steuerbord", "Mitte Steuerbord", "Vorne Steuerbord"
          ].map((label, i) => (
            <div className={styles.gridItem} key={i}>
              <p>{label}</p>
              <input
                value={osadki[i]}
                onChange={(e) => updateOsadki(i, e)}
                type="number"
                min={65.1}
                max={316}
                step="0.1"
              />
            </div>
          ))}
        </div>

        <div className={styles.verlustField}>
          <p>Verluste (z.B. Wasser, Ballast, etc.) in Tonnen:</p>
          <input
            type="number"
            placeholder="z. B. 120.5"
            value={verlust}
            onChange={(e) => setVerlust(e.target.value)}
            step="0.01"
          />
        </div>

        <button className={styles.button} onClick={handleCalculate}>Berechnen</button>

        <div className={styles.result}>
          {avg !== null && result !== null ? (
            <>
              <p>Durchschnittlicher Tiefgang: <strong>{avg.toFixed(2)}</strong> cm</p>
              <p>Verdrängung: <strong>{result.toFixed(2)}</strong> Tonnen</p>
              {netLoad !== null && (
                <p>Aktuelle Ladung (nach Abzug von Verlusten): <strong>{netLoad}</strong> Tonnen</p>
              )}
            </>
          ) : (
            calculated && <p className={styles.warning}>Bitte alle 6 Werte eingeben (65.1–316 cm)</p>
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
