package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Set;

public interface UserService extends UserDetailsService {

    User findByUsername(String username);

    UserDetails loadUserByUsername(String username);

    List<User> findAllUsers();

    Set<Role> findAllRoles();

    void updateAndSaveUser(User user);

    void deleteByIdUsers(Long id);

}
