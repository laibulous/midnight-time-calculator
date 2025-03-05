import React, { useState, useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

function CityInput() {
    const [city, setCity] = useState("");
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ["(cities)"], // Restrict suggestions to cities only
        },
    });

    // Debugging: Log the status and data
    console.log("API Status:", status);
    console.log("Suggestions Data:", data);

    // Load the Google Maps JavaScript API script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=[apiKeyHere]&libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleInputChange = (e) => {
        setValue(e.target.value); // Update the value as the user types
    };

    const handleSelect = ({ description }) => {
        setCity(description); // Update the city state with the selected city
        setValue(description, false); // Set the input value to the selected city
        clearSuggestions(); // Clear the suggestions
        console.log(`Selected city: ${description}`); // Log the selected city
    };

    return (
        <div>
            <label htmlFor="city">Enter your city:</label>
            <input
                id="city"
                type="text"
                value={value} // Bind the input value to the Places API value
                onChange={handleInputChange} // Update the value when typing
                disabled={!ready} // Disable input if API is not ready
                placeholder="Search for your city"
                style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
            {status === "OK" && (
                <ul
                    style={{
                        listStyle: "none",
                        padding: "0",
                        margin: "0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        maxHeight: "150px",
                        overflowY: "auto",
                        position: "absolute",
                        width: "100%",
                        backgroundColor: "#fff",
                        zIndex: 1000,
                    }}
                >
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect({ description })}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#f0f0f0";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#fff";
                            }}
                        >
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CityInput;
