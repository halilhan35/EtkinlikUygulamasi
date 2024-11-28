package com.etkinlikuygulamasi.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.Admin;
import com.etkinlikuygulamasi.backend.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Admin doğrulama işlemi - Hem kullanıcı adı hem de e-posta ile kontrol
    public Admin authenticateAdmin(String adminNameOrEmail, String adminPassword) {
        System.out.println("Veritabanindan admin kontrol ediliyor: " + adminNameOrEmail);
        Admin admin = adminRepository.findByAdminNameAndAdminPassword(adminNameOrEmail, adminPassword);
        if (admin == null) {
            admin = adminRepository.findByAdminEmailAndAdminPassword(adminNameOrEmail, adminPassword);
        }
        
        if (admin != null) {
            System.out.println("Admin bulundu: " + admin.getAdminName());
            if (admin.getAdminPassword().equals(adminPassword)) {
                System.out.println("Şifre doğru.");
                return admin;
            } else {
                System.out.println("Şifre yanlış.");
            }
        } else {
            System.out.println("Admin bulunamadı.");
        }
        return null;
    }
}
