package com.social_ground.app.provider.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.social_ground.app.provider.FileProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3File implements FileProvider {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

//    private final String S3_IMAGE_PATH = "static/images/";

    private final String S3_REWARD_PATH = "static/rewards/";

    @Override
    public String upload(Part file, String dirName) throws IOException {

        String fileType = file.getContentType();
        String url;

        try{

            // 파일 확장자
            final String ext = getExt(fileType);

            // 파일 암호화
            final String saveFileName = getUuid() + ext;

            File newFile = new File(System.getProperty("user.dir") + saveFileName);

            OutputStream out = null;
            InputStream filecontent = null;



            try{
                out = new FileOutputStream(newFile);
                filecontent = file.getInputStream();

                int read = 0;
                final byte[] bytes = new byte[1024];

                while((read = filecontent.read(bytes)) != -1){
                    out.write(bytes, 0, read);
                }

                amazonS3Client.putObject(bucket, "static/" + dirName + "/" + saveFileName, newFile).getETag();
                url = amazonS3Client.getResourceUrl(bucket, "static/" + dirName + "/" + saveFileName);

            }catch(FileNotFoundException e){
                System.out.println(e);
                url = null;
            } finally {
                if(out != null){
                    out.close();
                }
                if(filecontent != null) {
                    filecontent.close();
                }
            }

            newFile.delete();
        } catch (StringIndexOutOfBoundsException e) {
            url = null;
        }

        return url;
    }

    @Override
    public void delete(String url) {
        try {
            String[] split = url.split("/");
            String key = "";

            for (int i = 0; i < split.length; i++) {
                if(i == split.length - 1){
                    key += split[i];
                    break;
                }
                if(i > 2) {
                    key += split[i] + "/";
                }
            }

            key = URLDecoder.decode(key, "UTF-8");

            System.out.println("삭제 : " + key);

            amazonS3Client.deleteObject(bucket, key);
        } catch (AmazonServiceException e) {
            System.out.println("아마존 서비스 예외 : " + e);

        } catch (SdkClientException e) {
            System.out.println("SDK 오류 : " + e);
        }
        catch(Exception e) {
            System.out.println("삭제 오류");
        }
    }

    private String getUuid(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    private String getExt(String str) throws StringIndexOutOfBoundsException{
        return str.substring(str.lastIndexOf('/')).replaceAll("/", ".");
    }

    public String getRandomReward() {
        String url = "";

        try{
            ListObjectsV2Result result = amazonS3Client.listObjectsV2(bucket, S3_REWARD_PATH);

            int rewardNum = result.getKeyCount() - 1;
            int randNum = new Random().nextInt(rewardNum);

            List<S3ObjectSummary> objects = result.getObjectSummaries();
            objects.remove(0);

            url = amazonS3Client.getResourceUrl(bucket, objects.get(randNum).getKey());
        }catch(Exception e){
            System.out.println(e);
            return null;
        }

        return url;
    }
}
