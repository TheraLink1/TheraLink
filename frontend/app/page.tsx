"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [mode, setMode] = useState(""); // stationary or online
  const [keyword, setKeyword] = useState(""); // specialization or doctor name
  const [location, setLocation] = useState(""); // default location
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to /view with query parameters
    const params = new URLSearchParams({
      mode,
      keyword,
      location,
    }).toString();
    router.push(`/view?${params}`);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#00bfa5",
          color: "#fff",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            Znajdź lekarza i umów wizytę
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            Szukaj wśród 146 000 lekarzy.
          </p>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => setMode("stationary")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: mode === "stationary" ? "#fff" : "#00bfa5",
                color: mode === "stationary" ? "#00bfa5" : "#fff",
                border: "2px solid #fff",
                borderRadius: "5px",
                fontWeight: mode === "stationary" ? "bold" : "normal",
              }}
            >
              W gabinecie
            </button>
            <button
              type="button"
              onClick={() => setMode("online")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: mode === "online" ? "#fff" : "#00bfa5",
                color: mode === "online" ? "#00bfa5" : "#fff",
                border: "2px solid #fff",
                borderRadius: "5px",
                fontWeight: mode === "online" ? "bold" : "normal",
              }}
            >
              Online
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
          >
            <input
              type="text"
              placeholder="specjalizacja lub nazwisko"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            />
            <input
              type="text"
              placeholder="Warszawa"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#00bfa5",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Szukaj
            </button>
          </form>
        </div>
      </div>

      {/* TheraLink Explanation Section */}
      <div style={{ padding: "40px 20px", backgroundColor: "#f4f4f4" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Tile 1 */}
          <div
            style={{
              flex: "1 1 calc(33% - 20px)",
              backgroundColor: "#e8f5f4",
              color: "#2b6369",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #2b6369", // Border color
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#2b6369" }}>
              Czym jest TheraLink?
            </h3>
            <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#2b6369" }}>
              TheraLink to nowoczesna platforma, która pomaga w łatwy sposób znaleźć specjalistów
              medycznych online lub stacjonarnie. Dzięki prostemu interfejsowi, możesz umówić
              wizytę w kilku krokach.
            </p>
          </div>

          {/* Tile 2 */}
          <div
            style={{
              flex: "1 1 calc(33% - 20px)",
              backgroundColor: "#e8f5f4",
              color: "#2b6369",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #2b6369", // Border color
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#2b6369" }}>
              Jak działamy?
            </h3>
            <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#2b6369" }}>
              Wyszukuj lekarzy według specjalizacji, lokalizacji lub nazwiska. Filtruj wyniki
              po trybie wizyty – online lub stacjonarnie. Przeglądaj profile, sprawdzaj oceny i
              umawiaj wizyty z wybranym lekarzem.
            </p>
          </div>

          {/* Tile 3 */}
          <div
            style={{
              flex: "1 1 calc(33% - 20px)",
              backgroundColor: "#e8f5f4",
              color: "#2b6369",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #2b6369", // Border color
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#2b6369" }}>
              Dlaczego akurat my?
            </h3>
            <p style={{ fontSize: "1rem", marginBottom: "20px", color: "#2b6369" }}>
              TheraLink to szybka, wygodna i bezpieczna platforma do umawiania wizyt. Zaufaj
              naszej bazie ekspertów medycznych i skorzystaj z usługi, która zaoszczędzi Ci
              czas i zapewni dostęp do najlepszych specjalistów.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
