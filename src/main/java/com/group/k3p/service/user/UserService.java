package com.group.k3p.service.user;

import com.group.k3p.domain.user.User;
import com.group.k3p.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public boolean isUserIDAvailable(String userID) {
        User user = userRepository.findByUserID(userID);
        boolean isAvailable = user == null;
        return isAvailable;
    }

    public boolean isUserEmailAvailable(String userEmail) {
        return userRepository.findByUserEmail(userEmail) == null;
    }

    public boolean authenticate(String userID, String userPassword) {
        User user = userRepository.findByUserID(userID);
        if (user != null && user.getUserPassword().equals(userPassword)) {
            return true;
        }
        return false;
    }

}
