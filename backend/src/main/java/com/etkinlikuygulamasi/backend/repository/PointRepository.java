package com.etkinlikuygulamasi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Point;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer> {
    List<Point> findByUserID(int userID);
}
