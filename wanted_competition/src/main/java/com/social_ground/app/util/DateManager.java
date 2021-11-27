package com.social_ground.app.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class DateManager {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss a");
    private final SimpleDateFormat dateFormat_day = new SimpleDateFormat("yyyy/MM/dd");

    public String getNowDate(){
        return dateFormat.format(new Date());
    }

    public String getNowDay(){
        return dateFormat_day.format(new Date());
    }

    public SimpleDateFormat getDateFormat(){
        return this.dateFormat;
    }

    public int compareDate(String originDate_str, String targetDate_str) {
        Date originDate, targetDate;

        try{
            originDate = dateFormat.parse(originDate_str);
            targetDate = dateFormat.parse(targetDate_str);
        }
        catch(ParseException e1){
            try {
                originDate = dateFormat_day.parse(originDate_str);
                targetDate = dateFormat_day.parse(targetDate_str);
            }
            catch(ParseException e2){
                System.out.println(e2);
                return 0;
            }
        }

        return originDate.compareTo(targetDate);
    }
}
