package com.social_ground.app.util;

import lombok.Builder;

@Builder
public class Pair<L, R> {

    final private L l;
    final private R r;

    public Pair(L l, R r){
        this.l = l;
        this.r = r;
    }

    public L first(){
        return this.l;
    }

    public R second() {
        return this.r;
    }
}
