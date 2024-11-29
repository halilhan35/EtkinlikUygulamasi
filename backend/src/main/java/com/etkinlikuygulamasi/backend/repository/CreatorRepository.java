package com.etkinlikuygulamasi.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etkinlikuygulamasi.backend.model.Creator;
import com.etkinlikuygulamasi.backend.model.CreatorId;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, CreatorId> {
    List<Creator> findByCreatorId(int creatorId);
    List<Creator> findByEventId(int eventId);
}
