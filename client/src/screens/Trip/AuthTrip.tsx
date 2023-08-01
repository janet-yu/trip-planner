import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import styled from 'styled-components';
import { device } from '../../utils/mediaQueries';
import useUseLoadScript from '../../hooks/useUseLoadScript';
import Navigation from '../../components/Navigation';
import PlaceCard from '../../components/PlaceCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddLodgingModal from './AddLodgingModal';
import axios from 'axios';
import AddActivityModal from './AddActivityModal';
import Button from '../../components/Button';
import SaveTripCodeModal from './SaveTripCodeModal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { faEdit, faLocationDot, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Box from '../../components/Box';
import EditActivityModal from './EditActivityModal';
import Map from './Map';

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
  position: relative;

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
  @media ${device.laptop} {
    display: flex;
  }
`;

const TripDetailsContainer = styled.div`
  flex: 1;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 80px 36px 36px 36px;
  position: relative;
  z-index: 1;
`;

const SectionsContainer = styled.div`
  width: 85%;
  max-width: 680px;
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
  SAVE_TRIP,
  EDIT_ACTIVITY
}

interface Trip {
  _id: string;
  lodging: any[];
  title: string;
  placeReferenceId: string;
  startDate: Date;
  endDate: Date;
}

const Trip = ({ tripId }: { tripId: string }) => {
  const [trip, setTrip] = useState<(Trip & Partial<google.maps.places.PlaceResult>) | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: any; lng: any }>({
    lat: 0,
    lng: 0
  });
  const [zoom, setMapZoom] = useState(12);
  const [lodging, setLodging] = useState([]);
  const [itinerary, setItinerary] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isLoaded, loadError } = useUseLoadScript();
  const [modalOpen, setModalOpen] = useState<{
    open: boolean;
    modalForm: ModalForm;
    metadata?: any;
  }>({
    open: false,
    modalForm: 0
  });
  const axiosPrivate = useAxiosPrivate();

  const handleRemoveLodging = async (lodgeId: string) => {
    const request = {
      op: 'remove',
      field: 'lodging',
      value: {
        id: lodgeId
      }
    };

    const updated = await axios.patch(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, request);

    setTrip(updated.data.data.trip);
  };

  const handleRemoveItineraryActivity = async (activityId: string) => {
    const request = {
      op: 'remove',
      field: 'itinerary',
      value: {
        id: activityId
      }
    };

    const updated = await axios.patch(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, request);

    setTrip(updated.data.data.trip);
  };

  useEffect(() => {
    const fetchTrip = async () => {
      if (tripId) {
        const { data } = await axiosPrivate.get(`/trips/${tripId}` as string);

        setTrip(data.data.trip);
        setSelectedDate(new Date(data.data.trip.startDate));
      }
    };

    fetchTrip();
  }, []);

  useEffect(() => {
    if (trip && trip.geometry) {
      setMapCenter({
        lat: trip.geometry?.location?.lat,
        lng: trip.geometry?.location?.lng
      });
    }
  }, [trip?._id]);

  useEffect(() => {
    const getLodging = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips/${tripId}/lodging`);

      setLodging(response.data.data.lodging);
    };

    const getItinerary = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/trips/${tripId}/itinerary`
      );

      setItinerary(response.data.data.itinerary);
    };

    getLodging();
    getItinerary();
  }, [trip]);

  const handleItineraryChange = async (newItinerary: any) => {
    const mappedItinerary = newItinerary.map((activity: any) => ({
      referenceId: activity.details.place_id,
      date: new Date()
    }));

    const request = {
      op: 'replace',
      field: 'itinerary',
      value: mappedItinerary
    };

    await axios.patch(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, request);
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
      metadata: {},
      modalForm: 0
    });
  };

  const renderModal = (modalForm: ModalForm, metadata?: any) => {
    switch (modalForm) {
      case ModalForm.ADD_LODGING:
        return (
          <AddLodgingModal setModalClose={handleModalClose} tripId={trip._id} setTrip={setTrip} />
        );
      case ModalForm.ADD_ACTIVITY:
        return (
          <AddActivityModal
            setModalClose={handleModalClose}
            tripId={trip._id}
            setTrip={setTrip}
            selectedDate={selectedDate}
          />
        );
      case ModalForm.SAVE_TRIP:
        return <SaveTripCodeModal setModalClose={handleModalClose} tripId={trip._id} />;
      case ModalForm.EDIT_ACTIVITY:
        return (
          <EditActivityModal
            setTrip={setTrip}
            setModalClose={handleModalClose}
            tripId={trip._id}
            activity={(metadata as { activity: any }).activity}
          />
        );
    }
  };

  const generateDateOptions = () => {
    const numDays = moment(trip?.endDate).diff(moment(trip?.startDate), 'days');
    const dates = [];

    for (let i = 0; i < numDays; i++) {
      const option = {
        value: moment(trip?.startDate)
          .add(i, 'days')
          .toDate(),
        label: moment(trip.startDate).add(i, 'days').format('MMM Do YYYY')
      };

      dates.push(option);
    }

    return dates;
  };

  const onDateSelect = (option: any) => {
    setSelectedDate(option.value);
  };

  const renderLodging = () => {
    const selectedDateMoment = moment(selectedDate);

    const filteredLodging = lodging.filter(
      (place: { referenceId: string; checkinDate: Date; checkoutDate: Date }) => {
        return selectedDateMoment.isBetween(
          moment(place.checkinDate),
          moment(place.checkoutDate),
          'day',
          '[]'
        );
      }
    );

    return filteredLodging.map((place: any) => (
      <PlaceCard
        key={place.details.place_id}
        title={place.details.name}
        subtitle={place.details.formatted_address}
        subtitleLink={place.details.url}
        description={place.details.editorial_summary?.overview}
        mBottom={16}
        actionButtons={[
          {
            onClick: () => handleRemoveLodging(place._id),
            icon: faTrashAlt
          },
          {
            onClick: () => {
              setMapCenter({
                lat: place.details.geometry.location.lat,
                lng: place.details.geometry.location.lng
              });
              setMapZoom(15);
            },
            icon: faLocationDot
          }
        ]}
      />
    ));
  };

  const renderItinerary = () => {
    return itinerary
      .filter((activity: any) => {
        return moment(activity.date).isSame(moment(selectedDate), 'day');
      })
      .map((activity: any, idx: any) => {
        console.log({ activity });
        return (
          <Draggable draggableId={`draggable-${idx}`} index={idx} key={idx}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                {/* <button {...provided.dragHandleProps}>Drag</button> */}
                <PlaceCard
                  key={activity.details.place_id}
                  title={activity.details.name}
                  subtitle={activity.details.formatted_address}
                  subtitleLink={activity.details.url}
                  description={activity.details.editorial_summary?.overview}
                  mBottom={16}
                  notes={activity.notes}
                  actionButtons={[
                    {
                      onClick: () => handleRemoveItineraryActivity(activity._id),
                      icon: faTrashAlt
                    },
                    {
                      onClick: () => {
                        setMapCenter({
                          lat: activity.details.geometry.location.lat,
                          lng: activity.details.geometry.location.lng
                        });
                        setMapZoom(15);
                      },
                      icon: faLocationDot
                    },
                    {
                      onClick: () => {
                        setModalOpen({
                          open: true,
                          modalForm: ModalForm.EDIT_ACTIVITY,
                          metadata: {
                            activity
                          }
                        });
                      },
                      icon: faEdit
                    }
                  ]}
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
      });
  };

  return (
    <div>
      <Header
        bgUrl={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${
          trip.photos && (trip.photos[0] as any).photo_reference
        }&key=AIzaSyCpTac3TkWVqlwesacX7YFbZfqOuXLVU8g`}>
        <Navigation variant="secondary" />
        <TripHeadingContainer>
          <TripDates>
            {`${moment(trip.startDate).format('L')} - ${moment(trip.endDate).format('L')}`}
          </TripDates>
          <TripHeading>{(trip as unknown as { title: string }).title}</TripHeading>
          <Button
            variant="secondary"
            bold
            onClick={() => {
              setModalOpen({
                open: true,
                modalForm: ModalForm.SAVE_TRIP
              });
            }}>
            Save Trip
          </Button>
        </TripHeadingContainer>
      </Header>
      <MainContentContainer>
        <TripDetailsContainer>
          <SectionsContainer>
            <Box mBottom={24}>
              <Select
                options={generateDateOptions()}
                defaultValue={generateDateOptions()[0]}
                onChange={onDateSelect}
              />
            </Box>
            <Section>
              <SectionTitle>Lodging</SectionTitle>
              {!!lodging.length && renderLodging()}
              <AddItemButton
                onClick={() => {
                  setModalOpen({
                    open: true,
                    modalForm: ModalForm.ADD_LODGING
                  });
                }}>
                + Add Lodging
              </AddItemButton>
            </Section>
            <Section>
              <SectionTitle>Itinerary</SectionTitle>
              <DragDropContext
                onDragEnd={(param) => {
                  const destIndex = param.destination?.index;
                  const sourceIndex = param.source.index;

                  if (destIndex !== undefined) {
                    const newItinerary = itinerary.slice(0);
                    newItinerary.splice(destIndex, 0, newItinerary.splice(sourceIndex, 1)[0]);
                    setItinerary(newItinerary);
                    handleItineraryChange(newItinerary);
                  }
                }}>
                <Droppable droppableId="droppable-1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {!!itinerary.length && renderItinerary()}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <AddItemButton
                onClick={() => {
                  setModalOpen({
                    open: true,
                    modalForm: ModalForm.ADD_ACTIVITY
                  });
                }}>
                + Add Activity
              </AddItemButton>
            </Section>
            <Section>
              <SectionTitle>People</SectionTitle>
              <AddItemButton>+ Add Person</AddItemButton>
            </Section>
          </SectionsContainer>
        </TripDetailsContainer>
        {itinerary?.length && lodging?.length && (
          <Map zoom={zoom} mapCenter={mapCenter} itinerary={itinerary} lodging={lodging} />
        )}
        {modalOpen.open && selectedDate && renderModal(modalOpen.modalForm, modalOpen.metadata)}
      </MainContentContainer>
    </div>
  );
};

export default Trip;
