import redisClient from "../loaders/init-redis";
import Posts from "../models/post";
import mongoose from "mongoose";
import User from "../models/User";
import TagSequelize from "../models/tag";
import e from "express";


export async function searchPosts(payload, cb) {
    try {
        let cacheKey = "posts";
        //const redisPosts = await redisClient.get(cacheKey)
        const redisPosts = null;
        var { key, tag, user, isAccepted } = payload;
        var posts = {}
        if (!key) {
            key = ""
        }
        if (redisPosts === null) {
            console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
            if (isAccepted) {
                console.log('isAccepted search');
                posts = await Posts.find({ title: { $regex: key }, $anyElementTrue: ["$answers.isAccepted"] })
                console.log(posts.answers);
            } else if (user) {
                console.log('search with user block');
                posts = await Posts.find({ title: { $regex: key }, ownerId: user })
            }
            else if (tag) {
                console.log('only tag search block');
                posts = await Posts.find({ title: { $regex: key }, tags: { "$in": [tag] } });
            } else {
                posts = await Posts.find({ title: { $regex: key } })
            }

            console.log(posts);
            return cb(null, posts.slice[0,20]);
        } else {
            console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
            return cb(null, JSON.parse(redisPosts));
        }
    } catch (e) {
        console.log(e);
        return cb(e, null);
    }
}