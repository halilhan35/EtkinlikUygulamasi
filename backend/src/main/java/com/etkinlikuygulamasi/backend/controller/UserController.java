package com.etkinlikuygulamasi.backend.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.etkinlikuygulamasi.backend.model.User;
import com.etkinlikuygulamasi.backend.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        // Kullanıcıyı doğrulama
        Optional<User> authenticatedUser = userService.authenticateAndGetUser(loginUser.getUsername(),
                loginUser.getPassword());

        if (authenticatedUser.isPresent()) {
            // Başarılı giriş durumunda kullanıcı bilgilerini döndür
            return ResponseEntity.ok(authenticatedUser.get());
        } else {
            // Başarısız giriş
            return ResponseEntity.status(401).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Integer>> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);

            // JSON yanıt olarak { "id": registeredUser.getId() } döndür
            Map<String, Integer> response = new HashMap<>();
            response.put("id", registeredUser.getId());

            return ResponseEntity.status(201).body(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/uploadPhoto")
    public ResponseEntity<String> uploadProfilePhoto(@RequestParam("file") MultipartFile file,
            @RequestParam("userId") int userId) {
        try {
            // Dosya kaydetme klasörü
            String uploadDir = "/EtkinlikUygulamasi/frontend/public/uploads/";
            String fileName = userId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir).resolve(fileName);

            // Klasörün mevcut olup olmadığını kontrol ediyoruz
            Files.createDirectories(filePath.getParent());

            // Dosya kaydetme işlemi
            Files.write(filePath, file.getBytes());

            // Dosya yolu
            String profilePhotoPath = "/uploads/" + fileName;
            System.out.println("Photo uploaded to: " + profilePhotoPath); // Yüklenen dosyanın yolunu kontrol etmek için

            // Veritabanında profil fotoğrafı yolunu güncelle
            userService.updateProfilePhotoPath(userId, profilePhotoPath);

            return ResponseEntity.ok("Photo uploaded successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Photo upload failed.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        try {
            // Kullanıcıyı güncelleme işlemi
            User user = userService.updateUser(updatedUser);
            return ResponseEntity.ok(user); // Güncellenmiş kullanıcıyı döndür
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Hata durumunda
        }
    }

    @GetMapping("/checkUserExists/{username}")
    public ResponseEntity<Boolean> checkUserExists(@PathVariable String username) {
        boolean exists = userService.checkIfUserExists(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{userId}")
public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
    try {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    } catch (IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}

}
