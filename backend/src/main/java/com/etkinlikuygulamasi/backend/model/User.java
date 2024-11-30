package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String email;
    private String location;
    @Column(name = "areasofinterest")
    private String areasOfInterest;
    private String name;
    private String surname;
    @Column(name = "dateofbirth")
    private String dateOfBirth;
    private String gender;
    private String number;
    @Column(name = "profilephotopath")
    private String profilePhotoPath;
    private double locationlat; 
    private double locationlon;

    public User() {

    }

    public User(String username, String password, String email, String location, String areasOfInterest,
            String name, String surname, String dateOfBirth, String gender, String number,
            String profilePhotoPath) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.location = location;
        this.areasOfInterest = areasOfInterest;
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.number = number;
        this.profilePhotoPath = profilePhotoPath;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAreasOfInterest() {
        return this.areasOfInterest;
    }

    public void setAreasOfInterest(String areasOfInterest) {
        this.areasOfInterest = areasOfInterest;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return this.surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNumber() {
        return this.number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getProfilePhotoPath() {
        return this.profilePhotoPath;
    }

    public void setProfilePhotoPath(String profilePhotoPath) {
        this.profilePhotoPath = profilePhotoPath;
    }

    public double getLocationlat() {
        return locationlat;
    }

    public double getLocationlon() {
        return locationlon;
    }

    public void setLocationlat(double locationlat) {
        this.locationlat = locationlat;
    }

    public void setLocationlon(double locationlon) {
        this.locationlon = locationlon;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", areasOfInterest='" + areasOfInterest + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", gender='" + gender + '\'' +
                ", number='" + number + '\'' +
                ", profilePhotoPath='" + profilePhotoPath + '\'' +
                '}';
    }

}
