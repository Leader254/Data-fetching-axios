import { useState } from "react";
import axios from "axios";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(false);
    const [countryAvailable, setCountryAvailable] = useState(true);

    const handleSearch = async () => {
        setLoading(true);
        setCountryAvailable(true);
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            setLoading(false);
            if (response.data && response.data.message === "Not Found") {
                setCountry(null);
                setCountryAvailable(false);
            } else if (response.data && response.data.length > 0) {
                setCountry(response.data[0]);
            }
        } catch (error) {
            setLoading(false);
            setCountry(null);
            setCountryAvailable(false);
        }
    }

    return (
        <div className="search-container">
            <h1 className="heading">Countries Information</h1>
            <div className="input-button-container">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {!countryAvailable && (
                <p>The country name you provided is not available.</p>
            )}
            {country && !loading && (
                <div className="country-container">
                    <p>
                        <span>Capital</span>: {country.capital}
                    </p>
                    <p>
                        <span>Population</span>: {country.population}
                    </p>
                    <p>
                        <span>Currency</span>: {country.currencies && Object.values(country.currencies).map(currency => currency.symbol).join(", ")}
                    </p>
                    <p>
                        <span>Continent</span>: {country.continents}
                    </p>
                </div>
            )}

            {loading && <h2 className="loading">Loading...</h2>}
        </div>
    );
}

export default Search;
