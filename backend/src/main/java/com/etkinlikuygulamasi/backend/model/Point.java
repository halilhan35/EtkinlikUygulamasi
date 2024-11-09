package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "point")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;
    private int points;
    private String earnedDate;

    public Point() {

    }

    public Point(int userID, int points, String earnedDate) {
        this.userID = userID;
        this.points = points;
        this.earnedDate = earnedDate;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getEarnedDate() {
        return this.earnedDate;
    }

    public void setEarnedDate(String earnedDate) {
        this.earnedDate = earnedDate;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "Point{" +
                "userID=" + userID +
                ", points=" + points +
                ", earnedDate='" + earnedDate + '\'' +
                '}';
    }

}
