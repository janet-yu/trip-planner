import React, { useEffect, useState } from 'react';
import moment from 'moment';
import useUseLoadScript from '../../hooks/useUseLoadScript';
import Navigation from '../../components/Navigation';
import styled from 'styled-components';
import PlaceCard from '../../components/PlaceCard';
import { GoogleMap } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddLodgingModal from './AddLodgingModal';
import axios from 'axios';
import AddActivityModal from './AddActivityModal';

const Header = styled.header<{ bgUrl?: string }>`
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #fff;
  min-height: 40vh;
  position: relative;

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

const TripHeadingContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const TripHeading = styled.h1`
  font-size: 4rem;
  margin: 24px 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;

  &::after,
  &::before {
    height: 5px;
    content: '';
    display: block;
    background: #fff;
    width: 100%;
    position: absolute;
    top: 50%;
  }

  &::after {
    left: 110%;
  }

  &::before {
    right: 110%;
  }
`;

const TripDates = styled.p`
  font-weight: bold;
`;

const MainContentContainer = styled.main`
  display: flex;
`;

const TripDetailsContainer = styled.div`
  flex: 1;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 80px 36px 36px 36px;
  position: relative;
  z-index: 1;
`;

const SectionsContainer = styled.div`
  width: 680px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Section = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 32px;
`;

const MapContainer = styled.div`
  flex: 1;
`;

const AddItemButton = styled.button`
  margin-top: 16px;
  color: ${(props) => props.theme.colors.grey['500']};
  font-size: 0.875rem;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary['400']};
  }
`;

enum ModalForm {
  ADD_LODGING,
  ADD_ACTIVITY,
}

interface Trip {
  _id: string;
  lodging: any[];
  title: string;
  placeReferenceId: string;
  startDate: Date;
  endDate: Date;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Trip = () => {
  const { id } = useParams();
  const [trip, setTrip] =
    useState<(Trip & Partial<google.maps.places.PlaceResult>) | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: any; lng: any }>({
    lat: 0,
    lng: 0,
  });
  const [lodging, setLodging] = useState([]);
  const [itinerary, setItinerary] = useState<any>([]);
  const { isLoaded, loadError } = useUseLoadScript();
  const [modalOpen, setModalOpen] = useState({
    open: false,
    modalForm: 0,
  });

  console.log({ trip });

  const handleRemoveLodging = async (lodgeId: string) => {
    const request = {
      op: 'remove',
      field: 'lodging',
      value: {
        id: lodgeId,
      },
    };

    const updated = await axios.patch(
      `${process.env.REACT_APP_API_URL}/trips/${id}`,
      request
    );

    setTrip(updated.data);
  };

  const handleRemoveItineraryActivity = async (activityId: string) => {
    const request = {
      op: 'remove',
      field: 'itinerary',
      value: {
        id: activityId,
      },
    };

    const updated = await axios.patch(
      `${process.env.REACT_APP_API_URL}/trips/${id}`,
      request
    );

    setTrip(updated.data);
  };

  useEffect(() => {
    const fetchTrip = async () => {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/trips/${id}` as string
        );

        setTrip(res.data);
      }
    };

    fetchTrip();
  }, []);

  useEffect(() => {
    if (trip && trip.geometry) {
      setMapCenter({
        lat: trip.geometry?.location?.lat,
        lng: trip.geometry?.location?.lng,
      });
    }
  }, [trip?._id]);

  useEffect(() => {
    const getLodging = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/trips/${id}/lodging`
      );

      setLodging(response.data.lodging);
    };

    const getItinerary = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/trips/${id}/itinerary`
      );

      setItinerary(response.data.itinerary);
    };

    getLodging();
    getItinerary();
  }, [trip]);

  const handleItineraryChange = async (newItinerary: any) => {
    const mappedItinerary = newItinerary.map((activity: any) => ({
      referenceId: activity.details.place_id,
      date: new Date(),
    }));

    const request = {
      op: 'replace',
      field: 'itinerary',
      value: mappedItinerary,
    };

    await axios.patch(`${process.env.REACT_APP_API_URL}/trips/${id}`, request);
  };

  if (loadError) {
    return <p>ERROR</p>;
  }

  if (!isLoaded || !trip) {
    return <p>LOADING</p>;
  }

  const handleModalClose = () => {
    setModalOpen({
      open: false,
      modalForm: 0,
    });
  };

  const renderModal = (modalForm: ModalForm) => {
    switch (modalForm) {
      case ModalForm.ADD_LODGING:
        return (
          <AddLodgingModal
            setModalClose={handleModalClose}
            tripId={(trip as unknown as { _id: string })._id}
            setTrip={setTrip}
          />
        );
      case ModalForm.ADD_ACTIVITY:
        return (
          <AddActivityModal
            setModalClose={handleModalClose}
            tripId={(trip as unknown as { _id: string })._id}
            setTrip={setTrip}
          />
        );
    }
  };

  return (
    <div>
      <Header bgUrl="https://vastphotos.com/files/uploads/photos/10588/chicago-skyline-photo-l.jpg?v=20220712073521">
        <Navigation variant="secondary" />
        <TripHeadingContainer>
          <TripDates>
            {`${moment(trip.startDate).calendar()} - ${moment(
              trip.endDate
            ).calendar()}`}
          </TripDates>
          <TripHeading>
            {(trip as unknown as { title: string }).title}
          </TripHeading>
        </TripHeadingContainer>
      </Header>
      <MainContentContainer>
        <TripDetailsContainer>
          <SectionsContainer>
            <Section>
              <SectionTitle>Lodging</SectionTitle>
              {!!lodging.length &&
                lodging.map((place: any) => (
                  <PlaceCard
                    key={place.details.place_id}
                    title={place.details.name}
                    subtitle={place.details.formatted_address}
                    description={place.details.editorial_summary?.overview}
                    mBottom={16}
                    onRemove={() => handleRemoveLodging(place.id)}
                  />
                ))}
              <AddItemButton
                onClick={() => {
                  setModalOpen({
                    open: true,
                    modalForm: ModalForm.ADD_LODGING,
                  });
                }}
              >
                + Add Lodging
              </AddItemButton>
            </Section>
            <Section>
              <SectionTitle>Itinerary</SectionTitle>
              {/* @ts-ignore */}
              <DragDropContext
                onDragEnd={(param) => {
                  console.log({ param });
                  const sourceIndex = param.source.index;
                  const destIndex = param.destination?.index;

                  if (destIndex !== undefined) {
                    const newItinerary = itinerary.slice(0);
                    newItinerary.splice(
                      destIndex,
                      0,
                      newItinerary.splice(sourceIndex, 1)[0]
                    );
                    setItinerary(newItinerary);
                    handleItineraryChange(newItinerary);
                  }
                }}
              >
                <Droppable droppableId="droppable-1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {!!itinerary.length &&
                        itinerary.map((activity: any, idx: any) => {
                          return (
                            <Draggable
                              draggableId={`draggable-${idx}`}
                              index={idx}
                              key={idx}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {/* <button {...provided.dragHandleProps}>Drag</button> */}
                                  <PlaceCard
                                    key={activity.details.place_id}
                                    onRemove={() =>
                                      handleRemoveItineraryActivity(activity.id)
                                    }
                                    title={activity.details.name}
                                    subtitle={
                                      activity.details.formatted_address
                                    }
                                    description={
                                      activity.details.editorial_summary
                                        ?.overview
                                    }
                                    mBottom={16}
                                    img={
                                      activity.details.photos?.length
                                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${activity.details.photos[0].photo_reference}&key=AIzaSyCpTac3TkWVqlwesacX7YFbZfqOuXLVU8g`
                                        : 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Cloud_Gate_%28The_Bean%29_from_east%27.jpg/340px-Cloud_Gate_%28The_Bean%29_from_east%27.jpg'
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <AddItemButton
                onClick={() => {
                  setModalOpen({
                    open: true,
                    modalForm: ModalForm.ADD_ACTIVITY,
                  });
                }}
              >
                + Add Activity
              </AddItemButton>
            </Section>
            <Section>
              <SectionTitle>People</SectionTitle>

              <AddItemButton>+ Add Person</AddItemButton>
            </Section>
          </SectionsContainer>
        </TripDetailsContainer>
        <MapContainer>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={12}
          ></GoogleMap>
        </MapContainer>

        {modalOpen.open && renderModal(modalOpen.modalForm)}
      </MainContentContainer>
    </div>
  );
};

export default Trip;
