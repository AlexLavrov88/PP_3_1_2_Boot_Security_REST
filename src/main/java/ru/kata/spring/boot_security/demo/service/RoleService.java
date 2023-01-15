package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> getRoles();

    Set<Role> getRoleName(List<String> name);

    void addRole(Role role);
}
