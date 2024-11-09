package com.etkinlikuygulamasi.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etkinlikuygulamasi.backend.model.Admin;
import com.etkinlikuygulamasi.backend.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Admin login işlemi
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Admin authenticatedAdmin = adminService.authenticateAdmin(admin.getAdminName(), admin.getAdminPassword());

        if (authenticatedAdmin != null) {
            return ResponseEntity.ok(authenticatedAdmin);
        } else {
            return ResponseEntity.status(401).body("Invalid username/email or password.");
        }
    }
}
