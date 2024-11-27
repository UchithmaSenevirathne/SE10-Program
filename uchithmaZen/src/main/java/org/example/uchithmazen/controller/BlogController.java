package org.example.uchithmazen.controller;

import org.example.uchithmazen.entity.Blog;
import org.example.uchithmazen.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blog")
@CrossOrigin
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    //end point
    @GetMapping("/hello")
    public String hello(){
        return "Hello World !";
    }
    @PostMapping("/number")
    public int getNumber(){
        return 9;
    }
    @GetMapping("/data/{num}")
    public int pathVariable(@PathVariable int num){
        return num;
    }
    @GetMapping("/object")
    public Blog getObject(){
        return new Blog();
    }

    @PostMapping("/savepost")
    public void savePost(@RequestBody Blog blog){
        blogRepository.save(blog);
    }

    @PutMapping("/updatepost")
    public void updatePost(@RequestBody Blog blog){
        blogRepository.save(blog);
    }

    @GetMapping("/getallpost")
    public List<Blog> getAllPost(){
        return blogRepository.findAll();
    }

    @GetMapping("/getById/{id}")
    public Optional<Blog> getById(@PathVariable String id){
        return blogRepository.findById(id);
    }

    @DeleteMapping("/deletepost/{id}")
    public void deletePost(@PathVariable String id){
        blogRepository.deleteById(id);
    }
}
