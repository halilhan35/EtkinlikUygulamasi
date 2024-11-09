package com.etkinlikuygulamasi.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Tüm endpoint'ler için CORS aç
                .allowedOrigins("http://localhost:5173")  // Frontend'in adresini buraya ekleyin
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // İzin verilen HTTP metodlarını belirtin
                .allowedHeaders("*")  // Tüm başlıklara izin ver
                .allowCredentials(true);  // Kimlik doğrulama bilgileri (cookies) gönderilmesine izin ver
    }
}
