package com.social_ground.app.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import graphql.kickstart.servlet.context.GraphQLServletContext;
import graphql.schema.DataFetchingEnvironment;

@Component
public class EnvManager {
    public HttpServletRequest getHttpServletRequestFromEnv(DataFetchingEnvironment env){
        return ((GraphQLServletContext)env.getContext()).getHttpServletRequest();
    }
    public HttpServletResponse getHttpServletResponseFromEnv(DataFetchingEnvironment env){
        return ((GraphQLServletContext)env.getContext()).getHttpServletResponse();
    }
}
