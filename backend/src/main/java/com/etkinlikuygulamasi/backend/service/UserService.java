package com.etkinlikuygulamasi.backend.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etkinlikuygulamasi.backend.model.User;
import com.etkinlikuygulamasi.backend.repository.UserRepository;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> authenticateAndGetUser(String usernameOrEmail, String password) {
        // Kullanıcıyı username veya email ile arıyoruz
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    
        // Kullanıcı varsa ve şifre doğruysa bilgileri döndür
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return userOptional;
        } else {
            return Optional.empty();
        }
    }    

    public User registerUser(User user) {
        Optional<User> existingUserByUsername = userRepository.findByUsername(user.getUsername());
        Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());

        if (existingUserByUsername.isPresent()) {
            throw new IllegalStateException("Username already exists.");
        }
        if (existingUserByEmail.isPresent()) {
            throw new IllegalStateException("Email already exists.");
        }

        return userRepository.save(user);
    }

    public void updateProfilePhotoPath(int userId, String profilePhotoPath) {
        logger.info("Updating profile photo path for userId: {}", userId);
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            logger.info("Current profile photo path: {}", user.getProfilePhotoPath());
            user.setProfilePhotoPath(profilePhotoPath);
            userRepository.save(user);
            logger.info("Updated profile photo path to: {}", profilePhotoPath);
        } else {
            logger.error("User with ID {} not found.", userId);
        }
    }

    public User updateUser(User updatedUser) {
        // Kullanıcıyı id'ye göre bul
        Optional<User> existingUserOpt = userRepository.findById(updatedUser.getId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            
            // Güncelleme işlemi
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setLocation(updatedUser.getLocation());
            existingUser.setAreasOfInterest(updatedUser.getAreasOfInterest());
            existingUser.setName(updatedUser.getName());
            existingUser.setSurname(updatedUser.getSurname());
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setNumber(updatedUser.getNumber());
            existingUser.setProfilePhotoPath(updatedUser.getProfilePhotoPath());

            return userRepository.save(existingUser);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    public boolean checkIfUserExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }    

    public void deleteUser(int userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            userRepository.delete(user);
            logger.info("User with ID {} deleted successfully.", userId);
        } else {
            throw new IllegalStateException("User not found");
        }
    }

}
