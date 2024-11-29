package com.etkinlikuygulamasi.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etkinlikuygulamasi.backend.service.PointService;

@RestController
@RequestMapping("/points")
@CrossOrigin(origins = "http://localhost:5173")
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping("/add")
    public String addPoints(@RequestBody int userId) {
        pointService.addPointsForUser(userId);
        return "Points added successfully!";
    }

    @PostMapping("/register")
    public String addRegisterPoints(@RequestBody int userId){
        pointService.addPointsForRegister(userId);
        return "Points added successfully!";
    }

    @PostMapping("/addevent")
    public String addAddEventPoints(@RequestBody int userId) {
        pointService.addPointsForAddEvent(userId);
        return "Points added succesfully!";
    }

    @GetMapping("/user/{userID}/total")
    public int getTotalPointsByUserID(@PathVariable int userID) {
        return pointService.calculateTotalPointsByUserID(userID);
    }

    @DeleteMapping("/user/{userId}")
    public String deletePointsByUserId(@PathVariable int userId) {
        pointService.deletePointsByUserId(userId);
        return "Points for user ID " + userId + " deleted successfully!";
    }

}
