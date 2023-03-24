package com.zwan.ticket.vo;

import lombok.Data;

@Data
public class ImageVo {
    private int code;
    private String imgUrl;

    public static ImageVo ok(String imgUrl) {
        ImageVo imageVo = new ImageVo();
        imageVo.setCode(200);
        imageVo.setImgUrl(imgUrl);

        return imageVo;
    }
}
