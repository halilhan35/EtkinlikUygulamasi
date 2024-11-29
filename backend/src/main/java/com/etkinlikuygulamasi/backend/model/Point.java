package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
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
    private int pointID;
    @Column(name = "userid")
    private int userID;
    @Column(name = "points")
    private int points;
    @Column(name = "date")
    private String earnedDate;

    public Point() {

    }

    public Point(int pointID, int userID, int points, String earnedDate) {
        this.pointID = pointID;
        this.userID = userID;
        this.points = points;
        this.earnedDate = earnedDate;
    }

    public int getPointID() {
        return pointID;
    }

    public void setPointID(int pointID) {
        this.pointID = pointID;
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
