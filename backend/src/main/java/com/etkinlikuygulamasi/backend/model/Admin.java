package com.etkinlikuygulamasi.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    private int adminID;

    @Column(name = "adminname")
    private String adminName;
    @Column(name = "adminpassword")
    private String adminPassword;
    @Column(name = "adminemail")
    private String adminEmail;

    public int getAdminID() {
        return this.adminID;
    }

    public String getAdminName() {
        return this.adminName;
    }

    public String getAdminPassword() {
        return this.adminPassword;
    }

    public String getAdminEmail() {
        return this.adminEmail;
    }

    public void setAdminID(int adminID) {
        this.adminID = adminID;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String toString() {
        return "Admin{" +
               "adminID=" + adminID +
               ", adminName='" + adminName + '\'' +
               ", adminPassword='" + adminPassword + '\'' +
               ", adminEmail='" + adminEmail + '\'' +
               '}';
    }

}
