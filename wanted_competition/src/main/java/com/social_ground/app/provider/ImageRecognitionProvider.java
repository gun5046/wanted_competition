package com.social_ground.app.provider;

import javax.servlet.http.Part;

public interface ImageRecognitionProvider {

    boolean recognize(Part imageFile, String keyword);
}
