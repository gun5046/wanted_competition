package com.social_ground.app.provider;

import java.io.IOException;

import javax.servlet.http.Part;

public interface FileProvider {

    // 저장된 이미지의 url을 리턴
    String upload(Part file, String dirName) throws IOException;

    void delete(String url) throws Exception;
}
