package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "eventname")
    private String eventName;
    @Column(name = "eventdescription")
    private String eventDescription;
    @Column(name = "eventdate")
    private String eventDate;
    @Column(name = "eventtime")
    private String eventTime;
    @Column(name = "eventduration")
    private int eventDuration;
    @Column(name = "eventlocation")
    private String eventLocation;
    @Column(name = "eventcategory")
    private String eventCategory;
    private double eventlocationlat;
    private double eventlocationlon;

    public Event() {

    }

    public Event(int id, String eventName, String eventDescription,
            String eventDate, String eventTime, int eventDuration,
            String eventLocation, String eventCategory) {
        this.id = id;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventDuration = eventDuration;
        this.eventLocation = eventLocation;
        this.eventCategory = eventCategory;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEventName() {
        return this.eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return this.eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public String getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventTime() {
        return this.eventTime;
    }

    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }

    public int getEventDuration() {
        return this.eventDuration;
    }

    public void setEventDuration(int eventDuration) {
        this.eventDuration = eventDuration;
    }

    public String getEventLocation() {
        return this.eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getEventCategory() {
        return this.eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public double getEventlocationlat() {
        return eventlocationlat;
    }

    public void setEventlocationlat(double eventlocationlat) {
        this.eventlocationlat = eventlocationlat;
    }

    public double getEventlocationlon() {
        return eventlocationlon;
    }

    public void setEventlocationlon(double eventlocationlon) {
        this.eventlocationlon = eventlocationlon;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", eventDescription='" + eventDescription + '\'' +
                ", eventDate='" + eventDate + '\'' +
                ", eventTime='" + eventTime + '\'' +
                ", eventDuration=" + eventDuration +
                ", eventLocation='" + eventLocation + '\'' +
                ", eventCategory='" + eventCategory + '\'' +
                '}';
    }

}
