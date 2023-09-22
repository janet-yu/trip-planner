import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import Box from '../../../components/Box';
import { device } from '../../../utils/mediaQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPersonWalking } from '@fortawesome/free-solid-svg-icons';

type Props = {
  mapCenter: {
    lat: number;
    lng: number;
  };
  zoom: number;
  itinerary?: any[];
  lodging?: any[];
};

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  display: none;

  @media ${device.laptop} {
    display: block;
  }
`;

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const RouteContainer = styled.div`
  background: white;
  border-radius: 8px;
  margin-top: 10px;
  position: absolute;
  z-index: 1;
  top: 84px;
  margin-left: 0px;
  box-shadow: 2px 2px 5px #aaa;
`;

const RouteTab = styled.button`
  background: white;
  border: none;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 0px 8px 8px 0px;

  &:hover {
    font-weight: bold;
  }
`;

const RouteDetails = styled(Box)`
  min-width: 150px;
`;

const Map = ({ mapCenter, zoom, itinerary = [], lodging = [] }: Props) => {
  const [originValue, setOriginValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  const [transportationMode, setTransportationMode] = useState('');
  const [directions, setDirections] = useState<any>(null);
  const [directionsToggle, setDirectionsToggle] = useState(false);
  const [noDirectionsResult, setNoDirectionsResult] = useState(false);

  const handleOriginSelect = (option: any) => {
    setOriginValue(option);
  };

  const handleDestinationSelect = (option: any) => {
    setDestinationValue(option);
  };

  const handleOnTransportationModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransportationMode(event.target.value);
  };
  const generatePlaceOptions = () => {
    const options = [...itinerary, ...lodging].map((place) => {
      return {
        value: place,
        label: place.details.name
      };
    });
    return options;
  };

  const fetchDirections = () => {
    if (!originValue || !destinationValue) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        origin: originValue.value.details.geometry.location,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        destination: destinationValue.value.details.geometry.location,
        travelMode: transportationMode as google.maps.TravelMode
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          setNoDirectionsResult(false);
        }

        if (status === 'ZERO_RESULTS') {
          setNoDirectionsResult(true);
        }
      }
    );
  };

  useEffect(() => {
    fetchDirections();
  }, [originValue, destinationValue, transportationMode]);

  return (
    <MapContainer>
      <RouteContainer>
        <RouteTab
          onClick={() => {
            setDirectionsToggle(!directionsToggle);
          }}>
          Route
        </RouteTab>
        {directionsToggle && (
          <RouteDetails p={12}>
            <Box>
              <Select
                options={generatePlaceOptions()}
                onChange={handleOriginSelect}
                placeholder="Origin"
              />
            </Box>
            <Box mTop={12}>
              <Select
                options={generatePlaceOptions()}
                onChange={handleDestinationSelect}
                placeholder="Destination"
              />
            </Box>
            <Box mTop={12}>
              <fieldset>
                <label htmlFor="driving" className="sr-only">
                  Driving
                </label>
                <input
                  id="driving"
                  type="radio"
                  name="transportation_mode"
                  value={google.maps.TravelMode.DRIVING}
                  onChange={handleOnTransportationModeChange}
                />
                <FontAwesomeIcon icon={faCar} />
                <label htmlFor="walking" className="sr-only">
                  Walking
                </label>
                <input
                  id="walking"
                  type="radio"
                  name="transportation_mode"
                  value={google.maps.TravelMode.WALKING}
                  onChange={handleOnTransportationModeChange}
                />
                <FontAwesomeIcon icon={faPersonWalking} />
              </fieldset>
            </Box>
            {directions && !noDirectionsResult && (
              <Box mTop={12}>
                <Box>
                  <p>
                    <strong>Distance</strong>
                  </p>
                  <p>{directions.routes[0].legs[0].distance?.text}</p>
                </Box>
                <Box mTop={12}>
                  <p>Duration</p>
                  <p>{directions.routes[0].legs[0].duration?.text}</p>
                </Box>
              </Box>
            )}
            {noDirectionsResult && (
              <Box mTop={12}>
                <p>Route could not be calculated.</p>
              </Box>
            )}
          </RouteDetails>
        )}
      </RouteContainer>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={zoom}>
        <Marker position={mapCenter} />
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#1976D2',
                strokeWeight: 5
              }
            }}
          />
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
