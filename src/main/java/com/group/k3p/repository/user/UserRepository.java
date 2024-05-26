package com.group.k3p.repository.user;

import com.group.k3p.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserID(String userID);
    User findByUserEmail(String userEmail);
}
