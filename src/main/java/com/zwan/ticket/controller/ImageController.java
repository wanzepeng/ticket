package com.zwan.ticket.controller;


import com.zwan.ticket.service.FileService;
import com.zwan.ticket.vo.ImageVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/image")
@RestController
public class ImageController {

    @Autowired
    private FileService fileService;

    @RequestMapping("/upload")
    private ImageVo uploadImage(MultipartFile file){
        return fileService.uploadFile(file);
    }
}
