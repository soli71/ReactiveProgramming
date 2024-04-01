import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast}>
                        <td>{forecast}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
       
        const fetchData = async () => {
            try {
                const response = await fetch('weatherforecast');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let receivedData = '';

                const processStream = async () => {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        receivedData += decoder.decode(value);
                        const items = receivedData.split('\n');

                        setForecasts(items);
                        console.log(forecasts);
                        receivedData = items[items.length - 1];
                    }
                };

                processStream();
                
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //setForecasts(data);
    }
}

export default App;