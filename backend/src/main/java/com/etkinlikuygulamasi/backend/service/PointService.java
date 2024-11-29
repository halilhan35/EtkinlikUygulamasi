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
        newPoint.setPoints(10); // Etkinliğe katılım için 10 puan
        newPoint.setEarnedDate(LocalDateTime.now().toString()); // Şu anki tarih

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

}
