package com.zwan.ticket.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/image")
@RestController
public class ImageController {
    @RequestMapping("/upload")
    private void uploadImage(MultipartFile file){
        System.out.println("~~~~~~~~~~~~~~");
    }
}
