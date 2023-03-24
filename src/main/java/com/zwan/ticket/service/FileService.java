package com.zwan.ticket.service;

import com.zwan.ticket.vo.ImageVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@Slf4j
@Service
public class FileService {

    @Value("${file.image.dirName}")
    private String dirName;

    public ImageVo uploadFile(MultipartFile file) {
        String fileName =
                System.currentTimeMillis() + file.getOriginalFilename();
        try {
            File dest = new File(dirName, fileName);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            file.transferTo(dest);
        } catch (IllegalStateException | IOException e) {
            String errorMsg = "上传文件[" + fileName + "]失败！";
            log.error(errorMsg, e);
        }
        return ImageVo.ok(fileName);
    }
}
