package com.etkinlikuygulamasi.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Point;
import com.etkinlikuygulamasi.backend.repository.PointRepository;

@Service
public class PointService {
    @Autowired
    private PointRepository pointRepository;

    public void addPointsForUser(int userId) {
        Point newPoint = new Point();
        newPoint.setUserID(userId);
        newPoint.setPoints(10);
        newPoint.setEarnedDate(LocalDateTime.now().toString());

        pointRepository.save(newPoint);
    }

    public void addPointsForRegister(int userId){
        Point newPoint = new Point();
        newPoint.setUserID(userId);
        newPoint.setPoints(20);
        newPoint.setEarnedDate(LocalDateTime.now().toString());

        pointRepository.save(newPoint);
    }

    public void addPointsForAddEvent(int userId){
        Point newPoint = new Point();
        newPoint.setUserID(userId);
        newPoint.setPoints(15);
        newPoint.setEarnedDate(LocalDateTime.now().toString());

        pointRepository.save(newPoint);
    }

    public int calculateTotalPointsByUserID(int userID) {
        List<Point> points = pointRepository.findByUserID(userID);
        return points.stream().mapToInt(Point::getPoints).sum();
    }

    public List<Point> getPointsByUserID(int userID) {
        return pointRepository.findByUserID(userID);
    }

    public void deletePointsByUserId(int userId) {
        List<Point> points = pointRepository.findByUserID(userId);
        if (!points.isEmpty()) {
            pointRepository.deleteAll(points);
            System.out.println("Points for user ID " + userId + " have been deleted.");
        } else {
            System.out.println("No points found for user ID " + userId);
        }
    }

}
