package com.etkinlikuygulamasi.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByAdminNameAndAdminPassword(String adminName, String adminPassword);
    Admin findByAdminEmailAndAdminPassword(String adminEmail, String adminPassword);
}
