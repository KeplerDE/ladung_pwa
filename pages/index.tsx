import { useState } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { eicheTable } from "../utils/eicheTable";

export default function LadungCalculator() {
  const [osadki, setOsadki] = useState(["", "", "", "", "", ""]);
  const [calculated, setCalculated] = useState(false);

  const avgOsadka = () => {
    const nums = osadki.map((v) => parseFloat(v)).filter((n) => !isNaN(n) && n >= 100 && n <= 316);
    if (nums.length !== 6) return null;
    return nums.reduce((a, b) => a + b, 0) / 6;
  };

  const interpolate = (depth) => {
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

  const handleCalculate = () => {
    setCalculated(true);
  };

  const avg = calculated ? avgOsadka() : null;
  const result = avg !== null ? interpolate(avg).toFixed(2) : null;

  const labels = [
    "Hinten Backbord", "Hinten Steuerbord",
    "Mitte Backbord", "Mitte Steuerbord",
    "Vorne Backbord", "Vorne Steuerbord"
  ];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-semibold">Ladungsrechner für Michaela-Back</h1>
          <p className="text-sm text-muted">Geben Sie die sechs Tiefgänge ein:</p>

          {/* Улучшенная схема судна */}
          <div className="flex justify-center mb-4">
            <svg width="260" height="180" viewBox="0 0 260 180">
              <rect x="30" y="20" width="200" height="140" rx="30" ry="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <circle cx="50" cy="40" r="5" fill="#0ea5e9" />
              <circle cx="210" cy="40" r="5" fill="#0ea5e9" />
              <circle cx="50" cy="90" r="5" fill="#38bdf8" />
              <circle cx="210" cy="90" r="5" fill="#38bdf8" />
              <circle cx="50" cy="140" r="5" fill="#0ea5e9" />
              <circle cx="210" cy="140" r="5" fill="#0ea5e9" />
              <text x="30" y="35" fontSize="10">Vorne BB</text>
              <text x="185" y="35" fontSize="10">Vorne SB</text>
              <text x="30" y="85" fontSize="10">Mitte BB</text>
              <text x="185" y="85" fontSize="10">Mitte SB</text>
              <text x="30" y="135" fontSize="10">Hinten BB</text>
              <text x="185" y="135" fontSize="10">Hinten SB</text>
            </svg>
          </div>

          {/* Поля ввода */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium">
            {labels.map((label, i) => (
              <div key={i}>
                <p>{label}</p>
                <Input
                  type="number"
                  min={100}
                  max={316}
                  value={osadki[i]}
                  onChange={(e) => {
                    const updated = [...osadki];
                    updated[i] = e.target.value;
                    setOsadki(updated);
                    setCalculated(false);
                  }}
                  step="0.1"
                  placeholder="cm"
                />
              </div>
            ))}
          </div>

          {/* Кнопка посчитать */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl shadow"
              onClick={handleCalculate}
            >
              Berechnen
            </button>
          </div>

          {/* Результат */}
          <div className="text-md mt-4">
            {avg !== null && (
              <>
                <p>Durchschnittlicher Tiefgang: <strong>{avg.toFixed(2)}</strong> cm</p>
                <p>Verdrängung: <strong>{result}</strong> Tonnen</p>
              </>
            )}
            {calculated && avg === null && <p className="text-sm text-muted">Bitte alle 6 Werte eingeben (100–316 cm)</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}